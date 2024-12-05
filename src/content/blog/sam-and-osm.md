---
title: Segment Anything (SAM) and OpenStreetMap (OSM)
excerpt: The purpose of this research document is to explore the possibilities of the Segment Anything Model (SAM) [Segment Anything](https://github.com/facebookresearch/segment-anything)  developed by Meta in OpenStreetMap mapping. SAM is a promising model in the field of image segmentation, and its potential application to fAIr could enable the tracing of various features on maps. This document provides an overview of SAM's working mechanism, test cases conducted with SAM, and two potential integration ideas for utilizing SAM
publishDate: 'June 3 2023'
featureImage:
  src: '/posts/sam/images/image5.png'
  alt: Segment Anything Running on Drone Image
seo:
  image:
    src: '/posts/sam/images/image11.png'
---
## **Introduction**

The purpose of this research document is to explore the possibilities of the Segment Anything Model (SAM) [Segment Anything](https://github.com/facebookresearch/segment-anything)  developed by Meta in OpenStreetMap mapping. SAM is a promising model in the field of image segmentation, and its potential application to fAIr could enable the tracing of various features on maps. This document provides an overview of SAM's working mechanism, test cases conducted with SAM, and two potential integration ideas for utilizing SAM

## **SAM Working Mechanism**

SAM operates directly on images and generates individual masks based on the training datasets used during model training. Unlike object detection models, SAM focuses on segmenting all elements present in an image, regardless of their nature, based on texture, color, and points of difference from the background and several others can be found on their research doc  
![image1](/posts/sam/images/image9.png)

### ***Advantages of SAM for fAIr and OSM Mapping***

* SAM can run inference on the user's browser, ensuring accessibility and reducing server-side processing.  
* SAM allows excellent automatic tracing of individual features based on user mouse-over interactions, enhancing user interaction and customization which can be used on OSM editors

## **Test Cases with SAM**

Test cases were conducted using drone images to evaluate SAM's performance in tracing various features. The following results were observed:

### ***Initial Impressions:***

SAM excels in accurately tracing features, as demonstrated in the test case. It demonstrates the impressive ability to identify and trace objects with precision.  
![image2](/posts/sam/images/image5.png)  
However, SAM struggles with line features, as evidenced by the poor performance in detecting and identifying road masks  
![image3](/posts/sam/images/image11.png)

### ***SAM's Classification Abilities:***

SAM can classify polygons, making it applicable to land use features in OpenStreetMap (OSM). The output may vary depending on the zoom level, such as generating a polygon enclosing all building features at zoom level 19 and tracing individual buildings at zoom level 21\.

### ***Retraining SAM:***

SAM is often misconstrued as a model that can be retrained for object detection purposes. However, SAM's primary function is segmentation rather than object detection. While additional training datasets can enhance the accuracy of segmentation classes, the base model of SAM already performs excellently, making retraining less preferred 

## **Integration Ideas for SAM** 

Two promising integration ideas for incorporating SAM are proposed:

### ***Idea 1: SAM as Tracer***

By leveraging the fAIr utilities and satellite images, SAM can be used to trace features on maps. The workflow involves:

* Utilizing SAM for feature tracing on the map  
* Assigning labels manually and refining polygons if necessary  
* Running conflation from fAIr to convert the traced features into OSM XML format  
* Pushing the converted features to OpenStreetMap

GIF illustration demonstrates the ability of SAM's creating masks in mouse hover which can later integrated with osm editors  
![image4](/posts/sam/images/image12.jpg)  
![image5](/posts/sam/images/tracer.gif)

#### *fAIr Usage:*

Although this approach does not align fully with the current version of fAIr, various fAIr sub-modules can be utilized. These include converting TMS to GeoTIFF, performing conflation, converting masks to vectors, and transforming conflated features into OSM XML format.

### ***Idea 2: Integrating SAM with Object Detection Models***

SAM can be combined with object detection models, such as [Grounding Dino](https://github.com/IDEA-Research/GroundingDINO)  and MMDetection, to achieve improved segmentation accuracy. GroundingDINO, an open-set object detection model, recently added support for SAM. Object detection models are employed to classify objects on the map, which are then segmented using SAM. GroundingDINO is retrainable and can be used as a base model alongside SAM. For this test i have used groundingdino but several others good performing object detection models can be used

![image6](/posts/sam/images/image4.png)

#### *Test Cases with GroundingDINO:*

Test cases were conducted using SAM in conjunction with GroundingDINO on aerial images. The following observations were made:

Example: Tracing Sea , Buildings block , Trees , Vehicle

SAM, combined with GroundingDINO, successfully identified and traced a yellow vehicle in the image. This demonstrates the potential for promising performance when trained with relevant data.Currently, GroundingDINO lacks understanding of buildings and swimming pools in drone images. However, when trained with local data specific to these features, it can become highly beneficial. The role of SAM in this context is to precisely trace the located features, resulting in accurate segmentation.

TODO: Since GroundingDINO is also still in research, inference code is available but training is not (it's on their checklist though) once training code is available of grounding dino , it would be better to test training with local datasets 

*Screenshots Respectively : Detecting trees only with object detection model , Building Blocks , GroundingDIno output for sea , SAM mask for sea supplied from bbox of object detection model and finally the pond on bing image*  
![image7](/posts/sam/images/image2.png)  
![image8](/posts/sam/images/image3.png)  
![image9](/posts/sam/images/image6.png)  
![image10](/posts/sam/images/image7.png)  
![image11](/posts/sam/images/image1.png)
![image12](/posts/sam/images/image10.png)


## **Application of SAM in OSM and fAIr**

The utilization of SAM within the OSM and fAIr project presents several opportunities:

* SAM can be individually implemented as tracer for existing OSM editors a simple webUI platform that can load OAM and start tracing features would be beneficial to apply this idea or as a plugin in JOSM  
* Buildings: While there are still some deficiencies in using SAM for building tracing, an existing high-quality basemodel, RAMP, can be employed. For other features such as swimming pools, land use, natural elements, and sea ponds, SAM can be utilized, working with user-provided datasets in the fAIr project.  
* Alignment with fAIr approach: The proposed SAM \+ object detection model integration aligns with the fAIr approach, but further research is required to address performance considerations, determining the computational requirements for retraining Object detection models, and estimating the time required for training and inference processes.

## **Conclusion**

The Segment Anything Model (SAM) developed by Meta shows great promise in the field of image segmentation. Its ability to segment various features based on texture, color, and points of difference presents opportunities for integration into the fAIr project. Through test cases and evaluation, SAM's strengths and limitations have been identified. Integration ideas, including SAM as a tracer and combining SAM with object detection models, have been proposed. These integration possibilities can enhance feature tracing, classification, and segmentation within the OSM and fAIr project. Further research and testing is necessary to find a good object detection model, optimize performance and determine the practical implementation of SAM within the fAIr framework.

fAIr is a free and open source AI project initiated by HOTOSM. Know more :[https://github.com/hotosm/fair](https://github.com/hotosm/fair)

Resources :   
[https://github.com/IDEA-Research/Grounded-Segment-Anything](https://github.com/IDEA-Research/Grounded-Segment-Anything)  
[https://github.com/facebookresearch/segment-anything](https://github.com/facebookresearch/segment-anything)  
[https://github.com/UX-Decoder/Segment-Everything-Everywhere-All-At-Once](https://github.com/UX-Decoder/Segment-Everything-Everywhere-All-At-Once)  
[https://github.com/RockeyCoss/Prompt-Segment-Anything](https://github.com/RockeyCoss/Prompt-Segment-Anything)  
[https://github.com/opengeos/segment-geospatial](https://github.com/opengeos/segment-geospatial)  
[https://github.com/IDEA-Research/GroundingDINO](https://github.com/IDEA-Research/GroundingDINO)  
[https://github.com/OptimalScale/DetGPT](https://github.com/OptimalScale/DetGPT)  
Collab test notebooks :
Segmentanything2osm :[https://colab.research.google.com/drive/1n4OgMZX0JkoFGh\_j-NDCqafHtyqnRFfL?usp=sharing](https://colab.research.google.com/drive/1n4OgMZX0JkoFGh_j-NDCqafHtyqnRFfL?usp=sharing)

Segmentanything2osm class based  
[https://colab.research.google.com/drive/1vIsvkkki\_EeMWUkxZuQ5HXhU2N9usV4F?usp=sharing](https://colab.research.google.com/drive/1vIsvkkki_EeMWUkxZuQ5HXhU2N9usV4F?usp=sharing)  
Segment any anomaly  
[https://colab.research.google.com/drive/1gneKlzWxNTFKsil45IFU6cYxgTq9HYYi?usp=sharing](https://colab.research.google.com/drive/1gneKlzWxNTFKsil45IFU6cYxgTq9HYYi?usp=sharing)

Grounded sam  
[https://colab.research.google.com/drive/1kNu7zW2AOJsllvF-ROmVne9Uh7X5iswu?usp=sharing](https://colab.research.google.com/drive/1kNu7zW2AOJsllvF-ROmVne9Uh7X5iswu?usp=sharing)
