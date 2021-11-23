# MapVisual-PowerBI
This the repository of creating custom visual 
Using Leaflet to build a map custom map visual for Power-BI through Node.js.

The built custom visual ([mapcv4pbi.0.1.1.pbiviz](https://github.com/alilajevardi/MapVisual4pbi/tree/main/dist) ![picture](https://github.com/alilajevardi/MapVisual4pbi/blob/main/assets/Map4.png)) can be imported to PowerBI desktop. The below image demonstrates an example from ([Liddell.pbix](https://github.com/alilajevardi/MapVisual4pbi/blob/main/Liddell.pbix)):

![picture](https://github.com/alilajevardi/MapVisual4pbi/blob/main/assets/BPI_dashboard.png)

# Setup Envrironment
1. Install Node.js
2. Download the code from here
3. In Node.js command prompt go to the code directory and install required dependencies:

``` npm install -g powerbi-visuals-tools ```

``` npm install --save leaflet ```

``` npm install --save-dev @types/leaflet ```

``` npm install --save @types/leaflet.heat ```

You can use Visual Studion Code as IDE.
The package is built through:
```
pbiviz package
```
