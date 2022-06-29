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
  reviews: any[] = [];
  reviewInp: string = "";

  constructor(private route: Router, private item_service: ItemService) {
    this.param = this.route.url.split('/')[2];
    this.item = this.item_service.getItem(this.param);
    this.reviews = this.item.reviews;
  }

  ngOnInit(): void {
  }

  handleChange = (event: any) => { this.reviewInp = event.target.value }

  handleSubmit = () => {
    this.item_service.addReview(this.param, {content: this.reviewInp, name: 'anonymous'})
    this.reviewInp = "";
  }

}
