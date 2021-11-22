/*
*/
"use strict";

import "core-js/stable";
import "./../style/visual.less";
import "./../node_modules/leaflet/dist/leaflet.css";
import powerbi from "powerbi-visuals-api";
import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;
import EnumerateVisualObjectInstancesOptions = powerbi.EnumerateVisualObjectInstancesOptions;
import VisualObjectInstance = powerbi.VisualObjectInstance;
import DataView = powerbi.DataView;
import VisualObjectInstanceEnumerationObject = powerbi.VisualObjectInstanceEnumerationObject;
import * as L from "leaflet";

import { VisualSettings } from "./settings";
export class Visual implements IVisual {
    private target: HTMLElement;
    private updateCount: number;
    private settings: VisualSettings;
    private textNode: Text;
    private map: L.Map;

    constructor(options: VisualConstructorOptions) {
        console.log('Visual constructor', options);
        this.target = options.element;
        this.updateCount = 0;
        // Fill the target element with the Leaflet map
        this.target.style.width = "100%";
        this.target.style.height = "100%";

        // Base maps
        var Esri = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {attribution: 'ESRI', minZoom: 1, maxZoom: 20}); 
        var osm = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {attribution: '&copy; OSM', minZoom: 1, maxZoom: 20});
        var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {attribution: '&copy; OpenTopoMap', minZoom: 1, maxZoom: 20});
        var white = L.tileLayer("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEAAQMAAABmvDolAAAAA1BMVEX///+nxBvIAAAAH0lEQVQYGe3BAQ0AAADCIPunfg43YAAAAAAAAAAA5wIhAAAB9aK9BAAAAABJRU5ErkJggg==");
        var localm = L.tileLayer('./basemaps/Liddell_tiles/{z}/{x}/{y}.png', {tms: false, attribution: 'Local Map'});
        // Overlay layers
        var lyr = L.tileLayer('./basemaps/Liddell_tiles/{z}/{x}/{y}.png', {tms: true, opacity: 8.0, attribution: "Local Map Layer"});
        var rail_lyr = L.tileLayer('http://{s}.tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png', {tms: false, opacity: 0.8, attribution: "Railway"});
        
        var basemaps = {"OpenStreetMap": osm, "Esri Map": Esri, "OpenTopoMap":topo, "Without background": white, "Local": localm}
        var overlaymaps = {"Local": lyr, "Railway":rail_lyr}
        
        if (typeof document !== "undefined") {
            this.map = L.map(this.target, {
                center: [-32.3800067213876, 150.94998609762376],
                crs:L.CRS.EPSG3857,
                zoom: 13,
                minZoom: 1,
                maxZoom: 20,
                layers: [topo]});
                
            L.control.layers(basemaps, overlaymaps, {collapsed: true}).addTo(this.map);
            // Fit to overlay bounds (SW and NE points with (lat, lon))
            //this.map.fitBounds([[-32.4500134427752, 151.04997219524756], [-32.31, 150.84999999999997]]);        
        }


    }

    public update(options: VisualUpdateOptions) {
        this.settings = Visual.parseSettings(options && options.dataViews && options.dataViews[0]);
        console.log('Visual update', options);
        if (this.textNode) {
            this.textNode.textContent = (this.updateCount++).toString();
        }
    }

    private static parseSettings(dataView: DataView): VisualSettings {
        return <VisualSettings>VisualSettings.parse(dataView);
    }

    /**
     * This function gets called for each of the objects defined in the capabilities files and allows you to select which of the
     * objects and properties you want to expose to the users in the property pane.
     *
     */
    public enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstance[] | VisualObjectInstanceEnumerationObject {
        return VisualSettings.enumerateObjectInstances(this.settings || VisualSettings.getDefault(), options);
    }
}