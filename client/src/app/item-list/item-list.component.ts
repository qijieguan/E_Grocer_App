import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service';
import { SearchService } from '../search.service';
import { CartService } from '../cart.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})

export class ItemListComponent implements OnInit {

  default_list: any[] = [];
  data_set: any[] = [];
  prev_id: string = "";
  prev_tag: string = "";
  param: string = '';
  pageNum: number = 1;
  itemHolder: string = '';

  constructor(private item_service: ItemService, private search_service: SearchService, private cart_service: CartService, private router: Router, private location: Location) {
    this.search_service.getSearch().subscribe((search_list) => { 
      this.data_set = search_list; 
      this.item_service.setPageSize(this.data_set.length);
      this.resetTag(); 
    });
  
    this.item_service.getPageNum().subscribe((num) => { 
      this.pageNum = num; 
      this.param = "page_" + this.pageNum.toString();
      this.loadPage(); 
    });

    this.router.onSameUrlNavigation = 'reload';
  }

  ngOnInit(): void {
    this.param = this.router.url.split('/')[2]?.split('&')[0];
    this.resetList();
    this.checkParameter();
  }

  //init_list = () => { setTimeout(() => {this.item_service.initList();}); }

  loadPage = () => {
    setTimeout(() => {
      let query = this.param.replace('page_', '');
      let a  = (Number(query) - 1) * 12;
      let b = (Number(query) * 12);

      this.data_set = this.default_list.slice(a, b);
      this.item_service.setPageSize(this.default_list.length);
    }, 250);
  }

  resetTag = () => {
    let el = document.getElementsByName(this.prev_tag)[0] as HTMLInputElement;
    if (!el) { return; }
    el.checked = false;
    el.parentElement?.classList.remove('highlight');
  }

  checkTag = () => {
    let el = document.getElementsByName(this.prev_tag)[0] as HTMLInputElement;
    if (!el) { return; }
    el.checked = true;
    el.parentElement?.classList.add('highlight');
  }

  checkParameter = () => {
    this.prev_tag = this.router.url.split('/')[2].split('&')[1]?.replace('category_', '') || '';
    let word = this.router.url.split('/')[2].split('&')[1]?.replace('search_', '') || '';
    word = word.replace('-', ' ');

    if (this.router.url.includes('&category_')) {
      setTimeout(() => {
        this.data_set = this.default_list.filter(d => d.tag === this.prev_tag);
        this.item_service.setPageSize(this.data_set.length || this.default_list.length);
        this.checkTag();
      }, 250);
    }
    else if (this.router.url.includes('&search_')) { 
      setTimeout(() => { this.search_service.setSearch(word, this.default_list); }, 250); 
    } 
    else { this.loadPage(); }
  }
  
  resetList = () => {
    setTimeout(() => {
      this.default_list = this.item_service.getItemList();
      this.data_set = this.default_list;
      this.item_service.setPageSize(this.default_list.length);
      this.item_service.setPageNum(Number(this.param.replace("page_", "")));
    }, 125);
  }

  handleCheck = (event: any) => {
    if (this.prev_tag.length) {
      this.resetTag();
      if (event.target.name === this.prev_tag) {
        this.loadPage();
        this.prev_tag = "";
        this.router.navigate(["browse_products/" + this.param]);
        return;
      }
    }
    
    this.prev_tag = event.target.name; 
    this.data_set = this.default_list.filter(d => d.tag === this.prev_tag);
    this.checkTag();

    this.item_service.setPageSize(this.data_set.length);
    this.router.navigate(["/browse_products/page_1" + "&category_" + this.prev_tag]);
  }

  resetQTY(id: string) {
    let data = this.data_set.find(x => x.id === id);
    if (!data) { return; }
    data.mode.hide_quantity = false;
    data.quantity = 1;
  }

  toggleButton = (id: string, action: string) => { 
    let data = this.data_set.find(x => x.id === id);
    let overlayElement = document.getElementById(id);
    
    if (action === 'add') { overlayElement?.classList.add('active'); }
    else { overlayElement?.classList.remove('active'); this.resetQTY(id); return; }

    if (this.prev_id.length) { 
      this.resetQTY(this.prev_id); 
      overlayElement = document.getElementById(this.prev_id);
      overlayElement?.classList.remove('active');
    }

    this.prev_id = id;
    data.mode.hide_quantity = true;
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
    item.mode.hide_quantity = false;
    item.quantity = 1;
    this.itemHolder = item.name;

    setTimeout(() => { document.querySelector('.add-msg')?.classList.add('show'); }, 125);
    document.querySelector('.add-msg')?.classList.remove('show');
    document.getElementById(item.id)?.classList.remove('active');
  }

  handleNav = (item: any) => {
    setTimeout(() => {this.resetQTY(this.prev_id)});
    this.router.navigate(["browse_products/" + this.param + '/view/' + item.id]);
  }
}
