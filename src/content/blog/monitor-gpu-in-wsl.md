---
title: Monitor GPU Usage in WSL debian
excerpt: In the competitive world of front-end development, a strong portfolio is your ticket to showcasing your skills, making a lasting impression on potential employers or clients, and advancing your career. Your portfolio is your digital business card, and it should be a reflection of your talent, creativity, and expertise.
publishDate: 'Jan 10 2024'
featureImage:
  src: 'https://media2.dev.to/dynamic/image/width=800%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fzix26djow1vmzccplctj.png'
  alt: Nvtop
seo:
  image:
    title: GPU Usage in WSL 
    description: Monitor GPU usage in WSL Debian
    src: 'https://media2.dev.to/dynamic/image/width=800%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fzix26djow1vmzccplctj.png'
    alt: Monitoring GPU in WSL windows
---
[NVTOP](https://github.com/Syllo/nvtop) is like htop but for your graphics module . In this short tutorial I will share how to install nvtop in wsl debian 

OS used : 

`cat /etc/os-release`

```
PRETTY_NAME="Debian GNU/Linux 12 (bookworm)"
NAME="Debian GNU/Linux"
VERSION_ID="12"
VERSION="12 (bookworm)"
VERSION_CODENAME=bookworm
ID=debian
HOME_URL="https://www.debian.org/"
SUPPORT_URL="https://www.debian.org/support"
BUG_REPORT_URL="https://bugs.debian.org/"
```

1) Verify your graphics driver
In my case I have nvidida graphics 

```bash
nvidia-smi
```
It should display details about your graphics , if not first install it

2) Edit your debian source list to include non-free releases 
```bash 
sudo nano /etc/apt/sources.list
```

2) Modify the source list and add following 

```
deb http://deb.debian.org/debian/ bookworm main contrib non-free-firmware
```
3) Get update 

```bash 
sudo apt get update
```

4) Now you can install nvtop 

```bash
sudo apt install nvtop
```
Now hit `nvtop` and you are all set !! 

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/zix26djow1vmzccplctj.png)

