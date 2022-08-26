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
  input: any = null;
  param: string = '';
  pageNum: number = 1;

  constructor(private item_service: ItemService, private cart_service: CartService, private router: Router) {
    this.default_set = this.item_service.getItemList();
    this.data_set = this.default_set;

    this.param = this.router.url.split('/')[2];
  }


  ngOnInit(): void {

    setTimeout(()=> { 
      this.pageNum = Math.ceil(this.default_set.length / 9); 
      window.scrollTo({top: 250, behavior: 'smooth'});
    }, 500);

    setTimeout(() => {
      let query = this.param;
      query = query.replace('page_', '');
      let a  = (Number(query) - 1) * 9;
      let b = (Number(query) * 9)

      document.getElementsByClassName(query)[0]?.classList.add('clicked');
      this.data_set = this.default_set.slice(a, b);
    }, 1000);

    this.input = document.querySelector('.search-bar') as HTMLInputElement;
    this.input?.addEventListener("keyup", function(event: any) {
      event.preventDefault();
      if (event.keyCode === 13) {
        let btn = document.querySelector('.search-btn') as HTMLButtonElement;
        btn.click();
      }
    });
  }

  //init_list = () => {
  //  setTimeout(() => {this.item_service.initList();});
  //}

  resetTag() {
    let el = document.getElementsByName(this.prev_tag)[0] as HTMLInputElement;
    el.checked = false;
    el.parentElement?.classList.remove('highlight');
  }

  handleCheck = (event: any) => {
    if (this.prev_tag.length) {
      this.resetTag();
      
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
  }

  handleNav = (item: any) => {
    setTimeout(() => {this.resetQTY(this.prev_id)})
    this.router.navigate(["browse_groceries/" + this.param + '/', item.id]);
  }

  handleChange = (event: any) => { 
    this.searchInp = event.target.value; 
    this.search_list = [];
    this.default_set.forEach(d => {
      if (d.name.toLowerCase().includes(this.searchInp.toLowerCase())) { this.search_list.push(d) }
    });
  }

  handleSearch = (key: string, action: string) => {
    if (action === 'case_1') { this.data_set = this.search_list; }
    else { this.data_set = this.default_set.filter(d => d.name === key); }

    this.searchInp = "";
    this.search_list = [];
    if (this.prev_tag) { this.resetTag(); }
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

    this.router.navigate(["browse_groceries/", this.param]).then(() => {window.location.reload()});
  }

}
