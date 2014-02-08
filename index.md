---
layout: page
title: Welcome
tagline: Supporting tagline
---
{% include JB/setup %}

My name is Juan Solano, I'm software engineer and entrepreneur with passion for technologies. I live in Ottawa, Canada.

I can help you with:
  * Creative Ideas
  * UX/UI
  * Web Architecture
  * Web Development
  * Server Development
  * Database Design


Here's my posts.

<ul class="posts">
  {% for post in site.posts %}
    <li><span>{{ post.date | date_to_string }}</span> &raquo; <a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></li>
  {% endfor %}
</ul>



