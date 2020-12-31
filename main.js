const express = require('express');
const path = require('path');

// Create an Express app web server; an instance/object.
// All a webserver does is listen to requests and then responding in some fashion.
const app = express();

// Use a piece of middleware to access form data. allows for global access
// Middleware is a fxn that can access and modify the request and response objects between server requests.
// Use cases: user permissions; only allowing access to paying customers; only available to logged in customers;
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, '/public/')));

// Set the template engine
app.set("view engine", 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Fake middelware
function getWeather(req, res, next) {
    req['visitorWeather'] = 'Sunny';

    // Next is what's called when a function is done. Time to move onto the next task/function. Can be use at the specific route level or global app level.
    next();
}

// Server app route w/ fake piece of middleware.
app.get('/', getWeather, (req, res) => {
    // Very similar to Django/Flask
    // First argument is the template; proceeding is context data via object (or dict in Python)
    res.render("home", {
        weather: req['visitorWeather'],
        pets: [{'name': 'Bruno', 'type': 'dog'}, {'name': 'Voltaire', 'type': 'dog'}, {'name': 'Bagheera', 'type': 'cat'}]
    });
});

app.post('/result', (req, res,) => {
    // Access the value(s) the user/client sent over
    // req.body is similar to the Request object in Django
    console.log(req.body['color']);

    formData = req.body['color'];

    if(formData.trim().toLowerCase() === 'blue') {
        res.send('Access permitted.');
    } else {
        res.send('Access denied. Please tried again.');
    }
});

// Comment
app.get('/about', (req, res) => {
    res.send('Thanks for learning more about us.');
});

// API response example!
app.get('/api/pets', (req, res) => {
    res.json([{'name': 'Bruno', 'type': 'dog'}, {'name': 'Voltaire', 'type': 'dog'}, {'name': 'Bagheera', 'type': 'cat'}]);
});

app.listen(8080);