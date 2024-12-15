---
title: Share Postgresql from Windows to WSL Linux 
excerpt: I am writting this short tutorial about how to share your  current postgresql with postgis extension installed in your windows system with WSL. We will use networking share method.  For me , I needed to Install postgersql on my harddisk and I had it already before installing WSL and in need of sharing . I am documenting the steps you can take if you wanna download and install it in windows
publishDate: 'May 14 2024'
featureImage:
  src: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fkinsta.com%2Fwp-content%2Fuploads%2F2022%2F02%2Fpostgres-logo.png&f=1&nofb=1&ipt=9d3d26d4dc21bc1a9c03ea786a13c5e38172fc73e76782d64da409e2d31f4e35&ipo=images'
  alt: Postgresql logo
seo:
  title : Sharing Postgresql from Windows to WSL Linux
  description : Sharing Postgresql from Windows to WSL Linux
  image:
    src: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fkinsta.com%2Fwp-content%2Fuploads%2F2022%2F02%2Fpostgres-logo.png&f=1&nofb=1&ipt=9d3d26d4dc21bc1a9c03ea786a13c5e38172fc73e76782d64da409e2d31f4e35&ipo=images'
---
Hi , I am writting this short tutorial about how to share your  current postgresql with postgis extension installed in your windows system with WSL. We will use networking share method. 
For me , I needed to Install postgersql on my harddisk and I had it already before installing WSL and in need of sharing . I am documenting the steps you can take if you wanna download and install it in windows

- Install and remember your postgresql and postgis version

I followed graphical installation method to install postgis postgresql bundle in my windows 
Download the Installer : 
https://www.enterprisedb.com/downloads/postgres-postgresql-downloads 
Installing postgresql 15 in my case 

- Install Postgis extension from stack builder 

You can follow this awesome [tutorial](https://www.bostongis.com/PrinterFriendly.aspx?content_name=postgis_tut01) in case you get lost

Once you have postgresql on your windows up and running , Now we need to access it from the WSL we have 

- Install postgresql client in your wsl 

```bash
sudo apt install poststgresql-client
```

- Lets configure network mode in wslconfig 

In your windows terminal (Inside Default profile : for eg : In my case C:\Users\mouse\)
```bash
wsl nano .wslconfig
```

```
[wsl2]
networkingMode=mirrored
```

- Check the connection 

```bash
 psql -h localhost -p 5432 -U postgres -d postgres
```

- Restart WSL
```bash
wsl --shutdown
```

Now you should be able to connect to  your windows localhost from your WSL.

