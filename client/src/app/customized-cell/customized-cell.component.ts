import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { CartService } from '../cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customized-cell',
  templateUrl: './customized-cell.component.html',
  styleUrls: ['./customized-cell.component.scss']
})
export class CustomizedCellComponent implements OnInit, ICellRendererAngularComp {

  params: any;
  context: any;

  constructor(private cart_service: CartService, private router: Router) { }

  ngOnInit(): void {
  }

  agInit(params: ICellRendererParams): void {
    this.params = params;
    this.context = params.context;
  }

  refresh(params: ICellRendererParams): boolean {
    return false;
  }

  handleNav = () => {
    this.router.navigate(["browse_groceries/page_1/view/" + this.params.data.id]);
  }

  setQuantity = (action: String) => {
    let unit_price = this.params.data.price / this.params.data.quantity;

    if (action === 'increment') { ++this.params.data.quantity; }
    else {
      if (this.params.data.quantity - 1 >= 1 ) { --this.params.data.quantity; }
      else { return; }
    }

    this.params.data.price = unit_price * this.params.data.quantity;
    this.params.api.applyTransaction(this.params.data); 
    this.cart_service.updateCartItem(this.params.data);
  }

  handleDelete = () => { 
    this.params.api.applyTransaction({remove: [this.params.data]}); 
    this.cart_service.deleteCartItem(this.params.data);
  }
}
