---
layout: default
title: Blog
---

{% for post in site.posts reverse %}
{% assign content = post.content %}
<article>
  {% include article_listing.html %}
</article>
{% endfor %}
