Sentinel 2 Raw Image 
![image](https://github.com/user-attachments/assets/a8d724d5-8cf9-423b-bde9-5b45ce517b0d)

Work on 10m resolution 

Get all the jp2 images 

```bash
ls -1 *.jp2 > jp2_list.txt
```

Merge

```bash
gdal_merge.py -separate --optfile jp2_list.txt -o sentinel_r10.tif 
```

Or

```bash
gdal_merge.py -separate T45RTM_20241225T050129_B02_10m.jp2 T45RTM_20241225T050129_B03_10m.jp2 T45RTM_20241225T050129_B04_10m.jp2 T45RTM_20241225T050129_B08_10m.jp2 -o sentinel210m.tif -a_nodata 0
```


Check : 
```bash
gdalinfo sentinel_r10.tif
```

Size : 

2.1 GB for the merged file 
