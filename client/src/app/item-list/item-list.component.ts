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

  default_set: any[] = []
  data_set: any[] = [];
  prev_id: string = "";
  prev_tag: string = "";
  searchInp: string = "";
  search_list: any[] = [];

  constructor(private item_service: ItemService, private cart_service: CartService, private router: Router) {
    this.default_set = this.item_service.getItemList();
    this.data_set = this.default_set;
  }


  ngOnInit(): void {
  }

  //init_list = () => {
  //  setTimeout(() => {this.item_service.initList();});
  //}

  handleCheck = (event: any) => {
    if (this.prev_tag.length) {
      let el = document.getElementsByName(this.prev_tag)[0] as HTMLInputElement;
      el.checked = false;
      el.parentElement?.classList.remove('highlight');
  
      if (event.target.name === this.prev_tag) {
        this.data_set = this.default_set;
        this.prev_tag = "";
        return;
      }
    }
    
    this.prev_tag = event.target.name; 
    let el = document.getElementsByName(event.target.name)[0];
    el.parentElement?.classList.add('highlight');
 
    this.data_set = this.default_set.filter(d => d.tag === this.prev_tag);
  }

  toggleButton = (id: string, action: string) => { 
    let data = this.data_set.find(x => x.id === id);

    if (action === 'cancel') { this.resetQTY(id); return; }

    if (this.prev_id.length) { this.resetQTY(this.prev_id); }

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
    window.scrollTo({top: 0, behavior: 'smooth'});
  }

  handleNav = (item: any) => {
    setTimeout(() => {this.resetQTY(this.prev_id)})
    this.router.navigate(["item_list", item.id]);
  }

  handleChange = (event: any) => { 
    this.searchInp = event.target.value; 
    this.search_list = [];
    this.default_set.forEach(d => {
      if (d.name.toLowerCase().includes(this.searchInp.toLowerCase())) { this.search_list.push(d) }
    });
  }

  handleSearch = (key: string, action: string) => {
    if (action === 'case_1') {
      this.data_set = this.search_list;
    }
    else {
      this.data_set = this.default_set.filter(d => d.name === key);
    }
    this.searchInp = "";
    this.search_list = [];
  }

}
