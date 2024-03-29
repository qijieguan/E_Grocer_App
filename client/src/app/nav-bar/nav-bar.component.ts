import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { CartService } from '../cart.service';
import { ItemService } from '../item.service';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  cartNum: number = 0;
  linkDropdown: boolean = false;

  constructor(private location: Location, private item_service: ItemService, private cart_service: CartService, private router: Router) {
    this.item_service.getItemList();
    if (!sessionStorage.getItem('visited')) {
      sessionStorage.setItem('visited', JSON.stringify('true'));
      sessionStorage.setItem('uid', JSON.stringify(uuidv4()));
      
      setTimeout(() => {this.cart_service.initCart()});
    }
    
    setTimeout(() => { this.cart_service.getCart().subscribe((cart) => { this.cartNum = cart.length; }); }, 1000);

    this.router.onSameUrlNavigation = 'reload';
  }

  ngOnInit(): void {
    this.onNavSwitch();
    this.onLinksDropdown();
  }

  handleNavigation = (param: any) => {
    this.router.navigate([param]);
  }

  onNavSwitch = () => {
    this.location.onUrlChange(url => {
      
      let path = url.split('/');
      let querySelect = "";

      let bg_image = document.querySelector(".app-wrapper");
      bg_image?.classList.remove('bg-color');

      setTimeout(() => {
        this.linkDropdown = false;
        window.scrollTo({top: 0, behavior: 'smooth'}); 
      }, 125);

      if (path[1] === 'browse_products' || path[1] === 'main-interface') { querySelect = 'shop-link'; }
      else if (path[1] === 'checkout') { querySelect = 'checkout-link'; }
      else if (path[1] === 'feedback') { querySelect = 'feedback-link'; }
      else { querySelect = 'home-link'; }

      if (querySelect === 'home-link') {
        document.querySelector('.nav-bar')?.classList.remove('color');
      }
      else { 
        document.querySelector('.nav-bar')?.classList.add('color');
        document.querySelector('.search')?.scrollIntoView({ behavior: 'smooth' });
        document.querySelector('.item-expand')?.scrollIntoView({behavior: 'smooth'});

        bg_image?.classList.add('bg-color'); 
      };

      setTimeout(() => { this.activeObserver(); }, 500);
    });
  }

  onLinksDropdown = () => {
    document.querySelector('.shop-link')?.addEventListener('click', (event: any) => {
      this.linkDropdown = true;
    });
    document.querySelector('.shop-link')?.addEventListener('mouseenter', (event: any) => {
      this.linkDropdown = true;
    })
    document.querySelector('.drop-links')?.addEventListener('click', (event: any) => {
      this.linkDropdown = false;
    });
  }

  activeObserver = () => {
    const faders = document.querySelectorAll('.fade-slide');
    const navWrapper = document.querySelectorAll('.nav-bar-wrapper');
    
    const appearOptions = { threshold: 0.5, rootMargin: '0px 0px 0px 0px' }; 
    const wrapperOptions = { threshold: 0, rootMargin: '0px 0px 0px 0px' };

    const appearOnScroll = new IntersectionObserver (
      function( entries ) {
          entries.forEach(entry => {
            if (entry.isIntersecting) { entry.target.classList.add('active'); }
          });
      },
    appearOptions);   

    const wrapperScrollOut = new IntersectionObserver (
      function( entries ) {
          entries.forEach(entry => {
              if (entry.isIntersecting ) { 
                document.querySelector('.nav-bar')?.classList.remove('scrollable'); 
              }
              else { 
                document.querySelector('.nav-bar')?.classList.add('scrollable'); 
              }
          });
      },
    wrapperOptions);   

    faders.forEach(fader => { appearOnScroll.observe(fader); });
    navWrapper.forEach(wrapper => { wrapperScrollOut.observe(wrapper) });
  }
}
