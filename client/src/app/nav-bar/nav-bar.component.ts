import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { CartService } from '../cart.service';
import { ItemService } from '../item.service';
import { v4 as uuidv4 } from 'uuid';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  private cartNum: number = 0;

  constructor(private location: Location, private item_service: ItemService, private cart_service: CartService) {
    this.item_service.getItemList();
    if (!sessionStorage.getItem('visited')) {
      sessionStorage.setItem('visited', JSON.stringify('true'));
      sessionStorage.setItem('uid', JSON.stringify(uuidv4()));
      
      setTimeout(() => {this.cart_service.initCart()});
    }
    
    setTimeout(() => { this.cart_service.getCart().subscribe((cart) => { this.cartNum = cart.length; }); }, 1000);
  }

  ngOnInit(): void {
    this.onNavSwitch();
    this.navMoveAway();
  }

  onNavSwitch = () => {
    this.location.onUrlChange(url => {

      let path = url.split('/');
      let querySelect = "";

      let bg_image = document.querySelector(".app-wrapper");
      bg_image?.classList.remove('bg-color');


      if (path[1] === 'browse_products' || path[1] === 'post_product') { querySelect = 'grocery-list-link'; }
      else if (path[1] === 'checkout') { querySelect = 'checkout-link'; }
      else if (path[1] === 'feedback') { querySelect = 'feedback-link'; }
      else { querySelect = 'home-link'; }


      if (querySelect === 'home-link') {
        setTimeout(() => {window.scrollTo({top: 0, behavior: 'smooth'}); }, 125);
      }
      else { 
        setTimeout(() => { bg_image?.scrollIntoView({ behavior: 'smooth' }); }, 125);
        document.querySelector('.search')?.scrollIntoView({ behavior: 'smooth' });
        document.querySelector('.item-expand')?.scrollIntoView({behavior: 'smooth'});

        bg_image?.classList.add('bg-color'); 
      };

      document.querySelector('.highlight')?.classList.remove('highlight');
      document.querySelector('.' + querySelect)?.classList.add('highlight');
      setTimeout(() => { this.activeObserver(); }, 500);
    });
  }

  navMoveAway = () => {
    let nav = document.getElementsByClassName('nav-bar')[0];

    document.getElementsByTagName('body')[0].addEventListener('wheel', (event) => {
      const delta = Math.sign(event.deltaY);
      if (delta === 1) {
        nav.classList?.add("hide");
      }
      else {  nav.classList.remove("hide") }
    });
  }

  activeObserver = () => {
    const faders = document.querySelectorAll('.fade-slide');
    
    const appearOptions = { threshold: 0.5, rootMargin: '0px 0px 0px 0px' }; 

    const appearOnScroll = new IntersectionObserver (
      function( entries ) {
          entries.forEach(entry => {
              if (entry.isIntersecting) { entry.target.classList.add('active'); }
          });
      },
    appearOptions);  

    faders.forEach(fader => { appearOnScroll.observe(fader); });
  }

  getCartNum = () => { return this.cartNum; }
  
}
