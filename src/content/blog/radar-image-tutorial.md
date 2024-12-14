---
title: 'Working with RADAR : Case Study in Jajarkot EarthQuake'
excerpt: Step by Step tutorial to work with Sentinel 1 RADAR image with preprocessing analysis in my case study. 
publishDate: 'Dec 13 2024'
featureImage:
  src: 'https://github.com/user-attachments/assets/f83b49a4-f8d2-45ad-abb9-1bd6d4251a18'
  alt: Earthquake Displacement
isFeatured: false
published: true
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

This is where we actually calculate the phase difference between two images along with coherence 

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

By generating a differential interferogram, we remove the topographic effects, extracting the phase
changes caused by ground displacement. 

![image](https://github.com/user-attachments/assets/e0985e1f-42ac-4cef-ab3c-56f9623d85c4)

*Source : Prof Karima*


### Interferogram formation 

**Topographic Phase Removal**

GOTO : 

`Radar > Interferometric > Products > Topographic Phase Removal` 

![image](https://github.com/user-attachments/assets/79946621-98a8-4272-a2cc-6e9cd3ce5d85)

Navigate to Processing Parameters 

Choose the DEM source : For me I chose SRTM 1sec 

![image](https://github.com/user-attachments/assets/d3e5d8bc-9f82-4e88-b242-97cba4fd72a8)

Check Output Topographic Phase band and the elevation band ( Lets visualize the elevation as well ) 

![image](https://github.com/user-attachments/assets/15afe862-2511-4515-9f26-a4c83b6f7fae)

Hit Run 

I get the output like this along with elevation band 

![image](https://github.com/user-attachments/assets/5dca6047-ba18-4f5f-aaeb-bf54f12e0885)

### Multilooking 

We need to create square pixels to make the resolutions same in range(approx 3m) and azimuth (approx 7m). we are used to see pixels in square 

GOTO 

`RADAR > SAR utilities > Multilooking`

![image](https://github.com/user-attachments/assets/d2871279-754a-4cc0-a9f4-92801925b256)

Navigate to processing parameters and  change number of looks for range and azimuth.


For me I am using Range Looks : 8 and Azimuth Looks : 2 because it results approx 30m resolution which is enough for me because usualy displacement will happen in larger level, You can see the resolution after the value changes

![image](https://github.com/user-attachments/assets/3e9ca2ba-e190-4c7b-bdad-8dede9f5b4d4)

This is how output looks like 

![image](https://github.com/user-attachments/assets/8b7416e1-347c-4054-a4cb-a8139ef38ee0)

### Goldstein Phase Filtering 

Lets filter the noise so that we can improve visual interpretability of differential interferogram.

GOTO : 

`Radar > Interferometric > Filtering > Goldstein Phase Filtering.`

![image](https://github.com/user-attachments/assets/354946cf-cc97-4198-9485-1d0238272236)

Navigate to processing parameters and play with the filter value , For me I am using 0.9 as There is quite some noise in my image  

![image](https://github.com/user-attachments/assets/8c06a684-c71e-4862-89b1-ae2ef9b04e54)


Hit RUN 

This is what I got as output , I have some noise in the right bottom part of image : for now it is okay but you can also play with it and increase the filter to 0.8 

![image](https://github.com/user-attachments/assets/e9523184-585e-448d-8314-b80b52d34a68)


## Creation of Displacement Map 

### Dowload snaphu plugin 
The wrapped phase values need to be unwrapped to obtain continuous displacement
measurements.

For this output : We need this plugin to be installed : https://step.esa.int/main/snap-supported-plugins/snaphu/ 

![image](https://github.com/user-attachments/assets/63f5a778-40a7-493e-8c0b-4c006d9049d6)


For Debian based distributions, You can install it directly from the apt 
```bash
sudo apt get update
sudo apt install snaphu
``` 

### Export env for snaphu 
Lets create env needed for snaphu 

GO TO 
`Radar > Interferometric > Unwrapping > SNAPHU Export`

![image](https://github.com/user-attachments/assets/9551a64c-7afc-4ec1-bc2f-2ef4d2221978)

Navigate to SnaphuExport 

Select the folder where output would be stored ( Recommended to create new folder ) , For me I created snaphu-export folder with snaphu_output filename 

Change No of tile rows and tile columns and number of processer based on your laptop spec , For me I used 8 processers and 10 rows/column . Bearing in mind if you set 1 tile per time it will disable the multiprocesser option ! It is advised to process tiles in parallel 

![image](https://github.com/user-attachments/assets/e552da8d-5239-4b2e-a4bb-05619c28fb0b)


Hit Run 

Now navigate to the folder you specified you should see following structure 

![image](https://github.com/user-attachments/assets/979f76b1-dc97-4d29-b946-b49b9169da36)

Now open snaphu.conf in one of your editor ( Notepad ++ , VSCode , Kate any you prefer ) 

![image](https://github.com/user-attachments/assets/38311a63-9cba-40c3-8083-ec25b45c5ad6)


Now Here : 

- Comment out logfile
- Find the name of coherence file from the folder and Specify it in CORRFILE 

![image](https://github.com/user-attachments/assets/8b565cd5-7ce8-40a5-b2b7-2d0e1982ef79)

Your final conf should look like this 


![image](https://github.com/user-attachments/assets/c7dfc0ea-0d3f-4e1c-ab7d-569a2022823d)

Now open terminal in the folder dir , Remember in the folder dir 


![image](https://github.com/user-attachments/assets/ba8ff5f8-5525-4199-9511-af6ebc5d0f52)


Now you will find the command on top of the file, Copy & run the command in terminal


![image](https://github.com/user-attachments/assets/bdae6c28-fb57-42a3-a5bc-da472883f08c)


The time differs based on the performance of laptop & the number of tiles you are processing based on your parameter in snaphu export , For me it took 1 min 43 sec 

![image](https://github.com/user-attachments/assets/3020dbce-dc0e-46f7-aeb3-9cc9baa4b8c5)



### Import from Snaphu 

Now lets import the processing output from snaphu 
Goto : 

`Radar > Interferometric > Unwrapping > Snaphu Import`

![image](https://github.com/user-attachments/assets/56fffe40-8c12-47b5-a140-5b32b692c6cb)


Select the output file , Remember OUTFILE information is in `snaphu.conf`
![image](https://github.com/user-attachments/assets/53691766-01e3-4098-8754-13a149c68254)

Navigate to : 2 Read-Unwrapped-Phase & Open the result from snaphu 

Select `.hdr` file format 


![image](https://github.com/user-attachments/assets/43166ee8-7691-474e-8a82-ed87b1a095ad)


Navigate to Snaphu Import and Tick on Don't save wrapped inferogram in the target Product 

![image](https://github.com/user-attachments/assets/58f5fa38-3e4d-4116-845a-a1a845008248)

Navigate to Write tab 

And edit the name add _unwrapped in the name for disntinction 

![image](https://github.com/user-attachments/assets/a162530f-547d-473b-9ad7-5044aeb0bec3)

Hit Run 

This is how my  output looks like 
![image](https://github.com/user-attachments/assets/c2fbbfab-35db-416a-aeda-02c46f34bb1b)

### Generate of Displacement Map 

This step converts the unwrapped phase into displacement values, enabling the analysis of
ground movement.

Go to

`Radar > Interferometric > Products > Phase to Displacement`

![image](https://github.com/user-attachments/assets/263e547a-3ab2-4177-88bd-549d16e5144a)

Hit RUN 

This is how my displacement map looks like 
![image](https://github.com/user-attachments/assets/0f7d172c-c227-49b5-a836-270b09a1cff7)

### Terrain Correction 

Terrain correction georeferences the displacement map to a coordinate system and removes
distortions caused by topography, ensuring accurate spatial analysis.

Goto : 

`Radar > Geometric > Terrain Correction > Range-Doppler Terrain Correction`

![image](https://github.com/user-attachments/assets/c972f6da-94a7-4491-bd26-a8650f075522)

Navigate to Processing Parameters and Select DEM , I selected SRTM 1Sec 

![image](https://github.com/user-attachments/assets/2a6566ae-b840-446d-b208-48844f064823)

Hit Run 

This is what I get as output 
![image](https://github.com/user-attachments/assets/c90ee29c-7fee-4597-a2b3-44dcb1c9e545)

Lets understand this displacement Map 

I changed the visualization from left bottom window and changed editor to slider 
![image](https://github.com/user-attachments/assets/ae9f987c-15c7-46be-89fd-5d06e49fce28)


If you look into the value , Blue area was the area where terrain went down by approx 16 cm and nearby area terrain raised by 23.7 cm 

![image](https://github.com/user-attachments/assets/217dd8aa-4dee-4eeb-815c-2cd8ea0bdba7)

### Export displacement Map 

Right click on the image 

![image](https://github.com/user-attachments/assets/176ee8e1-b950-4776-8ad2-bb5db02fa23a)

And Click on Export View as Google Earth KMZ 
![image](https://github.com/user-attachments/assets/3e2e1050-41eb-43d7-a806-4678937dd712)

Lets visualize this KMZ in QGIS 

Set layer transparency to 50% so that we can visualize area where terrain went down and terrain went up after earthquake 

![image](https://github.com/user-attachments/assets/42077a2b-5203-4e9c-a89b-2985cde6f59c)

here is the output and as you can see area is nearly earthquake area and hence we can verify this output makes sense ! 
![image](https://github.com/user-attachments/assets/3ec2e1db-36f5-4838-8242-d445a11f909e)

You can also export image as geotiff and other formats as well 

![image](https://github.com/user-attachments/assets/94849252-7b8a-49ce-be91-e5e26cdefa1c)


Thank you for reading ! 


## Sources and Credit : 

- https://www.youtube.com/watch?v=ZPMRaztNbVU&t=393s
- Prof. Karima Hadj-Rabah
- Paris - Lodron University , Z-GIS Department 
- ESA Snaphu Tutorial 

