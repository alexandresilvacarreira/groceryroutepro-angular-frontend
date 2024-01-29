import {Component, Input} from '@angular/core';
import {faCoins} from "@fortawesome/free-solid-svg-icons/faCoins";
import {faRoute} from "@fortawesome/free-solid-svg-icons/faRoute";
import {faPiggyBank} from "@fortawesome/free-solid-svg-icons";
import {faStopwatch} from "@fortawesome/free-solid-svg-icons/faStopwatch";
import {faLocationArrow} from "@fortawesome/free-solid-svg-icons/faLocationArrow";
import {Chain, RouteObject, RouteWaypoint} from "../../interfaces";
import LatLng = google.maps.LatLng;
import {Router} from "@angular/router";



@Component({
  selector: 'app-route-main-card',
  templateUrl: './route-main-card.component.html',
  styleUrls: ['./route-main-card.component.scss']
})
export class RouteMainCardComponent {


  protected readonly faCoins = faCoins;
  protected readonly faRoute = faRoute;
  protected readonly faPiggyBank = faPiggyBank;
  protected readonly faStopwatch = faStopwatch;
  protected readonly faLocationArrow = faLocationArrow;


  markerOptions : google.maps.MarkerOptions[]=[];
  markerOpt?:google.maps.MarkerOptions;

  mapsOptions: google.maps.MapOptions={
    disableDefaultUI: true,
    zoomControl: true
  };

  polylineOptions: google.maps.PolylineOptions= {strokeColor: '#1565C0', strokeWeight: 2 };

  @Input() route!: RouteObject;
  @Input() titleCard!: string;
  @Input() savings!: number;
  @Input() showMap!: boolean
  totalTime!: number;
  chainList: Chain[] = [];
  custo!: number;

  //maps inputs
  center: google.maps.LatLngLiteral = {lat: 39.557191, lng: -7.8536599};

  zoom = 6;
  display!: google.maps.LatLngLiteral;
  height = "400px";
  width = "100%";
  routeWaypoints: RouteWaypoint[]=[];
  vertices: LatLng[]=[];

  constructor(private router: Router) {
  }

  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng !== null) {
      this.center = (event.latLng.toJSON());
    }
  }

  move(event: google.maps.MapMouseEvent) {
    if (event.latLng !== null) {
      this.display = event.latLng.toJSON();
    }
  }


  ngOnInit() {

    this.custo = Number(this.route.shoppingListCost.toFixed(2));
    this.totalTime = Math.round(this.route.totalTime / 60);
    this.routeWaypoints = this.route.coordenadasMarcadores.map(item => ({
      coordenadas: {lat: item.lat, lng: item.lng},
      label: item.nameLocation
    }));
    for (const element of this.routeWaypoints) {
      this.markerOpt = this.generateMarkerOptions(element.coordenadas.lat,
          element.coordenadas.lng, element.label);
      this.markerOptions.push(this.markerOpt)
    }

    for (let i = 0; i < this.route.chainIdList.length && i < this.route.chainNameList.length; i++) {
      let chain: Chain = {
        id: this.route.chainIdList[i],
        name: this.route.chainNameList[i]
      };

      this.chainList.push(chain);
    }

    this.vertices=this.route.vertices;

    this.zoom=this.calculateZoom();
    this.center= this.calculateCenter();
  }

  buildMapsUrl(){
    let waypointsString="";
    for (const element of this.routeWaypoints) {
      waypointsString += element.coordenadas.lat + "," + element.coordenadas.lng+"/"
    }
    const url: string= "https://www.google.com/maps/dir/"+waypointsString;
    window.open(url, '_blank');
  }


  generateMarkerOptions(lat: number, lng: number, labelText: string): google.maps.MarkerOptions {
    return {
      position: { lat, lng },
      draggable: false,
      label: {
        text: labelText,
        fontWeight: 'bolder', // Set font weight to bold
        fontFamily: 'Lato', // Set font family to Lato
        color: '#000000',
        fontSize: '16px',


      },
      anchorPoint: new google.maps.Point(0, -20)
    };
  }

  calculateZoom(): number {
    const maxZoom = 20;
    const minZoom = 1;
    const padding = 200;

    const bounds = new google.maps.LatLngBounds();
    for (const marker of this.routeWaypoints) {
      bounds.extend(new google.maps.LatLng(marker.coordenadas.lat, marker.coordenadas.lng));
    }

    const ne = bounds.getNorthEast();
    const sw = bounds.getSouthWest();

    const maxLat = ne.lat();
    const minLat = sw.lat();
    const maxLng = ne.lng();
    const minLng = sw.lng();

    const latRange = maxLat - minLat;
    const lngRange = maxLng - minLng;

    // Calculate zoom level based on latitude or longitude range
    const zoomLat = Math.floor(Math.log2((360 * padding) / (256 * latRange)));
    const zoomLng = Math.floor(Math.log2((360 * padding) / (256 * lngRange)));

    return Math.min(maxZoom, Math.max(minZoom, Math.min(zoomLat, zoomLng)));

  }
  calculateCenter(): google.maps.LatLngLiteral {
    let totalLat = 0;
    let totalLng = 0;

    for (const marker of this.routeWaypoints) {
      totalLat += marker.coordenadas.lat;
      totalLng += marker.coordenadas.lng;
    }

    const avgLat = totalLat / this.routeWaypoints.length;
    const avgLng = totalLng / this.routeWaypoints.length;

    return { lat: avgLat, lng: avgLng };
  }


  openRoutes(){
    if (this.router.url === '/dashboard'){
      this.router.navigate(['/routes']);
    }
  }

}
