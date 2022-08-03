import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(private location: Location) {
    this.location.onUrlChange(url => {
      let path = url.split('/');
      let querySelect = "";

      let header = document.querySelector(".header-overlay");
      let bg_image = document.querySelector(".app-wrapper");

      header?.classList.remove('item-list-link', 'cart-link', 'note-link', 'background');

      if (path[1] === 'item_list') { querySelect = 'item-list-link'; }
      else if (path[1] === 'shop_cart') { querySelect = 'cart-link'; }
      else if (path[1] === 'note') { querySelect = 'note-link'; }
      else { querySelect = 'home-link'; }

      if (querySelect === "home-link") { 
        bg_image?.classList.remove('background');
        document.querySelector('.main_bg')?.classList.add('animate'); 
      }
      else { 
        setTimeout(() => {
          header?.classList.add('background'); 
          header?.classList.add(querySelect);
        });
        bg_image?.classList.add('background'); 
        document.querySelector('.main_bg')?.classList.remove('animate'); 
      }

      document.querySelector('.highlight')?.classList.remove('highlight');
      document.querySelector('.' + querySelect)?.classList.add('highlight');

    });
  }

  ngOnInit(): void {
  }

}
