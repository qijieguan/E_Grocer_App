import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { CartService } from '../cart.service';
import { v4 as uuidv4 } from 'uuid';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  private cartNum: number = 0;

  constructor(private location: Location, private cart_service: CartService) {
    if (!sessionStorage.getItem('visited')) {
      sessionStorage.setItem('visited', JSON.stringify('true'));
      sessionStorage.setItem('uid', JSON.stringify(uuidv4()));
      
      setTimeout(() => {this.cart_service.initCart()});
    }
    
    setTimeout(() => { this.cart_service.getCart().subscribe((cart) => { this.cartNum = cart.length; }); }, 1000);
  }

  ngOnInit(): void {
    this.location.onUrlChange(url => {

      let path = url.split('/');
      let querySelect = "";

      document.querySelector('header')?.classList.remove('home');

      let bg_image = document.querySelector(".app-wrapper");
      bg_image?.classList.remove('bg-color');


      if (path[1] === 'browse_groceries' || path[1] === 'post_groceries') { querySelect = 'grocery-list-link'; }
      else if (path[1] === 'checkout') { querySelect = 'checkout-link'; }
      else if (path[1] === 'note') { querySelect = 'note-link'; }
      else { querySelect = 'home-link'; }


      if (querySelect === 'home-link') {
        setTimeout(() => {window.scrollTo({top: 0, behavior: 'smooth'}); }, 125);
        document.querySelector('header')?.classList.add('home');
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

  getCartNum = () => { return this.cartNum; }
  
}
