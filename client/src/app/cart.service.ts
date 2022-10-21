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

  private headers: any;
  private options: any;
  private url: any;

  constructor(private http: HttpClient) { 
    this.headers = new HttpHeaders().set('Content-Type', 'application/json;charset=UTF-8');
    this.options = { headers: this.headers };
    this.url = window.location.origin;

    if (window.location.hostname === 'localhost' ) { this.url = 'http://localhost:8080'; }

    this.http.get(this.url + '/api/map/getKey/', this.options)
    .subscribe( data => { this.subject_2.next(data); } );
  }

  addCartItem = (item: any) => {    
    let match_data = this.cart.find(x => x.id === item.id);
    if (!match_data) { 
      this.cart.push({...item}); 

      let new_obj = {
        id: match_data ? match_data.id : item.id,
        url: match_data ? match_data.url : item.url,
        name: match_data ? match_data.name : item.name,
        quantity: match_data ? match_data.quantity : item.quantity,
        price: match_data ? match_data.price : item.price
      }
      
      this.http.post(this.url + '/api/cart/add', {cart_obj: new_obj})
      .subscribe( data => { console.log(data) } );
    }
    else {
      match_data.quantity = Number(match_data.quantity) + Number(item.quantity);
      match_data.price = Number(match_data.price) + Number(item.price);

      this.http.post(this.url + '/api/cart/update', {updated_obj: match_data})
      .subscribe( data => { console.log(data) } );
    }

    this.subject_1.next(this.cart);
  }

  deleteCartItem = (item: any) => {
    let findIndex = this.cart.findIndex(x => x.id === item.id);
    this.cart.splice(findIndex, 1);
    this.subject_1.next(this.cart);

    this.http.post(this.url + '/api/cart/delete', {remove_id: item.id})
    .subscribe( data => { console.log(data) } );
  }

  updateCartItem = (item: any) => {
    let findIndex = this.cart.findIndex(x => x.id === item.id);
    let unit_price = this.cart[findIndex].price / this.cart[findIndex].quantity;

    this.cart[findIndex].quantity = item.quantity;
    this.cart[findIndex].price = unit_price * this.cart[findIndex].quantity; 
    this.subject_1.next(this.cart);

    this.http.post(this.url + '/api/cart/update', {updated_obj: this.cart[findIndex]})
    .subscribe( data => { console.log(data) } );
  }

  clearCart = () => { 
    this.cart = []; 
    this.subject_1.next(this.cart); 

    this.http.post(this.url + '/api/cart/clear', {})
    .subscribe( data => { console.log(data) } );
  }

  getCart() { 
    this.http.get(this.url + '/api/cart/')
    .subscribe( data => { this.subject_1.next(data); } );

    this.subject_1.asObservable().subscribe(cart => { 
      this.cart = [];
      cart.forEach( (item: any) => { this.cart.push(item); } );
    });
    
    return this.subject_1.asObservable() || []; 
  }

  getMapKey() { return this.subject_2.asObservable() || ""; }
}
