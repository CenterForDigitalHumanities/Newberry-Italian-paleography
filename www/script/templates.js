var NL = new Map()

NL.set("LOGIN", "http://newberry.t-pen.org/paleography/geti")

let header = document.createElement('template')
let footer = document.createElement('template')
header.innerHTML = `
    <link rel="stylesheet" href="https://italian.newberry.t-pen.org/www/css/style.css">
    <header class="header clearfix no-embed">
    <div id="branding" class="branding-elements clearfix">
      <div style="margin: 0px auto;">
        <div class="newberry-header hiddem-sm hidden-xs">
          <a href="http://www.newberry.org/">
            <img alt="Newberry" src="https://centerfordigitalhumanities.github.io/Newberry-Italian-paleography/www/images/Logo-Newberry-horiz-BW.jpg">
          </a>
        </div>

        <h1 id="site-name">
          <a href="https://italian.newberry.t-pen.org/">Italian Paleography</a>
        </h1>
      </div>

    </div>
  </header>
  <nav class="container no-embed">
    <ul class="nav nav-bar">
      <li class="first leaf"><a href="https://italian.newberry.t-pen.org">Home</a></li>
      <li class="leaf active-trail active"><a href="https://italian.newberry.t-pen.org/www/manuscripts.html" title=""
          class="active-trail active">Manuscripts</a></li>
      <li class="leaf active-trail active"><a href="https://italian.newberry.t-pen.org/handbook" title=""
          class="active-trail active">Handbook</a></li>
      <li class="expanded dropdown"><a href="https://italian.newberry.t-pen.org/resources" title="" data-target="#"
          class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
          aria-expanded="false">Appendix<span class="caret"></span></a>
        <ul class="dropdown-menu">
          <li class="first leaf"><a href="https://italian.newberry.t-pen.org/www/calligraphy.html" title="">Calligraphy Books</a></li>
          <li class="last leaf"><a href="https://italian.newberry.t-pen.org/www/maps.html" title="">Historical Maps</a></li>
        </ul>
      </li>
      <li class="expanded dropdown"><a href="https://italian.newberry.t-pen.org/resources" title="" data-target="#"
          class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
          aria-expanded="false">Resources <span class="caret"></span></a>
        <ul class="dropdown-menu"><li class="first leaf"><a href="https://italian.newberry.t-pen.org/new-paleography">New to Paleography</a></li>
          <li class="leaf"><a href="https://italian.newberry.t-pen.org/transcriptions" title="">Transcriptions</a></li>
          <li class="leaf"><a href="https://italian.newberry.t-pen.org/essays" title="">Background Essays</a></li>
          <li class="leaf"><a href="https://italian.newberry.t-pen.org/abbreviations">Abbreviations &amp; Symbols</a></li>
          <li class="leaf"><a href="https://italian.newberry.t-pen.org/glossary">Glossary</a></li>
          <li class="leaf"><a href="https://italian.newberry.t-pen.org/dictionaries">Dictionaries</a></li>
          <li class="leaf"><a href="https://italian.newberry.t-pen.org/bibliography-references">Bibliography &amp; References</a></li>
          <li class="leaf"><a href="https://italian.newberry.t-pen.org/teaching">Teaching Materials</a></li>
          <li class="leaf"><a href="https://italian.newberry.t-pen.org/standards">Transcription and Metadata Standards</a></li>
          <li class="last leaf active-trail active"><a href="https://italian.newberry.t-pen.org/project-history" class="active-trail active">History of the Project</a></li>
          </ul>
      </li>
      <li class="expanded dropdown"><a title="" data-target="#" class="dropdown-toggle" data-toggle="dropdown"
        role="button" aria-haspopup="true" aria-expanded="false">My Transcriptions <span class="caret"></span></a>
        <ul class="dropdown-menu">
          <li class="first leaf"><a href="http://newberry.t-pen.org/paleography/my-transcriptions.html?language=Italian" title="">My
            Transcriptions</a></li>
            <li class="last leaf"><a href="https://italian.newberry.t-pen.org/transcriptions" title="">Master Transcriptions</a>
            </li>
          </ul>
        </li>
        <li class="expanded dropdown"><a href="https://italian.newberry.t-pen.org/contact" title="" data-target="#" class="dropdown-toggle"
            data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Contact <span
              class="caret"></span></a>
          <ul class="dropdown-menu">
            <li class="first leaf"><a href="https://italian.newberry.t-pen.org/contact" title="">Contact Us</a></li>
            <li class="last leaf"><a href="https://italian.newberry.t-pen.org/about-team" title="">About the Team</a></li>
          </ul>
        </li>
        <li>
        <a class="loginToTpen" href="https://newberry.t-pen.org/paleography/login.jsp">
          Login
        </a>
      </li>
    </ul>
  </nav>
`
footer.innerHTML = `
<link rel="stylesheet" href="https://italian.newberry.t-pen.org/www/css/style.css">
<div class="row no-embed">
    <div class="col">
      <h2>Partners</h2>
      <div class="row">
          <a class="col" href="http://www.newberry.org/" target="_blank"><img alt="Newberry" src="https://centerfordigitalhumanities.github.io/Newberry-Italian-paleography/www/images/Logo-Newberry-horiz-BW.jpg"></a>
          <a class="col" href="http://onesearch.library.utoronto.ca" target="_blank"><img alt="University of Toronto Libraries" src="https://centerfordigitalhumanities.github.io/Newberry-Italian-paleography/www/images/UTL-logo.png"></a>
      </div>
      <div class="row">
        <a class="col" href="http://lib.slu.edu/" style="line-height: 23.1111px;" target="_blank"><img alt="St. Louis University" src="https://centerfordigitalhumanities.github.io/Newberry-paleography/images/slu_ovpr.png" style="width: 470px;"></a>
      </div>
    </div>
    <div class="col">
      <slot></slot>
      <h2 class="pane-title"> Contact </h2>
      <p>Header image: Newberry Library, VAULT folio Case MS 214, f.1r</p>
      <p>Supported by a grant from <a href="http://mellon.org" target="_blank">The Andrew W. Mellon Foundation</a></p>
      <p><a href="https://italian.newberry.t-pen.org">Italian Paleography</a> is licensed under a <a
          href="http://creativecommons.org/licenses/by-nc-nd/4.0/" rel="license">Creative Commons
          Attribution-NonCommercial-NoDerivatives 4.0 International License</a>.</p>
      <p>Follow us on Twitter:<br><iframe id="twitter-widget-0" scrolling="no" frameborder="0" allowtransparency="true"
          allowfullscreen="true" class="twitter-follow-button twitter-follow-button-rendered"
          style="position: static; visibility: visible; width: 152px; height: 20px;" title="Twitter Follow Button"
          src="https://platform.twitter.com/widgets/follow_button.06c6ee58c3810956b7509218508c7b56.en.html#dnt=false&amp;id=twitter-widget-0&amp;lang=en&amp;screen_name=italpaleography&amp;show_count=false&amp;show_screen_name=true&amp;size=m&amp;time=1626898782476"
          data-screen-name="italpaleography"></iframe></p>
      <script async="" src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
    </div>
</div>
`

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
