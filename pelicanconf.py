#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals

AUTHOR = "Kshitiz Raj Sharma"
COPYRIGHT = "2024"
SITENAME = "HoriZournal"
# SITEURL = "https://www.example.com"
SITESUBTITLE = "My Spatial Thoughts and Blogs"
PATH = "content"
TIMEZONE = "Europe/Rome"
DEFAULT_LANG = "en"

THEME = "themes/Peli-Kiera"
PLUGIN_PATHS = ["pelican-plugins"]
PLUGINS = ["readtime", "neighbors"]
STATIC_PATHS = ["images"]
# Article summary length on main index page
SUMMARY_MAX_LENGTH = 100
DEFAULT_PAGINATION = 4
GITHUB_URL = "https://github.com/kshitijrajsharma/"

# Feed generation is usually not desired when developing
FEED_ALL_ATOM = "feeds/all.atom.xml"
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None
RSS_FEED_SUMMARY_ONLY = True

# Social widget
SOCIAL = (
    ("mastodon", "https://mastodon.social/@kshitijrajsharma"),
    ("linkedin", "https://www.linkedin.com/in/kshitijrajsharma"),
    ("github", "https://github.com/kshitijrajsharma"),
)

# DISQUS_SITENAME = ''
# GOOGLE_ANALYTICS = ''

# Uncomment following line if you want document-relative URLs when developing
RELATIVE_URLS = True
