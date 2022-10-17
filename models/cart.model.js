const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cartSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 5
    },
    url: {
        type: String,
        required: true,
        trim: true,
    },
    name: {
        type: String,
        trim: true,
    },
    quantity: {
        type: Number, 
    },
    price: {
        type: Number,
    }
},
{
    timestamps: true,   
});

const cart = mongoose.model('cart', cartSchema);
module.exports = cart;