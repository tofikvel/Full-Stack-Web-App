const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    weight: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
})

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;