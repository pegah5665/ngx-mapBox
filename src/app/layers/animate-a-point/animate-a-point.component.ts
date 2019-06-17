import { AfterViewInit, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import GeoJSONSource = mapboxgl.GeoJSONSource;

import { geoJSON } from 'leaflet';
import * as geojson from 'geojson';

@Component({
    selector: 'app-animate-a-point',
    templateUrl: './animate-a-point.component.html',
    styleUrls: ['./animate-a-point.component.css']
})
export class AnimateAPointComponent implements AfterViewInit {

    title = '';

    style = 'mapbox://styles/mapbox/streets-v9';
    center = [0, 0];
    zoom = 2;

    source = {
        'type': 'geojson',
        'data': this.pointOnCircle(0)
    };

    layout = {};
    paint = {
        'circle-radius': 10,
        'circle-color': '#007cbf'
    };

    radius = 20;

    constructor(private route: ActivatedRoute) {
        this.title = route.snapshot.data['title'];
    }

    ngAfterViewInit() {
        this.animateMarker(0);
    }

    private pointOnCircle(angle: number): GeoJSONSource {
   
       return geoJSON(<geojson.Point>{
        type: "Point",
        coordinates: [
             Math.cos(angle) * this.radius,
            Math.sin(angle) * this.radius,] // Note that in GeoJSON, order is [LONG, LAT]
    });
    }

    private animateMarker(timestamp?: any) {
        this.source = {
            ...this.source,
            'data': this.pointOnCircle(timestamp / 1000)
        };
        requestAnimationFrame(this.animateMarker.bind(this));
    }

}
