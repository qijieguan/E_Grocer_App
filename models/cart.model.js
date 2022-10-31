const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cartSchema = new Schema({
    uid: { type: String, trim: true, },
    cart: [{
        id: { type: String, trim: true, },
        url: { type: String, trim: true, },
        name: { type: String, trim: true, },
        quantity: { type: Number, trim: true,},
        price: { type: Number, }
    }]
},
{ timestamps: true, });

cartSchema.index({ createdAt: 1 }, { expireAfterSeconds: 1200 });

const cart = mongoose.model('cart', cartSchema);
module.exports = cart;