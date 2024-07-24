require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Cart = require('./models/cart');
const Product = require('./models/product');

const app = express();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(process.env.PORT);
    })
    .catch((error) => {
        console.log(error);
    });

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(morgan('dev'));



// Routes
app.get('/', (req, res) => {
    res.redirect('/products');
});

app.get('/products', (req, res) => {
    Product.find().sort({ createdAt: -1 })
        .then((data) => {
            res.render('index', { title: 'All Products', products: data })
        })
        .catch((err) => {
            console.log(err);
        })
})

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

app.get('/contact', (req, res) => {
    res.render('contact', { title: 'Contact' });
});

app.get('/product', (req, res) => {
    res.render('product', { title: 'Product' });
});

app.get('/cart', (req, res) => {
    res.render('cart', { title: 'Cart' });
});

app.get('/comment', (req, res) => {
    res.render('comment', { title: 'Comment' });
});

app.use((req, res) => {
    res.status(404).render('404', { title: 'Comment' });
});