import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  private cartNum: number = 0;

  constructor(private location: Location, private cart_service: CartService) {
  }

  getCartNum = () => { return this.cartNum; }

  ngOnInit(): void {
    this.location.onUrlChange(url => {
      setTimeout(()=> { window.scrollTo({top: 0, behavior: 'smooth'}); }, 125); 

      let path = url.split('/');
      let querySelect = "";

      let header = document.querySelector(".header-overlay");
      let nav = document.querySelector(".nav-bar");
      let bg_image = document.querySelector(".app-wrapper");

      document.getElementsByTagName('header')[0].classList.remove('home');
    
      header?.classList.remove('grocery_list-link', 'cart-link', 'note-link', 'background');
      nav?.classList.remove('fixed');

      if (path[1] === 'browse_groceries') { querySelect = 'grocery_list-link'; nav?.classList.add('fixed'); }
      else if (path[1] === 'shop_cart') { querySelect = 'cart-link'; }
      else if (path[1] === 'note') { querySelect = 'note-link'; }
      else { querySelect = 'home-link'; }

      if (querySelect === "home-link") { 
        document.getElementsByTagName('header')[0].classList.add('home');
        nav?.classList.add('fixed');
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
      setTimeout(() => { this.activeObserver(); }, 500);
    });

    this.cart_service.getCartItem().subscribe((cart) => { this.cartNum = cart.length; });
  }

  activeObserver = () => {
    const faders = document.querySelectorAll('.fade-slide');
    
    const appearOptions = { threshold: 0, rootMargin: '0px 0px 0px 0px' }; 

    const appearOnScroll = new IntersectionObserver (
      function( entries ) {
          entries.forEach(entry => {
              if (entry.isIntersecting) { entry.target.classList.add('appear'); }
          });
      },
    appearOptions);  

    faders.forEach(fader => { appearOnScroll.observe(fader); });
  }
}
