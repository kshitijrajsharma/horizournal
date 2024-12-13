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

*Source :  https://edition.cnn.com/2023/11/03/asia/nepal-earthquake-northwest-hnk-intl/index.html*

There was a deadly earath quake in Early November 2023 which killed more than 157 people as per CNN . I wanted to figure out how much displacement it has cased in the area , Did topography went up ? or went down. As we know due to tectonic plates movement it will always result in displacement ! 

## Preparation 

Lets first verify that even exists , get the event details from USGS . USGS mainatains the eartquake catalog which will give the event date, magnitude and approx coordinate for the event .  
https://earthquake.usgs.gov/earthquakes/search/ 

![image](https://github.com/user-attachments/assets/63f37491-d0bd-4da5-b560-64d9a70922a8)

Prepare your filter accordingly to  your event , For us as CNN reported the incident in november 3 , I am keeping filter from Novemeber 2 to 4  in Jajarkot Area . This is how my search filter result looks like : https://earthquake.usgs.gov/earthquakes/map/?currentFeatureId=us7000l8p5&extent=22.2586%2C75.81665&extent=31.72817%2C91.70288&range=search&sort=largest&search=%7B%22name%22%3A%22Search+Results%22%2C%22params%22%3A%7B%22starttime%22%3A%222022-01-01+00%3A00%3A00%22%2C%22endtime%22%3A%222024-12-08+23%3A59%3A59%22%2C%22maxlatitude%22%3A32.319%2C%22minlatitude%22%3A24.121%2C%22maxlongitude%22%3A89.868%2C%22minlongitude%22%3A78.354%2C%22minmagnitude%22%3A5%2C%22orderby%22%3A%22magnitude%22%7D%7D 
![image](https://github.com/user-attachments/assets/c2b571ce-920b-435c-9d5c-f4fc3410c854)

We found event details , it's coordinate and confirmation from USGS , Now we can move forward to downloading the Sentinel Image 


## Download Image 

### Filters
I am using the ASF Data Search by NASA :  https://search.asf.alaska.edu/#/ 

![image](https://github.com/user-attachments/assets/49bb382f-6ef2-4375-8013-a02e2d2c7bc4)

Click on filters Nearby search 

Here are the parameters for my Search filters : 

**Area of Interest** : POINT(82.153 28.858) (You can convert your coords to WKT with https://wktmap.com/ )
**Start Date** : 2023/10/01
**End Date** : 2023/11/30 (To be on safe side I am trying to find image within two months frame to filter out the best image before and after the event )
**File Type** : L1 Single Look Complex (SLC) ( SLC has both amplitude and phase , in GRD we have only amplitude . Here in displacement we need phase hence SLC ) 
**Beam Mode** : IW ( Because IW- Interforemetric  covers Orbit and EW- extra wide swath covers Polar region ) 

![image](https://github.com/user-attachments/assets/1f65273f-1532-45db-9aac-3dc653dad16d)

*Source : My professor  Karima Hadj-Rabah & Zahra Dabiri*

**Polarizations** : VV ( Polarization doesn't really matter in phase differences , It matters in classification , Here we are selecting VV just to reduce the image size ) 
**Direction** : Ascending  ( It doesn't matter as well because at the end we will do geocoding and correct the image so image going to be reotated anyway ) 

![image](https://github.com/user-attachments/assets/24f1370b-5855-4825-b966-1efe72f76f83)

Search Results : 

![image](https://github.com/user-attachments/assets/331c549b-f48c-4107-b923-00478736d8b4)

I am selecting two image based on my region of interest : 
After the event :: Novemeber 10, 2023
Before the event :: October 17,2023

if you look closely to the footprint image top left has my region of interest specifically 

![image](https://github.com/user-attachments/assets/2fd73887-3628-4ff8-a647-1fc62d67cf64)

You need to create account in order to download the image.

*Note : 
As some of the required steps are computationally intensive, it is good to store the data at a location which offers good reading and writing speed. If your computer has an internal SSD, processing should be done there to ensure best performance. (Credit : ESA Tutorial)*

## Data preparation

For data preparation and image processing and analysis I am going to use a tool called SNAP . SNAP (Sentinel Application Platform) is a earth observation processing open-source software developed by ESA 


### Download SNAP : 
https://step.esa.int/main/download/snap-download/ 
SNAP is available for windows , mac and linux 
I will be using linux , I downloaded all tollboxes

![image](https://github.com/user-attachments/assets/5b5ba68d-4e72-4620-9b07-1e2724b34118)


Setting up SNAP 
```bash
chmod +x esa-snap_all_linux-11.0.0.sh
```
```bash
./esa-snap_all_linux-11.0.0.sh
```

### SNAP Operations 
Open Snap it , Interface looks like this 
![image](https://github.com/user-attachments/assets/98fa95a8-acd1-4792-9e6c-488d64553e38)

#### Load image 
Our downloaded image would be in .zip folder , Don't unzip them simply open them in SNAP 

`File > Open Product > Select your both before after images > Open` 

![image](https://github.com/user-attachments/assets/cfe1f523-cb1d-42d0-b749-2960cfc670e7)

#### Split data to region of interest 

Radar > Sentinel-1 TOPS > S-1 Tops Split
![image](https://github.com/user-attachments/assets/07b37c17-36ae-4813-83f0-eb22ab6f082c)

Navigate to Processing Parameters 

Subswath : IW1 
Polarisation : VV 
Bursts : 6 to 9 (For my area of interest bursts 6 to 9 covered the area , You should select the subswath and bursts accordingly . If you remember my are of intrest was in top left of the image , hence I selected the subswath that covers that area and bursts to minimize it )
![image](https://github.com/user-attachments/assets/6be06d2a-18eb-4da8-b6ad-e94db7e609d0)

Lets rename the output file for readability 

![image](https://github.com/user-attachments/assets/6838f530-e788-472a-b0e2-a461ee0cdfdc)

Hit Run 

You should have the splitted file and now 

![image](https://github.com/user-attachments/assets/e7527c76-821e-42ac-906a-5b91fb80811a)

Visualize the intensity 

`Expand the image > Bands > subswath name > intensity_* Double click `

![image](https://github.com/user-attachments/assets/2e7b7a53-21e7-4231-a250-0cf0636af2eb)

Now repeat the process to split another image as well , Remember to click on the image that you are splitting or change the path 

Visualize the image side by  side from 
`Window > Tile Vertically or horizontally`


![image](https://github.com/user-attachments/assets/14f8a444-5dfd-4fd8-84a1-68b7a10dbc93)


## Image preprocessing

### Orbit Correction 

Technically we suppose that satellite is following perfect line , But in reality there is vibration in satellite and is not really stable . Hence we need to apply correction on the orbit path 

`Radar > Apply Orbit File`

![image](https://github.com/user-attachments/assets/7d72d659-267f-4237-8273-b70d8649f788)

Go to Processing Parameters and Check Do not fail if new orbit file is not found to make sure our process doesn't fail even though orbit file not found ( Because orbit file is only available after two weeks of the acqusition at the moment ) 

![image](https://github.com/user-attachments/assets/4aa65093-b705-4ab5-b6dc-7431095392c3)

Repeat the process for another image as well . You should have those two new files in your window

![image](https://github.com/user-attachments/assets/c0ea72bc-bc97-4fed-ac67-bd232fff5093)


## Generation of Topographic Interferogram 

A topographic interferogram highlights differences in phase caused by terrain elevation. It is a key step in extracting the displacement component. You must align the pixels between two different image ( Before and after one ) to make the comparison hence coregistration 


![image](https://github.com/user-attachments/assets/b395e0e3-8cc2-4b2d-bff4-30776601d88d)

*Source ( Prof : Karima )*

#### Cleanup 

Lets Clean up the file we don't need 

Control select the split file and original image and Right click > Close Products 

No need to save Hit NO 

![image](https://github.com/user-attachments/assets/42fbc2d3-610d-4c69-9a9b-f5aa85d367d3)

### Back Geocoding and Enhanced Spectral Diversity

The S-1 Back Geocoding operator  coregisters the two split products based on the orbit information added in the previous step and information from a digital elevation model (DEM) which is downloaded by SNAP.

Go to 

`Radar > Coregistration > S-1 Tops Coregistration > S1- Back Geocoding `

![image](https://github.com/user-attachments/assets/fdc93177-d47b-4364-90de-6d62f64d5450)

Click on **Add Opened** 

![image](https://github.com/user-attachments/assets/6d54f45b-ebe1-4967-9196-f5ddd45c10ab)

Make sure before image is on the top and after image is at the bottom 

You should see your image there 

![image](https://github.com/user-attachments/assets/35406e46-9976-4a5a-a1b8-07466bb3fdad)

Go to **Back-Geocoding** 

Select the DEM source : For me I am selecting SRTM 1Sec

![image](https://github.com/user-attachments/assets/2ce0ef6b-1656-4616-905b-9ddd59b933a8)

Press **Run** 

You shuold have new stack image with both of your image stacked together , You shouldbe able to see your before and after image intensity 

![image](https://github.com/user-attachments/assets/af63c0a8-eb77-4a45-9f5a-b0d5d2ebc472)

### Enhanced Spectral diversity 

In order to improve the quality of the after image as related to before , Inorder to remove inospheric error this step is used . 

Go to : 

`Radar > Coregistration > S1 TOPS Coregistration > S-1 Enhanced Spectral Diversity ` 

![image](https://github.com/user-attachments/assets/a19cb70f-aabc-4b56-8774-f1d73a6fd79d)

Hit Run

It should add a file with filename_*stack_esd

You can change the visualization parameter from Color Palette 

![image](https://github.com/user-attachments/assets/01eb4927-0221-4cf3-a899-29a326f370c2)


![image](https://github.com/user-attachments/assets/ef830595-7c7a-4944-b91d-a40121518811)


###  Interferogram Formation 

... what does it calculates ? ... 

Go To  

`Radar > Interferometric > Products > Interferogram Formation ` 

![image](https://github.com/user-attachments/assets/a18eea1d-a183-40a2-bc77-3a42208b6cb8)

if you check on Processing Parameters : 

You should see subtract flat-earth phase ticked 

![image](https://github.com/user-attachments/assets/bd62c081-db65-4603-841f-08a269948763)

**Reminder : Make sure input image for the new step is always from the previous step**

You should have new filenamewith_ifg extension

![image](https://github.com/user-attachments/assets/b74dc155-bcba-4f96-b567-46212e1542e6)


### TOPSAR Deburst 

To remove the seamlines between the single bursts we use TOPSAR Deburst 

Go TO : 

`RADAR > Sentinel 1 - TOPS > S-1 TOPS-Deburst` 

![image](https://github.com/user-attachments/assets/dcdb89dc-5007-412d-8009-b2bd717f413f)

Click on Run 

if you visualize the result , it will remove the small black lines between bursts in the image 

![image](https://github.com/user-attachments/assets/4b05c22c-b7d5-4b2e-ab6d-bf91391b0511)


## Generation of Differential Interferogram 
