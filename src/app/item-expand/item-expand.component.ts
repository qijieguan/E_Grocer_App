import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-item-expand',
  templateUrl: './item-expand.component.html',
  styleUrls: ['./item-expand.component.scss']
})
export class ItemExpandComponent implements OnInit {

  item: any;
  unit_price: number = 0;
  quantity_input: number = 1;

  constructor(private route: ActivatedRoute, private cart_service: CartService) {
    this.route.queryParams.subscribe(params => { 
      this.item = JSON.parse(params['data']); 
      this.unit_price = this.item.price;
    });
  }

  ngOnInit(): void {
  }

  setQuantity = (event: any) => { 
    this.unit_price = this.item.price / this.item.quantity;

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
