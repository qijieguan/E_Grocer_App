import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private subject = new BehaviorSubject<any>([]);
  private cart: any[] = [];

  constructor() { }


  addCartItem = (item: any) => {    
    let match_data = this.cart.find(x => x._id === item._id);

    if (!match_data) { this.cart.push({...item}); }
    else {
      match_data.quantity = Number(match_data.quantity) + Number(item.quantity);
      match_data.price = Number(match_data.price) + Number(item.price);
    }

    this.subject.next(this.cart);
  }

  deleteCartItem = (item: any) => {
    let findIndex = this.cart.findIndex(x => x._id === item._id);
    this.cart.splice(findIndex, 1)
    this.subject.next(this.cart)
  }

  updateCartItem = (item: any) => {
    let findIndex = this.cart.findIndex(x => x._id === item._id);
    let unit_price = this.cart[findIndex].price / this.cart[findIndex].quantity;

    this.cart[findIndex].quantity = item.quantity;
    this.cart[findIndex].price = unit_price * this.cart[findIndex].quantity; 
    this.subject.next(this.cart);
  }

  getCartItem() { return this.subject.asObservable(); }
}
