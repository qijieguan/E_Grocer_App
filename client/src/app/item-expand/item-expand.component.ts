import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-item-expand',
  templateUrl: './item-expand.component.html',
  styleUrls: ['./item-expand.component.scss']
})
export class ItemExpandComponent implements OnInit {

  param: string = "";
  item: any;
  unit_price: number = 0;
  quantity_input: number = 1;
  isAdded: boolean = false;

  constructor(private router: Router, private item_service: ItemService, private cart_service: CartService) {
    this.param = this.router.url.split('/')[4];
    this.router.onSameUrlNavigation = 'reload';
  }

  canvas: any;
  context: any;
  canvas_zoom: any;
  context_zoom: any;

  ngOnInit(): void { 
    setTimeout(() => {
      this.item = this.item_service.getItem(this.param);
      this.unit_price = this.item.price / this.item.quantity;

      this.canvasRender();

    }, 250);
  }

  canvasRender = () => {
    this.canvas = document.getElementById('canvas');
    this.context = this.canvas.getContext('2d');

    this.canvas_zoom = document.getElementById('canvas-zoom');
    this.context_zoom = this.canvas_zoom.getContext('2d');

    let origImg = new Image();
    origImg.src = this.item.url;

    this.canvas.height = origImg.naturalHeight;
    this.canvas.width = origImg.naturalWidth;

    this.canvas_zoom.height = 500;
    this.canvas_zoom.width = 500;

    this.context.drawImage(origImg, 0, 0);

    this.canvas.addEventListener('mousemove', (event: any) => {
      const transformedCursorPosition = this.getTransformedPoint(event.offsetX, event.offsetY);
      //console.log(transformedCursorPosition);
      //console.log("x: " + this.canvas.getBoundingClientRect().width + ", y: " + this.canvas.getBoundingClientRect().height)
      document.getElementById('canvas-zoom')?.classList.remove("disable");
      let screenWidth = document.getElementsByClassName('expand')[0].getBoundingClientRect().width;
      

      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.context.drawImage(origImg, 0, 0);

      let ratio = 1.4;
      let width = 200;
      let height = 150;
      let boundWidth = this.canvas.getBoundingClientRect().width;

      if (boundWidth > 600 && boundWidth < 650) { width = 300; height = 225; ratio = 1.4 }
      else if (boundWidth <= 600) { width = 400; height = 300; ratio = 1.7 }
      
      let posX = (transformedCursorPosition.x * ratio);
      let posY = (transformedCursorPosition.y * ratio);

      if (screenWidth > 800) {
        this.context.fillRect(posX, posY, width, height);
        this.context.fillStyle = 'rgb(85, 85, 85, 0.5)';
      }
    
      this.context_zoom.clearRect(0, 0, this.canvas_zoom.width, this.canvas_zoom.height);
      this.context_zoom.drawImage(origImg, transformedCursorPosition.x * 1.5, transformedCursorPosition.y * 0.75, this.canvas.width, this.canvas.height, 0, 0, this.canvas.width, this.canvas.height);
    });

    this.canvas.addEventListener('mouseout', (event: any) => {
      document.getElementById('canvas-zoom')?.classList.add("disable");
      this.context_zoom.clearRect(0, 0, this.canvas_zoom.width, this.canvas_zoom.height);

      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.context.drawImage(origImg, 0, 0);
    });
  }

  getTransformedPoint = (x: any, y: any) => {
    const transform = this.context.getTransform();
    const transformedX = x - transform.e;
    const transformedY = y - transform.f;
    return { x: transformedX, y: transformedY };
  }  

  setQuantity = (event: any) => { 
    this.quantity_input = event.target.value;
    this.item.quantity = event.target.value;

    this.item.price = this.item.quantity * this.unit_price;
    if (this.isAdded) { this.isAdded = false; }
  }

  addCart = () => {
    this.cart_service.addCartItem(this.item);
    this.item.price /= this.quantity_input;
    
    this.unit_price = this.item.price;
    this.item.quantity = 1;
    this.quantity_input = 1;
    this.isAdded = true;
  }

  goBack = () => { 
    this.router.navigate(["/browse_products/", this.router.url.split('/')[2]]);
  }

}
