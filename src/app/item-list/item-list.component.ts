import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service';
import { CartService } from '../cart.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {

  data_set: any[] = [];
  unit_price: number = 1;

  constructor(private item_service: ItemService, private cart_service: CartService, private router: Router) {
    this.data_set = this.item_service.getItemList();
  }

  ngOnInit(): void {
  }

  hideButton = (id: string) => { 
    let data = this.data_set.find(x => x._id === id);
    if (!data) { return; }
    data.hide_quantity = true;
  }

  setQuantity = (action: string, id: string) => {
    let data = this.data_set.find(x => x._id === id);
    if (!data) { return; }
    this.unit_price = data.price / data.quantity;
  
    if (action === "increment") { ++data.quantity; }
    else if (data.quantity - 1 >= 1) { --data.quantity; }
  
    data.price = data.quantity * this.unit_price;
  }

  addCart = (item: any) => {
    this.cart_service.addCartItem(item);
    item.hide_quantity = false;
    item.price /= item.quantity;
    this.unit_price = item.price;
    item.quantity = 1;
  }

  handleNav = (item: any) => {
    this.router.navigate(["item_list", item._id], {queryParams: {data: JSON.stringify(item)}});
  }

}
