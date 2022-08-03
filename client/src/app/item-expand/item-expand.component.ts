import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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

  constructor(private route: Router, private item_service: ItemService, private cart_service: CartService) {
    this.param = this.route.url.split('/')[2];
  }

  ngOnInit(): void { 
    setTimeout(() => {
      this.item = this.item_service.getItem(this.param);
      this.unit_price = this.item.price / this.item.quantity;
    });
  }

  setQuantity = (event: any) => { 
    this.quantity_input = event.target.value;
    this.item.quantity = event.target.value;

    this.item.price = this.item.quantity * this.unit_price;
  }

  addCart = () => {
    this.cart_service.addCartItem(this.item);
    this.item.price /= this.quantity_input;
    
    this.unit_price = this.item.price;
    this.item.quantity = 1;
    this.quantity_input = 1;
  }

}
