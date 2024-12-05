---
title: Install Debian in Different Location -WSL Windows
excerpt: I was trying to install Debian in different location rather than the C drive . Sharing the steps I took .
publishDate: 'Jan 18 2023'
featureImage:
  src: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcodewithbish.com%2Fwp-content%2Fuploads%2F2021%2F06%2Fcodewithbish-Guide-to-install-Windows-Subsystem-for-Linux-WSL-2-on-windows-10.png&f=1&nofb=1&ipt=c0e79c689be5cf3d82c8d73a120ebc5cdc72e374f82f9e67014a19615905c6f2&ipo=images'
  alt: Windows + WSL
seo:
  image:
    src: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcodewithbish.com%2Fwp-content%2Fuploads%2F2021%2F06%2Fcodewithbish-Guide-to-install-Windows-Subsystem-for-Linux-WSL-2-on-windows-10.png&f=1&nofb=1&ipt=c0e79c689be5cf3d82c8d73a120ebc5cdc72e374f82f9e67014a19615905c6f2&ipo=images'
---
I was trying to install Debian in different location rather than the C drive . Sharing the steps I took . 

OS : Windows 11 
WSL Version : Wsl 2 

1) First install Debian as by default in C 

```bash
wsl --install -d Debian
```

2) Shut down wsl 

```bash
wsl --shutdown
```

3) Export Debian to your desired location 

In my case its E : 

```bash
 wsl --export Debian E:\wsl_export\debian-ex.tar
```
4) Now unregister your old Debian from wsl 

```bash
wsl --unregister Debian
```
5) Now import Debian to the Disk 
```
wsl --import Debian "E:\wsl\Debian" "E:\wsl_export\debian-ex.tar"
```
6) Cleanup 
You can remove your backup now and set Debian as default 
```
wsl --set-default Debian
```

**Extra tips** 
- To make your user in debian superuser : 
After migrating you might loose your default login using username you created before . 

Login to Debian , By default you will be logged in as root and hit following 
```bash
sudo usermod -aG sudo username
```
- Change default user 
```bash
nano /etc/wsl.conf
```
Replace username with your username 

```
[user]
default=username
```
Now `wsl --shutdown` and login debian again you should be logged in as your default user with sudo access 
