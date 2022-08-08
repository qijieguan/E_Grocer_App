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
  prev_id: string = "";

  constructor(private item_service: ItemService, private cart_service: CartService, private router: Router) {
    this.data_set = this.item_service.getItemList();
  }

  ngOnInit(): void {
  }

  //init_list = () => {
  //  setTimeout(() => {this.item_service.initList();});
  //}

  toggleButton = (id: string, action: string) => { 
    let data = this.data_set.find(x => x.id === id);

    if (action === 'cancel') {  
      this.resetQTY(id)
      return;
    }

    if (this.prev_id.length) { 
      this.resetQTY(this.prev_id);
    }

    this.prev_id = id;
    data.hide_quantity = true;
  }

  resetQTY(id: string) {
    let data = this.data_set.find(x => x.id === id);
    data.hide_quantity = false;
    data.quantity = 1;
  }

  setQuantity = (action: string, id: string) => {
    let data = this.data_set.find(x => x.id === id);
    if (!data) { return; }

    if (action === "increment") { ++data.quantity; }
    else if (data.quantity - 1 >= 1) { --data.quantity; }
  }

  addCart = (item: any) => {
    item.price *= item.quantity;
    this.cart_service.addCartItem(item);

    item.price /= item.quantity;
    item.hide_quantity = false;
    item.quantity = 1;
  }

  handleNav = (item: any) => {
    setTimeout(() => {this.resetQTY(this.prev_id)})
    this.router.navigate(["item_list", item.id]);
    // {queryParams: {data: JSON.stringify(item)}}
  }

}
