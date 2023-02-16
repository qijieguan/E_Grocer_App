import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service';
import { CartService } from '../cart.service';
import { MatDialog } from '@angular/material/dialog';
import { EditFormComponent } from '../edit-form/edit-form.component';

@Component({
  selector: 'app-user-catelog',
  templateUrl: './user-catelog.component.html',
  styleUrls: ['./user-catelog.component.scss']
})
export class UserCatelogComponent implements OnInit {

  userProducts: Array<any> = [];
  cartSize: number = 0;

  constructor(private item_service: ItemService, private cart_service: CartService, private mat_dialog: MatDialog) { 
    setTimeout(() => { this.userProducts = this.item_service.getUserList();}, 125); 
    this.cart_service.getCart().subscribe((cart_data) => { this.cartSize = cart_data.length; });
  }

  ngOnInit(): void {
  }

  openModal = (product: object) => { this.mat_dialog.open(EditFormComponent, {height: '90vh', data: {productData: product}}); }

  removeUserItem = (id: string) => { this.userProducts = this.item_service.removeUserItem(id); }

}
