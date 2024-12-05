---
title: 'Install latest gdal in Debian'
excerpt: Hi , I am writting short steps about how to install latest gdal version in your debian stable. By the time I am writting this post the default version of gdal available in the stable debian bookworm is 3.6.5 but I want the latest one . Usually gdal will publish the latest release in the unstable source first. if you wanna get your hand on it either you need to install it from the source or you can install it from the unstable source. I will list how to install from unstable source only for the gdal
publishDate: 'May 30 2024'
featureImage:
  src: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fdiversistemas.files.wordpress.com%2F2023%2F06%2Fdebian-12f.jpg%3Fw%3D536&f=1&nofb=1&ipt=d6f3717670b344b544778b3cfae5eec2ce720de2662872455f152237e26d56c7&ipo=images'
  alt: Debian 12
seo:
  image:
    src: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia2.dev.to%2Fdynamic%2Fimage%2Fwidth%3D1000%2Cheight%3D500%2Cfit%3Dcover%2Cgravity%3Dauto%2Cformat%3Dauto%2Fhttps%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fkoyv4z09fpwt1hvkn5ke.png&f=1&nofb=1&ipt=78c8dd799db97b4175a3260759cca1543910467bdca9b9160736fbd93c317ef3&ipo=images'
---
Hi , I am writting short steps about how to install latest gdal version in your debian stable. 

By the time I am writting this post the default version of gdal available in the stable debian bookworm is 3.6.5 but I want the latest one . Usually gdal will publish the latest release in the unstable source first. if you wanna get your hand on it either you need to install it from the source or you can install it from the unstable source. I will list how to install from unstable source only for the gdal

1) First update sour package list 

```bash
 sudo nano /etc/apt/sources.list
```

Add following line 
```bash
deb http://deb.debian.org/debian/ unstable main contrib non-free
```

2) Update package list 

```bash
sudo apt update
```

3) Now install gdal-bin using unstable source

```bash
sudo apt install -t unstable gdal-bin
```
4) Check your gdal version 

```bash
ogrinfo --version
```

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/nd7l6ti22akczdrkdslz.png)




Hurray ! 

## Install gdal python 

if you want python installation of gdal then you can follow following steps : 

- Install gdal dev libraries 
```bash
sudo apt-get install libgdal-dev
```
- Export env variables 
```bash
export CPLUS_INCLUDE_PATH=/usr/include/gdal
export C_INCLUDE_PATH=/usr/include/gdal
```
- Now install gdal using pip 
```bash
pip install gdal==<Version from ogrinfo--version>
```
You are all set ! 