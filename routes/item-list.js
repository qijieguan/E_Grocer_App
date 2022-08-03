const router = require('express').Router();
let Item_List = require('../models/item-list.model');

/*
let DEFAULT_LIST = [
  {
    id: '1',
    url: 'https://images.pexels.com/photos/6555515/pexels-photo-6555515.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    name: 'Tomato',
    description: 'Fresh and bright red. Please don\'t throw me.',
    quantity: 1,
    price: 1.99,
    ratings: {average: 2.0, values: [2.0]},
    reviews: [{content: "It was rotten. Don\'t buy it. I had to sue the company to receive compensation.", rating: 2.0, name: 'anonymous'}],
    hide_quantity: false,
  },
  {
    id: '2',
    url: 'https://images.pexels.com/photos/8446853/pexels-photo-8446853.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    name: 'Mango',
    description: 'Yellow Tropical fruit. Packed with nutrients and protective antioxidants.',
    quantity: 1,
    price: 2.99,
    ratings: {average: 4.5, values: [4.5]},
    reviews: [{content: "10/10. Very delicious and I am addicted to mangos!", rating: 4.5, name: 'anonymous'}],
    hide_quantity: false,
  },
  {
    id: '3',
    url: 'https://i0.wp.com/post.healthline.com/wp-content/uploads/2019/05/spinach-1296x728-header.jpg?w=1155&h=1528',
    name: 'Spinach',
    description: 'Leafy green flowering plant from Asia. Eat your daily vegetables.',
    quantity: 1,
    price: 1.50,
    ratings: {average: 3.8, values: [3.8]},
    reviews: [{content: "7.5/10. Came in warm. Would have loved it if it was refrigerated on delivery.", rating: 3.8, name: 'anonymous'}],
    hide_quantity: false,
  },
  {
    id: '4',
    url: 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Patates.jpg',
    name: 'Potato',
    description: 'Hungry? Just bake or fry up some potatoes.',
    quantity: 1,
    price: 1.39,
    ratings: {average: 4.0, values: [4.0]},
    reviews: [{content: "Loved it! Great value for its price.", rating: 4.0, name: 'anonymous'}],
    hide_quantity: false,
  },
  {
    id: '5',
    url: 'https://images.pexels.com/photos/301669/pexels-photo-301669.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    name: 'Cinnamon',
    description: 'A spice extracted from bark of cinnamon trees. Used in various cooking. Do not consume by itself.',
    quantity: 1,
    price: 2.59,
    ratings: {average: 3.0, values: [3.0]},
    reviews: [{content: "8/10. Very happy with the product!", rating: 3.0, name: 'anonymous'}],
    hide_quantity: false,
  },
  {
    id: '6',
    url: 'https://images.pexels.com/photos/65175/pexels-photo-65175.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    name: 'Red Meat',
    description: 'Fresh raw meat. Keep up with your protein diet, bro.',
    quantity: 1,
    price: 8.39,
    ratings: {average: 5.0, values: [5.0]},
    reviews: [{content: "10/10. The package was delivered to me cold!", rating: 5.0, name: 'anonymous'}],
    hide_quantity: false,
  }
];
*/
router.route('/').get((req, res) => {
  Item_List.find()
  .then(result => res.json(result))
});

router.route('/init').post((req, res) => {
    const item_list = req.body.item_list;

    Item_List.insertMany([...item_list])
    .then(res.json("POST successfully!"))
});

module.exports = router;