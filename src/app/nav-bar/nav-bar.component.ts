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

      let header = document.querySelector("header");
      let apply_bg = document.querySelector(".app-wrapper");

      if (path[1] === 'item_list') { querySelect = 'item-list-link'; }
      else if (path[1] === 'shop_cart') { querySelect = 'cart-link'; }
      else if (path[1] === 'note') { querySelect = 'note-link'; }
      else { querySelect = 'home-link'; }

      if (querySelect === "home-link") { header?.classList.remove('background');; apply_bg?.classList.remove('background'); }
      else { header?.classList.add('background'); apply_bg?.classList.add('background'); }

      document.querySelector('.highlight')?.classList.remove('highlight');
      document.querySelector('.' + querySelect)?.classList.add('highlight');

    });
  }

  ngOnInit(): void {
  }

}
