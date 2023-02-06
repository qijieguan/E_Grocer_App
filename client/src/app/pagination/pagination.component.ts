import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service';
import { SearchService } from '../search.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  pageNum: number = 1;
  pageSize: number = 1;
  param: string = "";

  constructor(private item_service: ItemService, private search_service: SearchService, private router: Router) { 
    this.item_service.getPageNum().subscribe((num) => { this.pageNum = num; this.loadPage(); });
    this.item_service.getPageSize().subscribe((size) => { this.pageSize = size; this.loadPage(); } );
    this.search_service.getSearch().subscribe((search_list) => { this.loadPage(); })
  }

  ngOnInit(): void {  
  }

  loadPage = () => {
    setTimeout(() => {
      this.param = this.router.url.split('/')[2].split('&')[0];
      let query = this.param;
      query = query.replace('page_', '');
      
      document.querySelector('.clicked')?.classList.remove('clicked');
      if (this.pageSize > 1) { document.getElementsByClassName(query)[0]?.classList.add('clicked'); }
      else { document.getElementsByClassName('1')[0]?.classList.add('clicked'); }
    }, 250);
  }

  pageNav = (event: any, action: string) => {
    let currPage = document.querySelector('.page.clicked');
    let newPage = event.target;
    let newValue = 0;

    if (action === 'prev') { 
      if (currPage?.classList.contains('1')) { return; }
      newValue = Number(currPage?.textContent) - 1;
    }
    if (action === 'next') { 
      if (currPage?.classList.contains(this.pageSize.toString())) { return; }
      newValue = (Number(currPage?.textContent) + 1);
    }
    if (action === 'select') { newValue = newPage.textContent; }

    this.param = "page_" + newValue; 
    
    this.item_service.setPageNum(newValue);
    this.router.navigate(["browse_products/", this.param]);
  }

}
