function renderManuscripts(elem, manuscripts) {

    const TPEN_BASE = "http://paleo.rerum.io/TPEN-NL/"
    const FIELDS = [
        "Alternative Title", "Date Issued", "Is Part Of",
        "Date Issued", "Author(s) or Contributor(s)"
        // script, decoration, physical description
    ]

    let list = manuscripts.reduce((a, b) => a += `<div class="record" data-id="${b['@id']}">
    <h4>${b.label}</h4>
        <div class="row">
            <img class="thumbnail" src="http://placekitten.com/65/80">
            <dl>
            </dl>
        </div>
        <div class="btn-group">
        <a href="./record.html?id=${b['@id']}">View</a> <a href="${TPEN_BASE}?projectID=${b.tpenProject}">Transcribe</a>
        </div>
    </div>`, ``)

    elem.innerHTML = list

    const records = Array.from(document.querySelectorAll(".record"))
    records.forEach(r=>{
        const url=r.getAttribute("data-id")
        let dl=``
        fetch(url)
        .then(status => { if (!status.ok) { throw Error(status) } return status })
        .then(response => response.json())
        .then(manifest=> {
            manifest.metadata.forEach(dat=>{
                if(FIELDS.includes(dat.label)) {
                    dl+=`<dt>${dat.label}</dt><dd>${Array.isArray(dat.value)?dat.value.join(", "):dat.value}</dd>`
                }
            })
            r.querySelector("dl").innerHTML = dl
            r.querySelector("img").src = manifest.sequences[0].canvases[0].thumbnail['@id']
        })
        .catch(err => { throw Error(err) })
    })
}

function fetchList(url) {
    return fetch(url)
        .then(status => { if (!status.ok) { throw Error(status) } return status })
        .then(response => response.json())
        .catch(err => { throw Error(err) })
}

function flashMessage(err) {
    alert(err.message)
}

async function loadManuscripts(url, elem, pagination = [0,]) {
    const data = await fetchList(url).catch(err => flashMessage(err)) || {}
    if (data["@id"]) {
        fetchList(data["@id"])
            .then(manifests => {
                // compare
                if (!data.total === manifests.total) {
                    console.log("Replacing local data with remote MS collection")
                    // don't render until we can map the buttons for transcription
                    // renderManuscripts(elem, (data.manifests || []).slice(pagination[0], pagination[1]))
                }
            })
            .catch()
    }
    const manuscripts = (data.manifests || []).slice(pagination[0], pagination[1])
    renderManuscripts(elem, manuscripts)
}