var NL = new Map()

NL.set("LOGIN", "http://paleo.rerum.io/TPEN-NL/geti")

let header = document.createElement('template')
let footer = document.createElement('template')
header.innerHTML = `
    <link rel="stylesheet" href="./css/style.css">
    <slot></slot>
    <nav class="container">
        <a href="../"> 🏠 </a> 
        <a href="manuscripts.html"> manuscripts </a> 
        <a href="maps.html"> maps </a> 
        <a href="calligraphy.html"> calligraphy books </a>
    </nav>`

footer.innerHTML = `
<link rel="stylesheet" href="./css/style.css">
<div class="row container">
    <div class="col-8">
        <h2> Partners </h2>
            <div class="row">
                <a class="col" href="http://www.newberry.org/" target="_blank"><img alt="Newberry" src="//content.library.utoronto.ca/common/dh-images/paleography/NewberryLogo_with_tag.png"></a>
                <a class="col" href="http://onesearch.library.utoronto.ca" target="_blank"><img alt="University of Toronto Libraries" src="//content.library.utoronto.ca/common/dh-images/paleography/UTL-logo.png"></a>
            </div>
            <div class="row">
                <a class="col" href="http://lib.slu.edu/" style="line-height: 23.1111px;" target="_blank"><img alt="St. Louis University" src="//content.library.utoronto.ca/common/dh-images/paleography/slu.gif" style="width: 346px;"></a>
                <a class="col" href="http://www.itergateway.org/" target="_blank"><img alt="Iter" src="//content.library.utoronto.ca/common/dh-images/paleography/iter-logo-new.png"></a>
            </div>
    </div>
    <div class="col">
    <slot></slot>
        <h2 class="pane-title"> Contact </h2>
        <p><a href="/contact">Contact</a><br><a href="/content/about-team">About the Team</a><br><a href="/contact">Terms of Use</a></p>
        <p>Supported by a grant from The Andrew W. Mellon Foundation</p>
        <p><a href="http://creativecommons.org/licenses/by-nc-nd/4.0/" rel="license"><img alt="Creative Commons Licence" src="https://i.creativecommons.org/l/by-nc-nd/4.0/88x31.png" style="border-width:0"></a><br><a href="http://paleography.library.utoronto.ca/">http://paleography.library.utoronto.ca/</a> is licensed under a <a href="http://creativecommons.org/licenses/by-nc-nd/4.0/" rel="license">Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License</a>.</p>
    </div>
</div> `

NL.set("HEADER_TEMPLATE", header)
NL.set("FOOTER_TEMPLATE", footer)

class NlHeader extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({ mode: 'open' })
        this.shadowRoot.appendChild(NL.get("HEADER_TEMPLATE").content.cloneNode(true))
    }
}
customElements.get('nl-header') || customElements.define('nl-header', NlHeader)

class NlFooter extends HTMLElement {
    constructor() {
        super()       
        this.attachShadow({ mode: 'open' })
        this.shadowRoot.appendChild(NL.get("FOOTER_TEMPLATE").content.cloneNode(true))
    }
}
customElements.get('nl-footer') || customElements.define('nl-footer', NlFooter)

document.querySelector("header").replaceWith(document.createElement("nl-header"))
document.querySelector("footer").replaceWith(document.createElement("nl-footer"))