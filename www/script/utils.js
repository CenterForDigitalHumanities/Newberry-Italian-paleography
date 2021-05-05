var records = document.querySelectorAll(".record")
function renderManuscripts(elem, manuscripts, noTranscribe) {

    const TPEN_BASE = "http://paleo.rerum.io/TPEN-NL/"
    const FIELDS = page_FIELDS || [
        "Alternative Title", "Date Issued", "Is Part Of",
        "Date Issued", "Author(s) or Contributor(s)"
        // script, decoration, physical description
    ]
    const FILTERS = page_FILTERS || {
        "Type of Resource": "resource-type", Genre: "genre", Language: "language",
        Script: "script", "Reading Difficulty": "readability", Topic: "topic",
        Region: "region", "Time Period": "period", Repository: "repository"
    }
    const SEARCH = page_SEARCH || [
        "Title", "Physical Description", "Note(s)", "Region",
        "Topic", "Subject", "Repository", "Call Number", "Is Part Of"
    ]

    let list = manuscripts.reduce((a, b) => a += `
    <div class="record" data-id="${b['@id']}">
        <h4>${b.label}</h4>
        <div class="row">
            <img class="thumbnail" >
            <dl>
            </dl>
        </div>
        <div class="btn-group">
            <a href="./record.html?id=${b['@id']}">View</a> ${(!noTranscribe) ? `` : `<a href="${TPEN_BASE}?projectID=${b.tpenProject}">Transcribe</a>`}
        </div>
    </div>`, ``)

    elem.innerHTML = list

    records = document.querySelectorAll(".record")
    let facets = {}
    let loading = []
    Array.from(records).forEach(r => {
        const url = r.getAttribute("data-id")
        let dl = ``
        loading.push(fetch(url)
            .then(status => { if (!status.ok) { throw Error(status) } return status })
            .then(response => response.json())
            .then(manifest => {
                let metadataMap = new Map()
                manifest.metadata.forEach(dat => {
                    metadataMap.set(dat.label, Array.isArray(dat.value) ? dat.value.join(", ") : dat.value)
                    if (FIELDS.includes(dat.label)) {
                        dl += `<dt>${dat.label}</dt><dd>${metadataMap.get(dat.label)}</dd>`
                    }
                    if (FILTERS[dat.label]) {
                        r.setAttribute("data-" + FILTERS[dat.label], metadataMap.get(dat.label))
                        let values = (Array.isArray(dat.value)) ? dat.value : [dat.value]
                        if (!facets[FILTERS[dat.label]]) {
                            facets[FILTERS[dat.label]] = new Set()
                        }
                        for (const v of values) {
                            facets[FILTERS[dat.label]] = facets[FILTERS[dat.label]].add(v.replace(/\?/g, ""))
                        }
                    }
                })
                r.setAttribute("data-query", SEARCH.reduce((a, b) => a += (metadataMap.has(b) ? metadataMap.get(b) : "*") + " ", ""))
                r.querySelector("dl").innerHTML = dl
                let middleOfTheBook = Math.floor((manifest.sequences[0].canvases.length - 1) / 2)
                r.querySelector("img").src = manifest.sequences[0].canvases[middleOfTheBook].thumbnail['@id']
            })
            .catch(err => { throw Error(err) })
        )
    })
    query.addEventListener("input", filterQuery)
    return Promise.all(loading).then(() => populateSidebar(facets, FILTERS)).catch(err=>console.error(err))
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

async function loadManuscripts(url, elem, noTranscribe, pagination = [0,]) {
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

if (window.queryReset) {
    queryReset.addEventListener("click", ev => {
        Array.from(document.querySelectorAll(".clicked")).forEach(el => el.dispatchEvent(new Event("click")))
        query.value = ""
        query.dispatchEvent(new Event("input"))
    })
}

function filterQuery(event) {
    const queryString = event.target.value
    Array.from(records).forEach(r => new RegExp(queryString, "i").test(r.getAttribute("data-query")) ? r.classList.remove("hide-query") : r.classList.add("hide-query"))
    //Manuscripts.querySelectorAll(".record:not([data-query*='"+queryString+"'])")
    updateCount()
}
function filterFacets(event) {
    const clicked = event.target
    clicked.classList.toggle("clicked")
    const action = clicked.classList.contains("clicked") ? "add" : "remove"
    const k = clicked.getAttribute("data-facet")
    const v = clicked.textContent
    Array.from(records).forEach(r => { if (!new RegExp(v, "i").test(r.getAttribute("data-" + k))) r.classList[action]("hide-facet") })
    updateCount()
}
let progress;
function updateCount() {
    // let visibleCount = Array.from(records).filter(el=>el.offsetParent === null).length
    let hiddenCount = document.querySelectorAll(".record[class*='hide-']").length
    let countBar = query.previousElementSibling
    let countBarValue = records.length - hiddenCount
    countBar.max = records.length
    countBar.textContent = countBarValue + " of " + countBar.max
    clearInterval(progress)
    const notzero = countBarValue > countBar.value ? 1 : -1
    let step = parseInt((countBarValue - countBar.value) / 25) || notzero
    progress = setInterval(() => {
        countBar.value += step
        if (Math.abs(countBar.value - countBarValue) < 2) {
            countBar.value = countBarValue
            clearInterval(progress)
        }
    }, 10)
    let facetsElements = document.querySelectorAll("facet")
    Array.from(facetsElements).forEach(f => {
        const k = f.getAttribute("data-facet")
        const v = f.textContent
        let count = document.querySelectorAll(".record:not([class*='hide-'])[data-" + k + "*='" + v + "']").length
        f.setAttribute("data-count", count)
        if (count === 0) {
            f.classList.add("hide-sidebar")
        } else {
            f.classList.remove("hide-sidebar")
        }
    })
}

function populateSidebar(facets, FILTERS) {
    let side = `<ul>`
    for (const f in FILTERS) {
        if (!facets[FILTERS[f]]) continue
        side += `<li>${f}</li>`
        side += Array.from(facets[FILTERS[f]]).reduce((a, b) => a += `<facet data-facet="${FILTERS[f]}">${b}</facet>`, ``)
    }
    side += `</ul>`
    facetFilter.innerHTML = side
    let facetsElements = document.querySelectorAll("[data-facet]")
    Array.from(facetsElements).forEach(el => el.addEventListener("click", filterFacets))
    updateCount()
}

let templates = document.createElement("script")
templates.src = "script/templates.js"
document.body.append(templates)
