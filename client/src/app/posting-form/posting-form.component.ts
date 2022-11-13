import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-posting-form',
  templateUrl: './posting-form.component.html',
  styleUrls: ['./posting-form.component.scss']
})
export class PostingFormComponent implements OnInit {

  url: any;
  titleInp: string = '';
  descriptionInp: string = '';
  quantityInp: number = 1;
  priceInp: number = 0.01;
  postMsg: boolean = false;

  constructor(private item_service: ItemService) { 
  }

  ngOnInit(): void {
  }

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
      tag: 'dried-good',
      quantity: Number(this.quantityInp),
      price: Number(this.priceInp),
      ratings: {average: 5.0, values: [5.0]},
      reviews: [],
      hide_quantity: false,
    }
   
    this.item_service.postItem(newItem);
    this.url = '';
    this.descriptionInp = '';
    this.quantityInp = 1;
    this.priceInp = 0.01;
    this.postMsg = true;

    setTimeout(() => { document.querySelector('.post-container')?.scrollIntoView({ behavior: 'smooth' })}, 125);
  }
}
