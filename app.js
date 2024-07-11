const express = require('express');

const app = express();

app.set('view engine', 'ejs');

app.listen(3000);

app.get('/', (req, res) => {
    res.render('index', { title: 'Shop' });
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.get('/product', (req, res) => {
    res.render('product');
});

app.get('/shop/cart', (req, res) => {
    res.render('cart');
});
app.get('/comment', (req, res) => {
    res.render('comment');
});

app.use((req, res) => {
    res.status(404).render('404');
});