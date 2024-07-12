const express = require('express');

const app = express();

app.set('view engine', 'ejs');

app.listen(3000);

app.get('/', (req, res) => {
    const items = [
        { title: 'Coca-Cola', price: '$2.99', description: 'Refreshing carbonated drink' },
        { title: 'Sprite', price: '$1.99', description: 'Refreshing carbonated drink' },
        { title: 'Fanta', price: '$2.99', description: 'Refreshing carbonated drink' }
    ];
    res.render('index', { title: 'Shop', items: items });
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

app.get('/shop/cart', (req, res) => {
    res.render('cart', { title: 'Shopping cart' });
});
app.get('/comment', (req, res) => {
    res.render('comment', { title: 'Comment' });
});

app.use((req, res) => {
    res.status(404).render('404', { title: 'Comment' });
});