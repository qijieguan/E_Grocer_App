import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  DEFAULT_LIST: any[] = [
    {
      _id: uuidv4(),
      url: 'https://images.pexels.com/photos/6555515/pexels-photo-6555515.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      name: 'Tomato',
      description: 'Fresh and bright red. Please don\'t throw me.',
      quantity: 1,
      price: 1.99,
      reviews: [{content: "It was rotten. Don\'t buy it. I had to sue the company to receive compensation.",  name: 'anonymous'}],
      hide_quantity: false,
    },
    {
      _id: uuidv4(),
      url: 'https://images.pexels.com/photos/8446853/pexels-photo-8446853.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      name: 'Mango',
      description: 'Yellow Tropical fruit. Packed with nutrients and protective antioxidants.',
      quantity: 1,
      price: 2.99,
      reviews: [{content: "10/10. Very delicious and I am addicted to mangos!",  name: 'anonymous'}],
      hide_quantity: false,
    },
    {
      _id: uuidv4(),
      url: 'https://i0.wp.com/post.healthline.com/wp-content/uploads/2019/05/spinach-1296x728-header.jpg?w=1155&h=1528',
      name: 'Spinach',
      description: 'Leafy green flowering plant from Asia. Eat your daily vegetables.',
      quantity: 1,
      price: 1.50,
      reviews: [{content: "7.5/10. Came in warm. Would have loved it if it was refrigerated on delivery.",  name: 'anonymous'}],
      hide_quantity: false,
    },
    {
      _id: uuidv4(),
      url: 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Patates.jpg',
      name: 'Potato',
      description: 'Hungry? Just bake or fry up some potatoes.',
      quantity: 1,
      price: 1.39,
      reviews: [{content: "Loved it! Great value for its price.",  name: 'anonymous'}],
      hide_quantity: false,
    },
    {
      _id: uuidv4(),
      url: 'https://images.pexels.com/photos/301669/pexels-photo-301669.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      name: 'Cinnamon',
      description: 'A spice extracted from bark of cinnamon trees. Used in various cooking. Do not consume by itself.',
      quantity: 1,
      price: 2.59,
      reviews: [{content: "8/10. Very happy with the product!",  name: 'anonymous'}],
      hide_quantity: false,
    },
    {
      _id: uuidv4(),
      url: 'https://images.pexels.com/photos/65175/pexels-photo-65175.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      name: 'Red Meat',
      description: 'Fresh raw meat. Keep up with your protein diet, bro.',
      quantity: 1,
      price: 8.39,
      reviews: [{content: "10/10. The package was delivered to me cold!",  name: 'anonymous'}],
      hide_quantity: false,
    }
  ]

  constructor() {
    //TODO: Persist unique IDs when connected to database
    let UNIQUE_IDS: any[] = [];
    let i: number = 0;

    if (!sessionStorage.getItem("unique_ids")) {
      this.DEFAULT_LIST.forEach(x => { UNIQUE_IDS.push(x._id); } );
      sessionStorage.setItem("unique_ids", JSON.stringify(UNIQUE_IDS));
    }
    else {
      UNIQUE_IDS = JSON.parse(sessionStorage.getItem('unique_ids') || "");
      this.DEFAULT_LIST.forEach(x => { x._id = UNIQUE_IDS[i]; ++i; });
    }
  }

  getItemList() { return this.DEFAULT_LIST || []; }

  getItem(id: string) { return this.DEFAULT_LIST.find(x => x._id === id) || []; }

  addReview(id: string, review: object) { this.DEFAULT_LIST.find(x => x._id === id)?.reviews.push({...review}); }

}
