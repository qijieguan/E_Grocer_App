import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service';
import { v4 as uuidv4 } from 'uuid';
import { MatDialog } from '@angular/material/dialog';
import { EditFormComponent } from '../edit-form/edit-form.component';

@Component({
  selector: 'app-posting-form',
  templateUrl: './item-posting.component.html',
  styleUrls: ['./item-posting.component.scss']
})
export class ItemPostingComponent implements OnInit {

  userList: Array<any> = [];

  url: any;
  titleInp: string = '';
  descriptionInp: string = '';
  tagInp: string = '';
  quantityInp: number = 1;
  priceInp: number = 0.01;
  postMsg: boolean = false;

  currOption: number = 1;

  constructor(private item_service: ItemService, private mat_dialog: MatDialog) { 
  }

  ngOnInit(): void { 
    this.toggleSection(this.currOption); 
  }

  toggleSection = (activeVal: number) => {
    this.resetInputs() ;
    setTimeout(() => { this.userList = this.item_service.getUserList();}, 125)

    document.getElementsByClassName('post-option ' + this.currOption.toString())[0].classList.remove('active');
    this.currOption = activeVal;
    document.getElementsByClassName('post-option ' + this.currOption.toString())[0].classList.add('active');
  }

  openModal = (product: object) => { this.mat_dialog.open(EditFormComponent, {height: '90vh', data: {productData: product}}); }

  removeUserItem = (id: string) => { this.userList = this.item_service.removeUserItem(id); }

  onFileSelected = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => {
        if (event.target?.result) {
          this.url = event.target.result;
        } 
      };
    }
  }

  handleChange = (event: any) => {
    if (event.target.name === 'title') { this.titleInp = event.target.value; }
    else if (event.target.name === 'description') { this.descriptionInp = event.target.value; }
    else if (event.target.name === 'tag') { this.tagInp = event.target.value; }
    else if (event.target.name === 'quantity') { this.quantityInp = event.target.value; }
    else { this.priceInp = event.target.value; }

    if (this.postMsg) { this.postMsg = false; }
  }
  
  handleSubmit = (event: any) => {
    event.preventDefault();

    let newItem = {
      id: uuidv4(),
      url: this.url,
      name: this.titleInp,
      description: this.descriptionInp,
      tag: this.tagInp,
      quantity: Number(this.quantityInp),
      price: Number(this.priceInp),
      ratings: {average: 5.0, values: [5.0]},
      reviews: [],
      mode: {show_quantity: false, edit: false},
      made_by: 'user',
    }
   
    this.item_service.postItem(newItem);

    let file = document.getElementById('file-input') as HTMLInputElement;
    file.value = '';
    
    this.resetInputs();
    this.postMsg = true;

    setTimeout(() => { document.querySelector('.post-container')?.scrollIntoView({ behavior: 'smooth' })}, 125);
  }

  resetInputs = () => {
    this.url = '';
    this.titleInp='';
    this.descriptionInp = '';
    this.tagInp = '';
    this.quantityInp = 1;
    this.priceInp = 0.01;
  }
}
