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
      let nav = document.querySelector(".nav-bar");
      let bg_image = document.querySelector(".app-wrapper");

      header?.classList.remove('grocery_list-link', 'cart-link', 'note-link', 'background');

      if (path[1] === 'browse_groceries') { querySelect = 'grocery_list-link'; }
      else if (path[1] === 'shop_cart') { querySelect = 'cart-link'; }
      else if (path[1] === 'note') { querySelect = 'note-link'; }
      else { querySelect = 'home-link'; }

      if (querySelect === "home-link") { 
        nav?.classList.add("home");
        bg_image?.classList.remove('background');
      }
      else { 
        setTimeout(() => {
          header?.classList.add('background'); 
          header?.classList.add(querySelect);
        });
        nav?.classList.remove("home");
        bg_image?.classList.add('background');
      }

      document.querySelector('.highlight')?.classList.remove('highlight');
      document.querySelector('.' + querySelect)?.classList.add('highlight');

    });
  }

  ngOnInit(): void {
  }

}
