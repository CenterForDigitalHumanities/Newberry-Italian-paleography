---
layout: default
title: Transcriptions of Manuscripts
slug: transcriptions
replacements: dates
---

### Transcriptions

Below you can find the list of transcriptions for all of the manuscripts. You can find the transcription standards [here]({{ site.baseurl }}/standards). In Resources you can find a list of the most common [Letter Forms and Abbreviations]({{ site.baseurl }}/abbreviations).

<listing></listing>
{% for transcription in site.transcriptions | sort: 'title' %}
- [{{ transcription.title }}]({{ site.baseurl }}{{ transcription.url }}) <date data-id="{{ transcription.url | split: "/" | last }}">{{ transcription.url | split: "/" | last }}</date>{% endfor %}
