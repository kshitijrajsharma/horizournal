---
title: Exploring Overture Data
excerpt: "Welcome ! First lets start with overture , if you don't know what is  Overture Maps Foundation and what it does I strongly recommend you to go through this website : https://overturemaps.org/ , I tried to build small utilities and hosted them so that readers of this blog also can look into the data and analyze by themselves."
publishDate: 'Jun 9 2024'
featureImage:
  src: 'https://media2.dev.to/dynamic/image/width=800%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fhqko9wyts1582xl75rrl.png'
  alt: Overture Map Viewer
seo:
  title: Explore OvertureMap Data 
  description: Qualitative quantitative analysis of overturemap data quality
  image:
    src: 'https://media2.dev.to/dynamic/image/width=800%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fhqko9wyts1582xl75rrl.png'
---

Welcome ! First lets start with overture , if you don't know what is  Overture Maps Foundation and what it does I strongly recommend you to go through this website : https://overturemaps.org/ , I tried to build small utilities and hosted them so that readers of this blog also can look into the data and analyze by themselves.

## Release Used

- **Overture release**: 2024-05-16-beta.0

## Objectives

### Primary Objective
- To perform qualitative and quantitative analysis of Overture map data.

### Secondary Objectives
- Visualize the releases on a country level.
- Conduct qualitative analysis to identify additions to existing OSM data and differences across countries.
- Facilitate general users in forming their own opinions based on the available data.

## Approach

1. Build a script to retrieve Overture data as geoparquet with multiple themes (streamlining and automating the process).
2. Convert geoparquet to geojson.
3. Convert flattened geojson to pmtiles.
4. Develop a viewer for comparison and loading.
5. Automate the entire process with a bash script.
6. Compare with population data, existing OSM buildings in the area, and if possible, the number of people per building.

## Considerations

- Duckdb, overturemaps-py, and GDAL were tested for extraction, with overturemaps-py standing out as simple and perfect. The repo was forked, and enhancements were added to the viewer and filters to support any custom key and value.
- Tippecanoe was used to convert geojsonseq to pmtiles.
- A bash script was used to automate the entire process, making it configurable using config.json ([base](https://github.com/kshitijrajsharma/overture-to-tiles/blob/master/scripts/base_theme.json) and [default](https://github.com/kshitijrajsharma/overture-to-tiles/blob/master/scripts/default_theme.json)) for layers, their properties, tile generation settings, combining multiple layers into a single tile, and fetching the right key and value for specific layers.
- The primary statement being validated is: "Overture Maps data will undergo validation checks to detect map errors, breakage, and vandalism to help ensure that map data can be used in production systems."

  ![image](https://github.com/kshitijrajsharma/overture-data-analysis-report/assets/36752999/363fbb4f-8a46-4e86-b28e-0a0bad12dbc3)

## Study Areas 

- Argentina
- Indonesia & Malaysia Area
- Kenya
- Liberia
- Malawi
- Nepal
- Nigeria

Note: Covering bounding boxes were drawn to somehow match the country boundary in above listed countries ( this is not true for all of them - actual boundary may differ ). Data on those bbox were downloaded, viewed, analyzed, and compared regarding its distribution and how it fits with the existing population.

![image](https://github.com/kshitijrajsharma/overture-data-analysis-report/assets/36752999/7e038bdd-082d-4c8d-a310-5ff1bc350f8d)

View Geojson [Here](https://github.com/kshitijrajsharma/overture-data-analysis-report/blob/master/data/study-area.geojson)

## Qualitative Analysis

### Buildings
- Buildings seem to have undergone good conflation.
- Offset and merging of ML datasets have been taken care of.
- Buildings present on satellite images seem to be included in the dataset.

  ![image](https://github.com/kshitijrajsharma/overture-data-analysis-report/assets/36752999/9d2c6e96-2905-4b80-8016-e2fe8e7378f9)

  ![image](https://github.com/kshitijrajsharma/overture-data-analysis-report/assets/36752999/c18fa3b2-cad6-4d21-9f8e-eba76ff9dcbf)


### Roads
- Roads are not cleaned and validated.

  ![image](https://github.com/kshitijrajsharma/overture-data-analysis-report/assets/36752999/adcb947e-4cf4-45ea-bf5e-2199c4332c4b)
- When a release is published, there are no major enhancements, and orphan roads remain in the datasets.
- Tags are not fixed or validated (For eg: In Nepal, most of the roads were classified as unclassified - same as OSM. Some major roads have inconsistency in trunk and primary). It appears that tags validation is still ongoing or something is not being looked into.


### Some Validation Issues
- Pular Pisau, Borneo (Near Malaysia):

  ![image](https://github.com/kshitijrajsharma/overture-data-analysis-report/assets/36752999/665d06de-567d-4b80-b869-42116a77d4ca)

 - Height feature is present in only some buildings. In countries like Nepal, it is minimal.

   ![image](https://github.com/kshitijrajsharma/overture-data-analysis-report/assets/36752999/7a685baa-2a0f-4d5e-babf-e775f1b8bbc0)

- Inconsistent tags in road dataset along with orphan roads as mentioned above

- Meanwhile , POI datasets appear to be detailed and populated in most places, making them easily importable into OSM. You need to be aware of confidence though 

  ![image](https://github.com/kshitijrajsharma/overture-data-analysis-report/assets/36752999/dc9e7168-d2cf-4601-adc8-e6d34ff6f135)

## Quick summary 
- Overture datasets stand out well for building footprints and POIs, relatively speaking. Transportation, Land, and Land Use seem somewhat similar to OpenStreetMap. (This is before overture released new land cover datasets which I haven't looked into) 
- Validation and conflation are poor in layers other than buildings.
- Good offset alignment with roads.

## Quantitative Analysis

### Buildings

| Area      | Google Open Buildings | %    | Microsoft ML Buildings | %    | OpenStreetMap (as per Overture info) | %   | Total Overture Buildings | Population Estimate | P.E. (in mil) | People per Building | Approx Current OSM Buildings |
|-----------|-----------------------|------|------------------------|------|-------------------------------------|------|--------------------------|---------------------|----------------|---------------------|------------------------------|
| Argentina | 34,545,592            | 73%  | 8,998,855              | 19%  | 3,457,499                          | 7%   | 47,001,946               | 78,765,589          | 78.77          | 1.68               | 3,497,866                    |
| Liberia   | 1,557,014             | 55%  | 144,185                | 5%   | 1,148,863                          | 40%  | 2,850,062                | 10,157,546          | 10.16          | 3.56               | 1,151,027                    |
| Indonesia | 4,314,085             | 41%  | 2,485,377              | 24%  | 3,641,263                          | 35%  | 10,440,725               | 27,523,228          | 27.52          | 2.64               | 3,651,924                    |
| Nepal     | 26,280,737            | 68%  | 4,396,928              | 11%  | 8,078,311                          | 21%  | 38,755,976               | 129,874,888         | 129.87         | 3.35               | 8,243,272                    |
| Malawi    | 8,882,648             | 61%  | 1,758,044              | 12%  | 3,927,989                          | 27%  | 14,568,681               | 29,256,446          | 29.26          | 2.01               | 3,943,125                    |
| Kenya     | 20,334,091            | 59%  | 3,734,399              | 11%  | 10,414,457                         | 30%  | 34,482,947               | 75,320,339          | 75.32          | 2.18               | 10,557,014                   |
| Nigeria   | 50,787,453            | 68%  | 7,150,013              | 10%  | 16,304,722                         | 22%  | 74,242,188               | 252,698,591         | 252.70         | 3.40               | 17,966,401                   |

Overture release: 2024-05-16-beta.0

PS: Population and Current OSM Buildings Estimate is from Kontour API  
People per building =  Population Estimate on the Area  / Total Overture Buildings 
Approx current OSM buildings = Fetched from the OSM at current date to validate the overture osm building numbers may not match as overture kept snapshot of osm and by the time of this analysis buildings might increase or decrease in osm, should give rough idea  
Analysis was not done on exact country boundary, its bbox taken in the area as provided in the geojson and shared the same geometry using different parameters

### Places distribution based on confidence value 

According to overture confidence values in places is about the existence of the place itself, which means if it has 50 % that means there is 50/50 chance that place exists there. I tried to see how much can I trust may be those above 80 % ? or 70 so I tried to figure out how much data is there in this threshold . 

| Country                    | Above 90 % Confidence | 80-90 %  | 70-80 % | 50-70 %  | Below 50 % |
|----------------------------|-----------------------|----------|---------|----------|------------|
| Argentina                  | 0.438                 | 17.3557  | 1.6333  | 38.1136  | 42.4594    |
| Indonesia & Malaysia Area  | 0.1412                | 12.3793  | 0.3198  | 47.8856  | 39.2741    |
| Kenya                      | 0.2197                | 12.8847  | 1.8883  | 41.023   | 43.9842    |
| Liberia                    | 0                     | 10.0957  | 0.3299  | 58.1326  | 31.4418    |
| Malawi                     | 0.1422                | 12.9801  | 1.2269  | 51.0135  | 34.6373    |
| Nepal                      | 0.4004                | 11.0466  | 5.9221  | 33.3404  | 49.2904    |
| Nigeria                    | 0.1078                | 10.2943  | 1.3312  | 38.5526  | 49.7141    |
| **Average**                | **0.2070428571**      | **12.43377143** | **1.807357143** | **44.00875714** | **41.54304286** |

P.S. Table is in percentage distribution for example in Argentina out of POI available there only 0.4 percentage of data with more than 90 % confidence 

## Conclusion

From the qualitative analysis conducted on different parts of the world, the data is impressive in terms of offset management when different sources are grouped. I am preetty amazed to see the coverage along with conflation and offset  accross the different parts of the world. Buildings seem to be well-matched with each other on an obsolete level, and when ground truth checking with Esri imagery, it covers most places. However, when combined with the tabular analysis in most of the places people-per-building ratio are not that realistic yet they are not worst too (seems it doesn't left out and covers most , it might have some extra clutter buildings). For example, in Argentina, it's 1.68 which seems pretty low. It appears that OpenStreetmap buildings are preserved and are as told (given highest priority - if you look into current approx OSM buildings and numbers included in overture they are quite similar). A massive number of AI building footprints are added to the datasets, whereas google buildings are almost more than 50% in all of the area (Except Indonesia). For roads, validation is still poor, especially in areas like Nepal and Indonesia, where many orphan roads exist in the datasets.I expect tags validation and cleaning specially on road which is not case in the areas I looked into , tags such as primary roads , trunk , unclassified roads are inconsistent. The POI datasets seem well-detailed, and there is great potential for them to be added to OSM after validation, as RapID already has this functionality. While doing so you need to be aware that higher confidence data is low as compared to number of datasets available . On average : only 0.2 % are of above 90 % and 12.4 % on 80 - 90 percent confidence values so even though total row numbers are large better to filter them based on higher confidence. 3D height data is not impressive in the developing countries yet I was surprised to see some of them in countries like Nepal. Building footprints seems to be well defined and aligned with transportation layers exploring the potential that it might be quickly checked validated and used in case of pre-disaster response.

This analysis might be incomplete and is my only personal view with quick analysis on the area I looked into. It is suggested to form your own opinion using the developed tools and data shared as shown in the video by the end of this blog.

## Tools and Resources Developed

### Querier 

https://queryparquet.streamlit.app/  (Tool might go in sleep mode if there is no usage , Please wake it up if needed)

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/z24up5e1md33na2j2nl3.png)


Source code : https://github.com/kshitijrajsharma/qrp 

**Features : **
- Allows you to shoot custom queries on the parquet data , such as stats , how many rows are their which are from microsoft , meta etc 
- Default query to get stats based on the source 
- Provides a box where you can form your own query if you like 
- Integrates OpenStreetMap current buildings and population of the area (based on bbox supplied) so that you can use it in your query for the analysis 
- Supports remote parquet url as input and prepopulates the study area that I did 

#### Example dirty query to get % distribution for places 

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/2tu466zoe9x2dui0ik0h.png)



### Viewer
I made a quick dirty viewer to do qualitative analysis, The viewer can directly be accessed from Querier or also available here: https://hotosm.github.io/overture-to-tiles/ 


![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/hqko9wyts1582xl75rrl.png)


Viewer supports remote pmtiles and custom styling , Example viewer with default styling : https://hotosm.github.io/overture-to-tiles/?url=https%3A%2F%2Fstaging-raw-data-api.s3.amazonaws.com%2Fdefault%2Foverture%2F2024-05-16-beta.0%2Fargentina%2Fpmtiles 

Source code : https://github.com/kshitijrajsharma/overture-to-tiles/tree/master/docs 

**Viewer features : **
- Simultaneously view the place in OpenStreetMap , Overture and ESRI satellite image 
- Open all layers in OpenStreetMap Editor : RapID 
- Allows user to download geoparquet of source
- Query the attributes and tile bounds 
- Custom styling supports for the vector layers like this : https://github.com/kshitijrajsharma/overture-to-tiles/blob/master/docs/styles/default.js 
- Supports remote pmtiles using url parameter 
- Toggle vector layers and their classes along with OpenStreetMap and  ESRI Satellite image
- 3D view with both overture height data and OSM no of floors data

### Quickly View Study Area Datasets

- [Argentina](https://hotosm.github.io/overture-to-tiles/?url=https%3A%2F%2Fstaging-raw-data-api.s3.amazonaws.com%2Fdefault%2Foverture%2F2024-05-16-beta.0%2Fargentina%2Fpmtiles)
- [Indonesia & Malaysia Area](https://hotosm.github.io/overture-to-tiles/?url=https%3A%2F%2Fstaging-raw-data-api.s3.amazonaws.com%2Fdefault%2Foverture%2F2024-05-16-beta.0%2Findonesia%2Fpmtiles)
- [Kenya](https://hotosm.github.io/overture-to-tiles/?url=https%3A%2F%2Fstaging-raw-data-api.s3.amazonaws.com%2Fdefault%2Foverture%2F2024-05-16-beta.0%2Fkenya%2Fpmtiles)
- [Liberia](https://hotosm.github.io/overture-to-tiles/?url=https%3A%2F%2Fstaging-raw-data-api.s3.amazonaws.com%2Fdefault%2Foverture%2F2024-05-16-beta.0%2Fliberia%2Fpmtiles)
- [Malawi](https://hotosm.github.io/overture-to-tiles/?url=https%3A%2F%2Fstaging-raw-data-api.s3.amazonaws.com%2Fdefault%2Foverture%2F2024-05-16-beta.0%2Fmalawi%2Fpmtiles)
- [Nepal](https://hotosm.github.io/overture-to-tiles/?url=https%3A%2F%2Fstaging-raw-data-api.s3.amazonaws.com%2Fdefault%2Foverture%2F2024-05-16-beta.0%2Fnepal%2Fpmtiles)
- [Nigeria](https://hotosm.github.io/overture-to-tiles/?url=https%3A%2F%2Fstaging-raw-data-api.s3.amazonaws.com%2Fdefault%2Foverture%2F2024-05-16-beta.0%2Fnigeria%2Fpmtiles)


### Extractor 

https://github.com/kshitijrajsharma/overture-to-tiles/blob/master/scripts/Readme.md

https://github.com/kshitijrajsharma/overture-to-tiles/ 

**Extractor features : **
- Automates extraction from overture data using custom theme : https://github.com/kshitijrajsharma/overture-to-tiles/blob/master/scripts/base_theme.json 
- Supports children layers to be combined into single pmtiles layer 
- s3 upload 

### Quick demo how you can visualize and analyze the data 

Watch Video : 

https://github.com/kshitijrajsharma/overture-data-analysis-report/assets/36752999/31eb9917-3fff-42db-9f5d-d2c53649bb81

### Resources and Credits : 
- Pmtiles , Overture-py , Tippecanoe , Overture-docs , RapID

I welcome your thoughts and comments. 