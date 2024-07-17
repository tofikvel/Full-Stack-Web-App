const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config()

const app = express();

// const dbURI = 'mongodb+srv://tofigvaliyev1993:AV3nZmKanlNRZd8L@cluster0.arcflm1.mongodb.net/nodeProject?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        // Listen for requests
        app.listen(process.env.PORT, () => {
            console.log("Connected to the db & listening on port:", process.env.PORT);
        });
    })
    .catch((error) => {
        console.log('Error connecting to MongoDB:', error);
    });


app.set('view engine', 'ejs');

app.listen(3000);

app.use(express.static('public'));

app.use(morgan('dev'));

app.get('/', (req, res) => {
    const items = [
        { title: 'Coca-Cola', price: '$2.99', description: 'Refreshing carbonated drink' },
        { title: 'Sprite', price: '$1.99', description: 'Refreshing carbonated drink' },
        { title: 'Fanta', price: '$2.99', description: 'Refreshing carbonated drink' }
    ];
    res.render('index', { title: 'Main', items: items });
});

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