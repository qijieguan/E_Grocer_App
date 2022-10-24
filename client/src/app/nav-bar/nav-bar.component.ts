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
    if (!sessionStorage.getItem('visited')) {
      sessionStorage.setItem('visited', JSON.stringify('true'));
      this.cart_service.clearCart();
    }
    setTimeout(() => { this.cart_service.getCart().subscribe((cart) => { this.cartNum = cart.length; }); });
  }

  ngOnInit(): void {
    this.location.onUrlChange(url => {

      let path = url.split('/');
      let querySelect = "";

      let header_image = document.querySelector(".dynamic-img");
      let bg_image = document.querySelector(".app-wrapper");

      header_image?.classList.remove("active", "grocery", "checkout", "note");
      bg_image?.classList.remove('background');

      document.getElementsByTagName('header')[0].classList.remove('home');

      if (path[1] === 'browse_groceries') { querySelect = 'grocery-list-link'; header_image?.classList.add("grocery"); }
      else if (path[1] === 'checkout') { querySelect = 'checkout-link';  header_image?.classList.add("checkout"); }
      else if (path[1] === 'note') { querySelect = 'note-link'; header_image?.classList.add("note"); }
      else { querySelect = 'home-link'; }


      if (querySelect === 'home-link') {
        setTimeout(() => {window.scrollTo({top: 0, behavior: 'smooth'}); }, 125)
        document.getElementsByTagName('header')[0].classList.add('home');  
      }
      else { 
        setTimeout(() => { bg_image?.scrollIntoView({ behavior: 'smooth' }); }, 125);
        document.querySelector('.search')?.scrollIntoView({ behavior: 'smooth' });
        document.querySelector('.item-expand')?.scrollIntoView({behavior: 'smooth'});

        bg_image?.classList.add('background'); 
        header_image?.classList.add('active');
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
