import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.scss']
})
export class PopUpComponent implements OnInit {

  cartNum: number = 0;

  constructor(private cart_service: CartService, private mat_dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.cart_service.getCart().subscribe((cart) => { this.cartNum = cart.length; });
  }

  closeModal = () => { 
    this.mat_dialog.closeAll(); 
    setTimeout(() => { this.cart_service.clearCart(); }, 500);
  }
}
