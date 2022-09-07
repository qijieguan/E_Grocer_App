import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-item-expand',
  templateUrl: './item-expand.component.html',
  styleUrls: ['./item-expand.component.scss']
})
export class ItemExpandComponent implements OnInit {

  param: string = "";
  item: any;
  unit_price: number = 0;
  quantity_input: number = 1;
  isAdded: boolean = false;

  constructor(private router: Router, private item_service: ItemService, private cart_service: CartService) {
    this.param = this.router.url.split('/')[3];
  }

  ngOnInit(): void { 
    setTimeout(() => {
      this.item = this.item_service.getItem(this.param);
      this.unit_price = this.item.price / this.item.quantity;
    }, 250);
  }

  setQuantity = (event: any) => { 
    this.quantity_input = event.target.value;
    this.item.quantity = event.target.value;

    this.item.price = this.item.quantity * this.unit_price;
    if (this.isAdded) { this.isAdded = false; }
  }

  addCart = () => {
    this.cart_service.addCartItem(this.item);
    this.item.price /= this.quantity_input;
    
    this.unit_price = this.item.price;
    this.item.quantity = 1;
    this.quantity_input = 1;
    this.isAdded = true;
  }

  goBack = () => { 
    this.router.navigate(["browse_groceries/", this.router.url.split('/')[2]]);
  }

}
