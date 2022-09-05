import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service';
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

  constructor(private item_service: ItemService, private router: Router) { 
    this.item_service.getPageSize().subscribe((size) => { this.pageSize = size; } );
    this.item_service.getPageNum().subscribe((number) => { this.pageNum = number; } );
    this.param = this.router.url.split('/')[2];
  }

  ngOnInit(): void { this.loadPage(); }

  loadPage = () => {
    setTimeout(() => {
      let query = this.param;
      query = query.replace('page_', '');
      
      document.querySelector('.clicked')?.classList.remove('clicked');
      document.getElementsByClassName(query)[0]?.classList.add('clicked');
    }, 125);
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
    setTimeout(() => {
      document.getElementsByClassName('clicked')[0].classList.remove('clicked');
      document.getElementsByClassName(newValue.toString())[0].classList.add('clicked');
    })
    this.item_service.setPageNum(newValue);
    
    this.router.navigate(["browse_groceries/", this.param]);
  }

}
