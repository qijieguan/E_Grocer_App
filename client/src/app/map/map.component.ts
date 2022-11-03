import { Component, OnInit } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import { CartService } from '../cart.service';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  deliveryInp: boolean = true;
  trackClicked: boolean = false;
  address: string = "El Monte, 91733";
  map_key: string = "";
  map_url: any = "https://www.google.com/maps/embed/v1/directions?origin=El Monte, CA 91733&destination=El Monte, 91733&key=";
  
  streetInp: string = '';
  cityInp: string = '';
  stateInp: string = '';
  zipInp: number = 0;

  constructor(public sanitizer: DomSanitizer, public cart_service: CartService) {
    this.cart_service.getMapKey().subscribe(key => { this.map_key = key; });
    setTimeout(() => {
      this.map_url = this.sanitizer.bypassSecurityTrustResourceUrl(this.map_url + this.map_key);
    }, 250);
  }

  ngOnInit(): void {
  }

  handleClick = (event: any) => {
    let el = document.querySelector('input.active') as HTMLInputElement;

    if (el) {
      if (el.name === event.target.name) { return; }
      el.checked = false; 
      el.classList.remove('active'); 
    }
    if (event.target.name === "delivery") { this.deliveryInp = true; }
    else { this.deliveryInp = false; }

    event.target.classList.add('active');
  }

  handleChange = (event: any, param: string) => { 
    if (param === 'street') { this.streetInp = event.target.value; }
    else if (param === 'city') { this.cityInp = event.target.value; }
    else if (param === 'state') { this.stateInp = event.target.value; }
    else { this.zipInp = event.target.value; }
  }

  mapUpdate = (event: any) => {
    event.preventDefault();
    this.trackClicked = true;
    this.address = this.streetInp + " " + this.cityInp + ", " + this.stateInp + " " + this.zipInp.toString();
    let url = "https://www.google.com/maps/embed/v1/directions?origin=" + this.address + "&destination=El Monte, 91733&key=AIzaSyAB5KWxkElCuvl0cOF3yMxBdRJkwvhCIz8";
    this.map_url = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
