import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service';
import { MatDialog } from '@angular/material/dialog';
import { EditFormComponent } from '../edit-form/edit-form.component';

@Component({
  selector: 'app-user-catelog',
  templateUrl: './user-catelog.component.html',
  styleUrls: ['./user-catelog.component.scss']
})
export class UserCatelogComponent implements OnInit {

  userProducts: Array<any> = [
  ];

  constructor(private item_service: ItemService, private mat_dialog: MatDialog) { setTimeout(() => { this.userProducts = this.item_service.getUserList();}, 125); }

  ngOnInit(): void {
  }

  openModal = (product: object) => { this.mat_dialog.open(EditFormComponent, {height: '90vh', data: {productData: product}}); }

  removeUserItem = (id: string) => { this.userProducts = this.item_service.removeUserItem(id); }

}
