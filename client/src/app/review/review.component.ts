import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {

  item: any;
  param: string = "";
  ratingInp: number = 0;
  reviews: any[] = [];
  reviewInp: string = "";

  constructor(private router: Router, private item_service: ItemService) {
    this.param = this.router.url.split('/')[4];
  }

  ngOnInit(): void { 
    setTimeout(() => {
      this.item = this.item_service.getItem(this.param);
      this.reviews = this.item.reviews;
    });
  }

  onRateChange = (event: any) => { this.ratingInp = event; }

  handleChange = (event: any) => { this.reviewInp = event.target.value; }

  handleSubmit = () => {
    if (!this.ratingInp || !this.reviewInp) { return; }
    this.item_service.addReview(this.param, {content: this.reviewInp, rating: this.ratingInp, name: 'anonymous'})
    this.reviewInp = "";
    this.ratingInp = 0;
  }

}
