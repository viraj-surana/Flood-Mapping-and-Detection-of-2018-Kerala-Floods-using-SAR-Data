# Kerala 2018 Flood Visualization using Google Earth Engine

## 📚 Overview

This project focuses on visualizing and analyzing the 2018 Kerala floods using satellite imagery and geospatial datasets on **Google Earth Engine (GEE)**.

---
## Play Around with Deployed Segment
https://e-waniashutosh9.projects.earthengine.app/view/kerala-flood-analysis

---
## 🧰 Prerequisites

- A Google Account  
- Approval for using Google Earth Engine  
- Basic familiarity with JavaScript and remote sensing concepts  

---

## 🌐 Setting Up Google Earth Engine

### ✅ Step 1: Sign Up

1. Visit: [https://signup.earthengine.google.com/](https://signup.earthengine.google.com/)
2. Fill in the required details and submit the form.
3. Wait for approval (usually within 24–48 hours).

### ✅ Step 2: Access the Code Editor

- Open: [https://code.earthengine.google.com/](https://code.earthengine.google.com/)

---

## ▶️ How to Run the Code

1. Open the GEE Code Editor.
2. Create a new script using the **"Scripts"** tab.
3. Paste the relevant JavaScript code.
4. Add the required imports (see below).
5. Click the **"Run"** button to execute.

---

## 📦 Required Imports

### 🛰️ Kerala_2018_Flood_Visualization

> var s1 = ee.ImageCollection("COPERNICUS/S1_GRD"),  
> admin2 = ee.FeatureCollection("FAO/GAUL_SIMPLIFIED_500m/2015/level2");

---

### 🔧 RemovingSpeckle

> var admin2 = ee.FeatureCollection("FAO/GAUL_SIMPLIFIED_500m/2015/level2"),  
> s1 = ee.ImageCollection("COPERNICUS/S1_GRD"),  
> gsw = ee.Image("JRC/GSW1_4/GlobalSurfaceWater"),  
> hydrosheds = ee.Image("WWF/HydroSHEDS/03VFDEM");

---

### 🔍 Before_After

> var admin2 = ee.FeatureCollection("FAO/GAUL_SIMPLIFIED_500m/2015/level2"),  
> s1 = ee.ImageCollection("COPERNICUS/S1_GRD");

---

## 🙌 Project Contributors

**Submitted by:**

- Ashutosh Dilip Wani (22BDS008)  
- Aman Gaikwad (22BDS021)   
- Varang Pratap Singh (22BDS062)  
- Viraj Surana (22BDS064)  

**Under the guidance of:**  
**Dr. Shirshendu Layek**  
Assistant Professor, IIIT Dharwad

---

## 🏛️ Institution

**Department of Data Science and Artificial Intelligence**  
**Indian Institute of Information Technology, Dharwad**  
📅 April 2025

---

## 📖 Credits

This project uses open-access datasets provided by:

- [Sentinel-1 (COPERNICUS/S1_GRD)](https://developers.google.com/earth-engine/datasets/catalog/COPERNICUS_S1_GRD)
- [FAO GAUL Admin Boundaries](https://developers.google.com/earth-engine/datasets/catalog/FAO_GAUL_SIMPLIFIED_500m_2015)
- [JRC Global Surface Water](https://developers.google.com/earth-engine/datasets/catalog/JRC_GSW1_4_GlobalSurfaceWater)
- [WWF HydroSHEDS](https://developers.google.com/earth-engine/datasets/catalog/WWF_HydroSHEDS_03VFDEM)

---
