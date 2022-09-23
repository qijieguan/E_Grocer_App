import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  subtotal: number = 0;
  tax: number = 0.1;

  constructor(private cart_service: CartService) {
    this.cart_service.getCartItem().subscribe((cart_data) => { 
      this.subtotal = 0;
      this.tax = 0.1;
      cart_data.forEach((item: any) => { this.subtotal += item.price; });
      this.tax *= this.subtotal; 
    });
  }

  ngOnInit(): void {
  }

}
