import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { v4 as uuidv4 } from 'uuid';


@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private subject_1 = new BehaviorSubject<any>([]);
  private subject_2 = new BehaviorSubject<number>(1);
  private DEFAULT_LIST: any[] = [];
  
  /*
  private data_set = [
    {
      id: uuidv4(),
      url: 'https://images.pexels.com/photos/4022088/pexels-photo-4022088.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      name: 'Blueberry',
      description: 'Freshly picked blueberries. Filled with antidioxant and vitamin C.',
      tag: 'fruit',
      quantity: 1,
      price: 3.99,
      ratings: {average: 4.0, values: [4.0]},
      reviews: [{content: "A bit expensive. But I am addicted to blueberries and it tastes fantastic!", rating: 4.0, name: 'anonymous'}],
      hide_quantity: false,
    },
    {
      id: uuidv4(),
      url: 'https://images.pexels.com/photos/46174/strawberries-berries-fruit-freshness-46174.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      name: 'Strawberry',
      description: 'Freshly picked strawberries. Filled with antidioxants and vitamin C.',
      tag: 'fruit',
      quantity: 1,
      price: 3.99,
      ratings: {average: 5.0, values: [5.0]},
      reviews: [{content: "Tasty strawberries. I would buy it again in the future.", rating: 5.0, name: 'anonymous'}],
      hide_quantity: false,
    },
    {
      id: uuidv4(),
      url: 'https://images.pexels.com/photos/5852229/pexels-photo-5852229.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      name: 'Grapes',
      description: 'Freshly picked strawberries. Filled with antidioxants and vitamin C.',
      tag: 'fruit',
      quantity: 1,
      price: 4.99,
      ratings: {average: 4.5, values: [4.5]},
      reviews: [{content: "The grapes tasted great. It seemed like it was naturally grown.", rating: 4.5, name: 'anonymous'}],
      hide_quantity: false,
    },
    {
      id: uuidv4(),
      url: 'https://images.pexels.com/photos/8446853/pexels-photo-8446853.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      name: 'Mango',
      description: 'Yellow Tropical fruit. Packed with nutrients and protective antioxidants.',
      tag: 'fruit',
      quantity: 1,
      price: 2.99,
      ratings: {average: 4.5, values: [4.5]},
      reviews: [{content: "10/10. Very delicious and I am addicted to mangos!", rating: 4.5, name: 'anonymous'}],
      hide_quantity: false,
    },
    {
      id: uuidv4(),
      url: 'https://i0.wp.com/post.healthline.com/wp-content/uploads/2019/05/spinach-1296x728-header.jpg?w=1155&h=1528',
      name: 'Spinach',
      description: 'Leafy green flowering plant from Asia. Eat your daily vegetables.',
      tag: 'vegetable',
      quantity: 1,
      price: 1.50,
      ratings: {average: 3.8, values: [3.8]},
      reviews: [{content: "7.5/10. Came in warm. Would have loved it if it was refrigerated on delivery.", rating: 3.8, name: 'anonymous'}],
      hide_quantity: false,
    },
    {
      id: uuidv4(),
      url: 'https://images.pexels.com/photos/6555515/pexels-photo-6555515.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      name: 'Tomato',
      description: 'Fresh and bright red. Please don\'t throw me.',
      tag: 'vegetable',
      quantity: 1,
      price: 1.99,
      ratings: {average: 2.0, values: [2.0]},
      reviews: [{content: "It was rotten. Don\'t buy it. I had to sue the company to receive compensation.", rating: 2.0, name: 'anonymous'}],
      hide_quantity: false,
    },
    {
      id: uuidv4(),
      url: 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Patates.jpg',
      name: 'Potato',
      description: 'Hungry? Just bake or fry up some potatoes.',
      tag: 'vegetable',
      quantity: 1,
      price: 1.39,
      ratings: {average: 4.0, values: [4.0]},
      reviews: [{content: "Loved it! Great value for its price.", rating: 4.0, name: 'anonymous'}],
      hide_quantity: false,
    },
    {
      id: uuidv4(),
      url: 'https://images.pexels.com/photos/7456550/pexels-photo-7456550.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      name: 'Red Onion',
      description: 'Superior to other types of onion. Contains high amount of antidioxant.',
      tag: 'vegetable',
      quantity: 1,
      price: 1.39,
      ratings: {average: 4.0, values: [4.0]},
      reviews: [{content: "Large and healthy red onions. I am happy with the purchase.", rating: 4.0, name: 'anonymous'}],
      hide_quantity: false,
    },
    {
      id: uuidv4(),
      url: 'https://images.pexels.com/photos/4117623/pexels-photo-4117623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      name: 'Broccoli',
      description: 'Don\'t like yor veggies? Give our broccoli a try.',
      tag: 'vegetable',
      quantity: 1,
      price: 4.39,
      ratings: {average: 4.0, values: [4.0]},
      reviews: [{content: "Worth the purchase. It was nicely cut for me and well packaged.", rating: 4.0, name: 'anonymous'}],
      hide_quantity: false,
    },
    {
      id: uuidv4(),
      url: 'https://images.pexels.com/photos/301669/pexels-photo-301669.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      name: 'Cinnamon',
      description: 'A spice extracted from bark of cinnamon trees. Used in various cooking. Do not consume by itself.',
      tag: 'dried-good',
      quantity: 1,
      price: 2.59,
      ratings: {average: 3.0, values: [3.0]},
      reviews: [{content: "8/10. Very happy with the product!", rating: 3.0, name: 'anonymous'}],
      hide_quantity: false,
    },
    {
      id: uuidv4(),
      url: 'https://images.pexels.com/photos/65175/pexels-photo-65175.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      name: 'Red Meat',
      description: 'Fresh raw meat. Keep up with your protein diet, bro.',
      tag: 'meat',
      quantity: 1,
      price: 8.39,
      ratings: {average: 5.0, values: [5.0]},
      reviews: [{content: "10/10. The package was delivered to me cold!", rating: 5.0, name: 'anonymous'}],
      hide_quantity: false,
    },
    {
      id: uuidv4(),
      url: 'https://live.staticflickr.com/7886/46799801551_330839b9a5_b.jpg',
      name: 'Chicken Breast',
      description: 'Sliced chicken breast with rosemary. Healthy source of protein for the bros.',
      tag: 'meat',
      quantity: 1,
      price: 6.59,
      ratings: {average: 5.0, values: [5.0]},
      reviews: [{content: "I can't denied. I am in love with their meat product.", rating: 5.0, name: 'anonymous'}],
      hide_quantity: false,
    },
    {
      id: uuidv4(),
      url: 'https://images.pexels.com/photos/8352002/pexels-photo-8352002.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      name: 'Tuna',
      description: 'High quality fish. Great in protein and popular choice for sushi.',
      tag: 'meat',
      quantity: 1,
      price: 7.49,
      ratings: {average: 5.0, values: [5.0]},
      reviews: [{content: "It is safe to say their meat product is their specialty. Well packaged and fresh.", rating: 5.0, name: 'anonymous'}],
      hide_quantity: false,
    },
    {
      id: uuidv4(),
      url: 'https://images.pexels.com/photos/6845651/pexels-photo-6845651.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      name: 'Egg',
      description: '10 eggs. Try eating me raw for extra protein.',
      tag: 'dairy',
      quantity: 1,
      price: 2.99,
      ratings: {average: 5.0, values: [5.0]},
      reviews: [{content: "The eggs were cold and completely intact when I received it!", rating: 5.0, name: 'anonymous'}],
      hide_quantity: false,
    }
  ];
  */
  
  constructor(private http: HttpClient) {

    const headers = new HttpHeaders().set('Content-Type', 'application/json;charset=UTF-8')

    let options = { headers: headers };
    let url = window.location.origin;
    
    if (window.location.hostname === 'localhost' ) { url = 'http://localhost:8080'; }
    
    this.http.get(url + '/api/item-list/', options)
    .subscribe( data => { this.subject_1.next(data); } );
    
    this.subject_1.asObservable().subscribe(list => {
      list.forEach((item: any) => { this.DEFAULT_LIST.push(item); });    
    });
    
    //this.DEFAULT_LIST = this.data_set;
  }
  /*
  initList() {
    this.http.post('http://localhost:8080/api/item-list/init', {item_list: this.data_set}).subscribe(
      data => {console.log(data)}
    );
  }
  */

  getItemList() { return this.DEFAULT_LIST || []; }

  getItem(id: string) {
    return this.DEFAULT_LIST.find(x => x.id === id) || {}; 
  }

  addReview(id: string, review: any) { 
    this.DEFAULT_LIST.find(x => x.id === id)?.reviews.push({...review}); 
    
    let average: number = 0;
    let size: number = 0;
    let foundIndex = this.DEFAULT_LIST.findIndex(x => x.id === id);

    this.DEFAULT_LIST[foundIndex].ratings.values.push(review.rating);
    this.DEFAULT_LIST[foundIndex].ratings.values.forEach((x: number) => { average += x; ++size; });
    this.DEFAULT_LIST[foundIndex].ratings.average = average / size;
  }

  setPageNum = (num: number) => {
    this.subject_2.next(num);
  }

  getPageNum = () => {
    return this.subject_2.asObservable() || 1;
  }
}
