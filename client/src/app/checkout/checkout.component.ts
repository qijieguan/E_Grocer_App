import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from '../pop-up/pop-up.component';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  subtotal: number = 0;
  tax: number = 0.1;

  constructor(private cart_service: CartService, private mat_dialog: MatDialog) {
    this.cart_service.getCart().subscribe((cart_data) => { 
      this.subtotal = 0;
      this.tax = 0.1;
      cart_data.forEach((item: any) => { this.subtotal += item.price; });
      this.tax *= this.subtotal; 
    });
  }

  ngOnInit(): void {
  }

  openModal = () => { this.mat_dialog.open(PopUpComponent); }
}
