---
layout: default
title: Transcriptions
slug: transcriptions
replacements: dates
---

## Transcriptions

See below for a list of partial transcriptions for selected manuscript documents in this repository. Please feel free to post your own transcriptions to our Google group, for correction and possible uploading to the site later on.

<listing></listing>
{% for transcription in site.transcriptions | sort: 'title' %}
- [{{ transcription.title }}]({{ site.baseurl }}{{ transcription.url }}) <date data-id="{{ transcription.url | split: "/" | last }}">{{ transcription.url | split: "/" | last }}</date>{% endfor %}
