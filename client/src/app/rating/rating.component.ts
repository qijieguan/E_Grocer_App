import { Component, OnInit, Input } from '@angular/core';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {

  @Input() itemID: string = "";
  @Input() expand: boolean = false;
  @Input() reviewRating: number = -1;

  item: any;  
  rating: number = 0;

  constructor(private item_service: ItemService) { 
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.item = this.item_service.getItem(this.itemID);
      this.rating = this.item.ratings.average;
    });
  }

}
