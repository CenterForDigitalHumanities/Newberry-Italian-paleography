# Newberry-French-paleography
Static pages for the Newberry French Renaissance Paleography project
[./background-essay](https://centerfordigitalhumanities.github.io/Newberry-French-paleography/background-essay)

{% for essay in site.background_essay %}
- [{{ essay.title }}]({{ essay.url }})
{% endfor %}