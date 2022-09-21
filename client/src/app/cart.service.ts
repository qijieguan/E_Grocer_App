import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private subject_1 = new BehaviorSubject<any>([]);
  private subject_2 = new BehaviorSubject<any>("");
  private cart: any[] = [];

  constructor(private http: HttpClient) { 
    const headers = new HttpHeaders().set('Content-Type', 'application/json;charset=UTF-8');

    let options = { headers: headers };
    let url = window.location.origin;

    if (window.location.hostname === 'localhost' ) { url = 'http://localhost:8080'; }

    this.http.get(url + '/api/map/getKey/', options)
    .subscribe( data => { this.subject_2.next(data); } );
  }

  addCartItem = (item: any) => {    
    let match_data = this.cart.find(x => x.id === item.id);

    if (!match_data) { this.cart.push({...item}); }
    else {
      match_data.quantity = Number(match_data.quantity) + Number(item.quantity);
      match_data.price = Number(match_data.price) + Number(item.price);
    }

    this.subject_1.next(this.cart);
  }

  deleteCartItem = (item: any) => {
    let findIndex = this.cart.findIndex(x => x.id === item.id);
    this.cart.splice(findIndex, 1)
    this.subject_1.next(this.cart)
  }

  updateCartItem = (item: any) => {
    let findIndex = this.cart.findIndex(x => x.id === item.id);
    let unit_price = this.cart[findIndex].price / this.cart[findIndex].quantity;

    this.cart[findIndex].quantity = item.quantity;
    this.cart[findIndex].price = unit_price * this.cart[findIndex].quantity; 
    this.subject_1.next(this.cart);
  }

  getCartItem() { return this.subject_1.asObservable() || []; }

  getMapKey() { return this.subject_2.asObservable() || ""; }
}
