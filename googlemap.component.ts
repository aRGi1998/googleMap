import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

declare const google: any;

@Component({
  selector: 'app-googlemap',
  templateUrl: './googlemap.component.html',
  styleUrls: ['./googlemap.component.css']
})
export class GooglemapComponent implements AfterViewInit {
  @ViewChild('searchInput') searchInput!: ElementRef;
  @ViewChild('mapContainer') mapContainer!: ElementRef;

  map!: any;
  marker: any;

  ngAfterViewInit() {
    this.initMap();
  }

  initMap() {
    const mapElement = this.mapContainer.nativeElement;
    const defaultLocation = { lat: 37.7749, lng: -122.4194 };

    const mapOptions = {
      center: defaultLocation,
      zoom: 12
    };

    this.map = new google.maps.Map(mapElement, mapOptions);
  }

  searchLocation() {
    const address = this.searchInput.nativeElement.value;
    const geocoder = new google.maps.Geocoder();

    geocoder.geocode({ address }, (results: any, status: any) => {
      if (status === 'OK' && results && results.length > 0) {
        const location = results[0].geometry.location;
        this.map.setCenter(location);
        this.map.setZoom(12);

        const markerOptions = {
          position: location,
          map: this.map,
          title: address
        };
        const marker = new google.maps.Marker(markerOptions);
      } else {
        console.error('Geocode was not successful for the following reason:', status);
      }
    });
  }

  pinLocation() {
    const mapCenter = this.map.getCenter();

    if (this.marker) {
      this.marker.setMap(null); // Remove the previous marker from the map
    }

    // Create a new marker at the map center
    this.marker = new google.maps.Marker({
      position: mapCenter,
      map: this.map,
      title: 'Pinned Location'
    });
  }
}
