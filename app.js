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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));


// Routes
app.get('/', (req, res) => {
    res.redirect('/products');
})

app.get('/products', (req, res) => {
    Product.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('index', { products: result, title: 'All Productz' })
        })
        .catch((err) => {
            console.log(err);
        })
});

app.get('/products/:id', (req, res) => {
    const id = req.params.id;
    Product.findById(id)
        .then(result => {
            res.render('details', { product: result, title: 'Single Item details' })
        })
        .catch(err => {
            console.log(err)
        })
})

app.post('/', (req, res) => {
    const products = req.body;
    Product.insertMany(products)
        .then(result => res.status(201).send(result))
        .catch(err => res.status(400).send(err));
});

// to add product to the cart
app.post('/cart', (req, res) => {
    const { title, price, description, weight, image } = req.body;
    const CartItem = new Cart({ title, price, description, weight, image });

    CartItem.save()
        .then(result => {
            res.redirect('/');
        })
        .catch(err => {
            console.log(err);
        });
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

app.get('/contact', (req, res) => {
    res.render('contact', { title: 'Contact' });
});


// to display all items in the cart
app.get('/cart', (req, res) => {
    Cart.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('cart', { title: 'Shopping Cart', items: result })
        })
        .catch((err) => {
            console.log(err);
        })
});

app.delete('/cart/:id', (req, res) => {
    const id = req.params.id;
    Cart.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: '/products' })
        })
        .catch(err => console.log(err));
})

app.use((req, res) => {
    res.status(404).render('404', { title: 'Comment' });
});