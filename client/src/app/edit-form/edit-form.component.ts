import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss']
})

export class EditFormComponent implements OnInit {


  productID: string = "";
  editNameInp: string = "";
  editDescInp: string = "";
  editPriceInp: number = 0;

  constructor(private mat_dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, private item_service: ItemService) { 
    this.productID = this.data.productData.id;

    this.editNameInp = this.data.productData.name;
    this.editDescInp = this.data.productData.description;
    this.editPriceInp = this.data.productData.price;
  }

  ngOnInit(): void {
    
  }

  closeModal = (event: any) => {
    event.preventDefault();
    this.productID = "";
    this.editNameInp = "";
    this.editDescInp = "";
    this.editPriceInp = 0;
    this.mat_dialog.closeAll();
  }

  handleChange = (event: any) => {
    if (event.target.name === "edit-name") { this.editNameInp = event.target.value; }
    else if (event.target.name === "edit-description") { this.editDescInp = event.target.value; }
    else { this.editPriceInp = event.target.value; }
  }

  handleSubmit = (event: any) => {
    let changes = {
      name: this.editNameInp,
      description: this.editDescInp,
      price: this.editPriceInp,
    }
    this.item_service.editUserItem(this.productID, changes);
    this.closeModal(event);
  }

}
