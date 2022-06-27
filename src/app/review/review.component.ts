import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {

  params: any[] = [];
  reviews: any[] = [];
  reviewInp: string = "";

  constructor(private item_service: ItemService, private route: Router) {
    this.params = this.route.url.split('?')[0].split('/');
    
    let result = this.item_service.getItem(this.params[2]);
    if (result) { this.reviews = result.reviews }
    
  }

  ngOnInit(): void {

  }

  handleChange = (event: any) => { this.reviewInp = event.target.value }

  handleSubmit = () => {
    this.item_service.addReview(this.params[2], {content: this.reviewInp, name: 'anonymous'})
    this.reviewInp = "";
  }

}
