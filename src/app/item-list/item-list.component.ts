import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {

  data_set;
  hide_button: boolean = false;

  constructor(private item_service: ItemService, private cart_service: CartService) {
    this.data_set = this.item_service.getItemList();
  }

  ngOnInit(): void {
  }

  hideButton = (id: any) => { 
    let data = this.data_set.find(x => x._id === id);
    if (!data) { return; }
    data.hide_quantity = true;
  }

  setQuantity = (action: String, id: any) => {
    let data = this.data_set.find(x => x._id === id);
    if (!data) { return; }
    let unit_price = data.price / data.quantity;
  
    if (action === "increment") { ++data.quantity; }
    else { 
      if ((data.quantity - 1 >= 1)) { --data.quantity; }
    }
    data.price = data.quantity * unit_price;
  }

  addCart = (item: any) => {
    this.cart_service.addCartItem(item);
    item.hide_quantity = false;
    item.price /= item.quantity;
    item.quantity = 1;
  }
}
