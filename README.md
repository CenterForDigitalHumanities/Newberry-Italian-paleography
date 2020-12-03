# Newberry-Italian-paleography
Static pages for the Newberry French Renaissance Paleography project
[./background-essay](https://centerfordigitalhumanities.github.io/Newberry-Italian-paleography/background-essay)

## Essays

{% for essay in site.background_essay %}
- [{{ essay.title }}]({{ site.baseurl }}{{ essay.url }})
{% endfor %}

## Content

{% for p in site.page %}
- [{{ p.title }}]({{ site.baseurl }}{{ p.url }})
{% endfor %}