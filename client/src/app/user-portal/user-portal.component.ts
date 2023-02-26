import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service';
import { CartService } from '../cart.service';
import { MatDialog } from '@angular/material/dialog';
import { EditFormComponent } from '../edit-form/edit-form.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-catelog',
  templateUrl: './user-portal.component.html',
  styleUrls: ['./user-portal.component.scss']
})
export class UserPortalComponent implements OnInit {

  userProducts: Array<any> = [];
  cartSize: number = 0;

  constructor(private item_service: ItemService, private cart_service: CartService, private mat_dialog: MatDialog, private router: Router) { 
    setTimeout(() => { this.userProducts = this.item_service.getUserList();}, 125); 
    this.cart_service.getCart().subscribe((cart_data) => { this.cartSize = cart_data.length; });

    this.router.onSameUrlNavigation = 'reload';
  }

  ngOnInit(): void {
  }

  handleNavigation = (param: any) => {
    this.router.navigate([param]);
  }

  openModal = (product: object) => { this.mat_dialog.open(EditFormComponent, {height: '90vh', data: {productData: product}}); }

  removeUserItem = (id: string) => { this.userProducts = this.item_service.removeUserItem(id); }

}
