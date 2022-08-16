const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemListSchema = new Schema({
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
    description: {
        type: String,
        trim: true,
    },
    tag : {
        type: String,
        trim: true
    },
    quantity: {
        type: Number, 
    },
    price: {
        type: Number,
    },
    ratings: {
        average: { type: Number },
        values: { type: Array, }
    },
    reviews: [{
        content: { type: String, trim: true, },
        rating: { type: Number },
        name: { type: String, trim: true }
    }],
    hide_quantity: {
        type: Boolean,
    },
},
{
    timestamps: true,   
});

const Item_List = mongoose.model('Item_List', itemListSchema);
module.exports = Item_List;