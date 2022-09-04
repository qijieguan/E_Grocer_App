import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service';
import { SearchService } from '../search.service';
import { CartService } from '../cart.service';
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

  constructor(private item_service: ItemService, private search_service: SearchService, private cart_service: CartService, private router: Router) {
    this.default_list = this.item_service.getItemList();
    this.data_set = this.default_list;
    this.param = this.router.url.split('/')[2];

    this.search_service.getSearch().subscribe((search_list) => { this.data_set = search_list; this.resetTag(); });
  }

  ngOnInit(): void {
    setTimeout(()=> { 
      this.pageNum = Math.ceil(this.default_list.length / 9); 
      window.scrollTo({top: 0, behavior: 'smooth'});
    });
    this.loadPage();    
  }

  //init_list = () => { setTimeout(() => {this.item_service.initList();}); }

  loadPage = () => {
    setTimeout(() => {
      let query = this.param;
      query = query.replace('page_', '');
      let a  = (Number(query) - 1) * 9;
      let b = (Number(query) * 9)

      document.getElementsByClassName(query)[0]?.classList.add('clicked');
      this.data_set = this.default_list.slice(a, b);
      window.scrollTo({top: 0, behavior: 'smooth'});
    }, 125);
  }

  resetTag() {
    let el = document.getElementsByName(this.prev_tag)[0] as HTMLInputElement;
    el.checked = false;
    el.parentElement?.classList.remove('highlight');
  }

  handleCheck = (event: any) => {
    if (this.prev_tag.length) {
      this.resetTag();
      if (event.target.name === this.prev_tag) {
        this.data_set = this.default_list;
        this.prev_tag = "";
        return;
      }
    }
    
    let el = document.getElementsByName(event.target.name)[0];
    el.parentElement?.classList.add('highlight');
 
    this.prev_tag = event.target.name; 
    this.data_set = this.default_list.filter(d => d.tag === this.prev_tag);
  }

  resetQTY(id: string) {
    let data = this.data_set.find(x => x.id === id);
    data.hide_quantity = false;
    data.quantity = 1;
  }

  toggleButton = (id: string, action: string) => { 
    let data = this.data_set.find(x => x.id === id);

    if (action === 'cancel') { this.resetQTY(id); return; }
    if (this.prev_id.length) { this.resetQTY(this.prev_id); }

    this.prev_id = id;
    data.hide_quantity = true;
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
    this.itemHolder = item.name;

    setTimeout(() => { document.querySelector('.add-msg')?.classList.add('show'); });
    document.querySelector('.add-msg')?.classList.remove('show');
  }

  handleNav = (item: any) => {
    setTimeout(() => {this.resetQTY(this.prev_id)});
    this.router.navigate(["browse_groceries/" + this.param + '/', item.id]);
  }

  pageNav = (event: any, action: string) => {
    let currPage = document.querySelector('.page.clicked');
    let newPage = event.target;
    let query = 0;

    if (action === 'prev') { 
      if (currPage?.classList.contains('1')) { return; }
      query = Number(currPage?.textContent) - 1;
    }
    if (action === 'next') { 
      if (currPage?.classList.contains(this.pageNum.toString())) { return; }
      query = (Number(currPage?.textContent) + 1);
    }
    if (action === 'select') { query = newPage.textContent; }

    this.param = "page_" + query; 
    document.getElementsByClassName('clicked')[0].classList.remove('clicked');
    
    this.loadPage();
    this.router.navigate(["browse_groceries/", this.param]);
  }
}
