import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service';
import { SearchService } from '../search.service';
import { Router } from '@angular/router';

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

  constructor(private item_service: ItemService, private search_service: SearchService, private router: Router) { 
    this.default_list = this.item_service.getItemList();
  }

  ngOnInit(): void {
  }

  handleChange = (event: any) => { 
    this.searchInp = event.target.value; 
    this.search_list = [];
    this.default_list.forEach(d => {
      if (d.name.toLowerCase().includes(this.searchInp.toLowerCase())) { this.search_list.push(d) }
    });
  }

  handleSearch = (event: any, key: string, action: string) => {
    event.preventDefault();

    if (action === 'case_1') { this.search_service.setSearch(this.search_list); }
    else {this.search_service.setSearch(this.default_list.filter(item => item.name === key)); }

    let param = key.replace(" ", '-').toLowerCase();

    this.router.navigate(["browse_groceries/page_1" + "&search_" + param]);

    this.searchInp = "";
    this.search_list = [];
  }

}
