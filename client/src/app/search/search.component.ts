import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  searchInp: string = "";
  search_list: any[] = [];
  default_list: any[] = [];
  input: any = null;

  constructor(private item_service: ItemService, private search_service: SearchService) { 
    this.default_list = this.item_service.getItemList();
  }

  ngOnInit(): void {
    this.input = document.querySelector('.search-bar') as HTMLInputElement;
    this.input?.addEventListener("keyup", function(event: any) {
      event.preventDefault();
      if (event.keyCode === 13) {
        let btn = document.querySelector('.search-btn') as HTMLButtonElement;
        btn.click();
      }
    });
  }

  handleChange = (event: any) => { 
    this.searchInp = event.target.value; 
    this.search_list = [];
    this.default_list.forEach(d => {
      if (d.name.toLowerCase().includes(this.searchInp.toLowerCase())) { this.search_list.push(d) }
    });
  }

  handleSearch = (key: string, action: string) => {
    if (action === 'case_1') { this.search_service.setSearch(this.search_list); }
    else {this.search_service.setSearch(this.default_list.filter(item => item.name === key)); }

    this.searchInp = "";
    this.search_list = [];
  }

}
