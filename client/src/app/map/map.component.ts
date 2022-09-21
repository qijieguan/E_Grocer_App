import { Component, OnInit } from '@angular/core';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  address: string = "El Monte, 91733";
  map_url: any = "https://www.google.com/maps/embed/v1/directions?origin=El Monte, CA 91733&destination=El Monte, 91733&key=AIzaSyAB5KWxkElCuvl0cOF3yMxBdRJkwvhCIz8";

  constructor(public sanitizer: DomSanitizer) {
    this.map_url = this.sanitizer.bypassSecurityTrustResourceUrl(this.map_url);
  }

  ngOnInit(): void {
  }

  handleChange = (event: any) => {
    this.address = event.target.value;
  }

  mapUpdate = (event: any) => {
    event.preventDefault();
    let url = "https://www.google.com/maps/embed/v1/directions?origin=" + this.address + "&destination=El Monte, 91733&key=AIzaSyAB5KWxkElCuvl0cOF3yMxBdRJkwvhCIz8";
    this.map_url = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
