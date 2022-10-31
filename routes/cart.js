const router = require('express').Router();
const { update } = require('../models/cart.model');
let Cart = require('../models/cart.model');


router.route('/').post((req, res) => {
    const uid = req.body.user_id;

    Cart.find({uid})
    .then(result => res.json(result));
});

router.route('/init').post((req, res) => {
    const uid = req.body.user_id;
    const cart = [];

    const newCart = new Cart({uid, cart});
    newCart.save()
    .then(res.json("Cart is initialized!"));    
});

router.route('/add').post((req, res) => {
    const user_id = req.body.user_id;
    const cart_obj = req.body.cart_obj;
    
    Cart.updateOne(
        {uid: user_id},
        {$push: {cart: cart_obj}}
    )
    .then(res.json("Item added to cart!")); 
});

router.route('/delete').post((req, res) => {
    const user_id = req.body.user_id;
    const remove_id = req.body.remove_id;

    Cart.updateOne(
        {uid: user_id},
        {$pull: {cart: { id: remove_id }}}
    )
    .then(res.json('Item removed from cart!'));
});

router.route('/update').post((req, res) => {
    const user_id = req.body.user_id;
    const updated_obj = req.body.updated_obj;

    Cart.updateOne(
        {uid: user_id, 'cart.id': updated_obj.id},
        {$set: {'cart.$.quantity': updated_obj.quantity, 'cart.$.price': updated_obj.price}}
    )
    .then( res.json('Item updated in cart!') );
});

router.route('/clear').post((req, res) => {
    const user_id = req.body.user_id;

    Cart.updateOne(
        {uid: user_id},
        {$pull: {cart: {}}}
    )
    .then(res.json('Cart is cleared!'))
});

module.exports = router;