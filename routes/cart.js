const router = require('express').Router();
let Cart = require('../models/cart.model');


router.route('/').get((req, res) => {
    Cart.find()
    .then(result => res.json(result))
    .catch(err => res.status(400).json("Error " + err)); 
});

router.route('/add').post((req, res) => {
    const cart_obj = req.body.cart_obj;
    
    const newCart = new Cart(cart_obj);
    newCart.save()
    .then( res.json("Item added to cart!") )
    .catch(err => res.status(400).json("Error " + err));      
});

router.route('/delete').post((req, res) => {
    const remove_id = req.body.remove_id;

    Cart.findOneAndDelete({ "id" : remove_id })
    .then( res.json('Item removed from cart!') )
    .catch(err => res.status(400).json("Error " + err));  
});

router.route('/update').post((req, res) => {
    const updated_obj = req.body.updated_obj;

    Cart.findOneAndUpdate(
        { "id" : updated_obj.id },
        {"quantity" : updated_obj.quantity, "price" : updated_obj.price }
    )
    .then( res.json('Item updated in cart!') )
    .catch(err => res.status(400).json("Error " + err));  
});

router.route('/clear').post((req, res) => {
    Cart.deleteMany({})
    .then( res.json('Cart is cleared!') )
    .catch(err => res.status(400).json("Error " + err));   
});

module.exports = router;