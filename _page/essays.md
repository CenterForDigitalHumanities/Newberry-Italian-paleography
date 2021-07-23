---
layout: default
title: Background Essays
slug: essays
replacements: dates
---

### Background Essays for Manuscripts

Below you can find a list of background essays for the manuscripts, authored by the website editors and other experts in the field. See a complete list of contributors [here]({{ site.baseurl }}/about-team). Background essays include a brief description of the item, a 300-word essay, a short paleographic description of the script, and a bibliography related specifically to the item.

<listing></listing>
{% for essay in site.background_essay | sort: 'title' %}
- [{{ essay.title }}]({{ site.baseurl }}{{ essay.url }}) <date data-id="{{ essay.url | split: "/" | last }}">{{ essay.url | split: "/" | last }}</date>{% endfor %}

