import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor() { }

  getItemList() {
    return [
      {
        _id: uuidv4(),
        url: 'https://images.pexels.com/photos/6555515/pexels-photo-6555515.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        name: 'Tomato',
        quantity: 1,
        price: 1.99,
        hide_quantity: false,
      },
      {
        _id: uuidv4(),
        url: 'https://images.pexels.com/photos/8446853/pexels-photo-8446853.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        name: 'Mango',
        quantity: 1,
        price: 2.99,
        hide_quantity: false,
      },
      {
        _id: uuidv4(),
        url: 'https://i0.wp.com/post.healthline.com/wp-content/uploads/2019/05/spinach-1296x728-header.jpg?w=1155&h=1528',
        name: 'Spinach',
        quantity: 1,
        price: 1.50,
        hide_quantity: false,
      },
      {
        _id: uuidv4(),
        url: 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Patates.jpg',
        name: 'Potato',
        quantity: 1,
        price: 1.39,
        hide_quantity: false,
      },
      {
        _id: uuidv4(),
        url: 'https://images.pexels.com/photos/301669/pexels-photo-301669.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        name: 'Cinnamon',
        quantity: 1,
        price: 2.59,
        hide_quantity: false,
      },
      {
        _id: uuidv4(),
        url: 'https://images.pexels.com/photos/65175/pexels-photo-65175.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        name: 'Red Meat',
        quantity: 1,
        price: 8.39,
        hide_quantity: false,
      }
    ]
  }
}
