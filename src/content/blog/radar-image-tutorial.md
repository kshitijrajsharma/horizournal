---
title: 'Working with RADAR : Case Study in Jajarkot EarthQuake'
excerpt: Step by Step tutorial to work with Sentinel 1 RADAR image with preprocessing analysis in my case study. 
publishDate: 'Dec 13 2024'
featureImage:
  src: 'https://github.com/user-attachments/assets/f83b49a4-f8d2-45ad-abb9-1bd6d4251a18'
  alt: Earthquake Displacement
isFeatured: false
published: false
seo:
  image:
    src: 'https://github.com/user-attachments/assets/f83b49a4-f8d2-45ad-abb9-1bd6d4251a18'
---
The goal of this tutorial is to share my experience and steps I followed when I tried to work with Sentinel-1 Radar Data to findout the displacement caused by the earthquake in Nepal. 

## Study Area 

*JajarKot Nepal* : https://www.openstreetmap.org/relation/4586357#map=10/28.9246/82.3151 

![CNN report](https://github.com/user-attachments/assets/b39de535-5468-4ea7-9672-a8abbd0e503b)

Source :  https://edition.cnn.com/2023/11/03/asia/nepal-earthquake-northwest-hnk-intl/index.html 

There was a deadly earath quake in Early November 2023 which killed more than 157 people as per CNN . I wanted to figure out how much displacement it has cased in the area , Did topography went up ? or went down. As we know due to tectonic plates movement it will always result in displacement ! 

## Preparation 

Lets first verify that even exists , get the event details from USGS . USGS mainatains the eartquake catalog which will give the event date, magnitude and approx coordinate for the event .  
https://earthquake.usgs.gov/earthquakes/search/ 

![image](https://github.com/user-attachments/assets/63f37491-d0bd-4da5-b560-64d9a70922a8)

Prepare your filter accordingly to  your event , For us as CNN reported the incident in november 3 , I am keeping filter from Novemeber 2 to 4  in Jajarkot Area . This is how my search filter result looks like : https://earthquake.usgs.gov/earthquakes/map/?currentFeatureId=us7000l8p5&extent=22.2586%2C75.81665&extent=31.72817%2C91.70288&range=search&sort=largest&search=%7B%22name%22%3A%22Search+Results%22%2C%22params%22%3A%7B%22starttime%22%3A%222022-01-01+00%3A00%3A00%22%2C%22endtime%22%3A%222024-12-08+23%3A59%3A59%22%2C%22maxlatitude%22%3A32.319%2C%22minlatitude%22%3A24.121%2C%22maxlongitude%22%3A89.868%2C%22minlongitude%22%3A78.354%2C%22minmagnitude%22%3A5%2C%22orderby%22%3A%22magnitude%22%7D%7D 
![image](https://github.com/user-attachments/assets/c2b571ce-920b-435c-9d5c-f4fc3410c854)

We found event details , it's coordinate and confirmation from USGS , Now we can move forward to downloading the Sentinel Image 


## Download Image 

I am using the ASF Data Search by NASA :  https://search.asf.alaska.edu/#/ 

![image](https://github.com/user-attachments/assets/49bb382f-6ef2-4375-8013-a02e2d2c7bc4)

Click on filters Nearby search 

Here are the parameters for my Search filters : 

Area of Interest : POINT(82.153 28.858) (You can convert your coords to WKT with https://wktmap.com/ )
Start Date : 2023/10/01
End Date : 2023/11/30 (To be on safe side I am trying to find image within two months frame to filter out the best image before and after the event )
File Type : L1 Single Look Complex (SLC) (......why ? .....)
Beam Mode : IW ( Because IW covers Orbit and EW covers Polar region ) 

![image](https://github.com/user-attachments/assets/1f65273f-1532-45db-9aac-3dc653dad16d) Source : My professor  Karima Hadj-Rabah & Zahra Dabiri  

Polarizations : VV ( VV polarization can provide good representation of the terrain , and here we are interested in the terrain displacement hence VV , I had to remove VV from filter as it was not showing any image hence I will select it in later during preprocessing of image ) 
Direction : Ascending  (...why ?...)

![image](https://github.com/user-attachments/assets/24f1370b-5855-4825-b966-1efe72f76f83)

Search Results : 
![image](https://github.com/user-attachments/assets/331c549b-f48c-4107-b923-00478736d8b4)

I am selecting two image based on my region of interest : 
After the event :: Novemeber 10, 2023
Before the event :: October 17,2023

if you look closely to the footprint image top left has my region of interest specifically 
![image](https://github.com/user-attachments/assets/2fd73887-3628-4ff8-a647-1fc62d67cf64)

You need to create account in order to download the image 

## Image preprocessing 



