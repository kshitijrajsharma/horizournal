---
title: 'OSM - Stats , A automatic Bot for twitter'
excerpt: I want to share the information about that I have created two OpenStreetMap Bot on Twitter 
publishDate: 'Jan 02 2023'
featureImage:
  src: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fopengraph.githubassets.com%2Fd603a5590d9dd857fe76cba598b77795a16e65b50fb13a8e21603e58d40169f6%2Fkshitijrajsharma%2FOSMSG&f=1&nofb=1&ipt=88ecbc64f4ae00edbc71e8ed3a9d56f72bc64ff311956f8b06973866a76f1288&ipo=images'
  alt: osm stats repo
seo:
  image:
    title: OSM-Stats
    description: Automatic stats tracker for OpenStreetMap contributions 
    src: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fopengraph.githubassets.com%2Fd603a5590d9dd857fe76cba598b77795a16e65b50fb13a8e21603e58d40169f6%2Fkshitijrajsharma%2FOSMSG&f=1&nofb=1&ipt=88ecbc64f4ae00edbc71e8ed3a9d56f72bc64ff311956f8b06973866a76f1288&ipo=images'
---
Hi all ! 
I want to share the information about that I have created two OpenStreetMap Bot on Twitter 

1. Open Street Map Retweet Bot 

https://twitter.com/OSM_retweet_bot 

This Bot is created to follow the recent trends on OSM, What people are thinking or doing in OSM, This bot will try to retweet the tweets with hashtags : #osm, #openstreetmap and #hotosm, Runs every three hour

2. Open Street Map Stats Bot 

https://twitter.com/stats_osm 

This Bot is an implementation of standalone open source tool called OSMSG https://github.com/kshitijrajsharma/OSMSG, This tool uses osmium to analyze the change files from OSM using different URLs and generates the stats in different file formats such as CSV, JSON, image etc. It has a GitHub action enabled which will run the stats for requested region and global and produces the stats in CSV and image format and shares it with the twitter community, You can follow the GitHub tool itself to see / download the stats. I have added Nepal as monitoring country, but if you want any other countries, you can request it via opening an issue or mentioning bot to twitter.
https://github.com/kshitijrajsharma/OSMSG/tree/master/stats
Since it uses GitHub, you can also go through the historical stats using GitHub history it will keep updating the same file when it runs and shares the link in twitter 

Both projects are open source and beta release, I will be looking for the recommendations and improvements on future ! 
Thank you ! 