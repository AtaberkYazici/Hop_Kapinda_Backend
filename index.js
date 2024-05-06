// index.js

const express = require('express');
const app = express();

// Serve static files from the 'assets' directory
app.use('/assets', express.static('assets'));

// Import your data
const { categories, restaurants } = require('./data');

// Define routes to serve your data
app.get('/api/categories', (req, res) => {
    res.json(categories);
});

app.get('/api/restaurants', (req, res) => {
    res.json(restaurants);
});
app.get('/api/restaurants/:id', (req, res) => {
    const restaurantId = parseInt(req.params.id);
    const restaurant = restaurants.find(restaurant => restaurant.id === restaurantId);
    if (restaurant) {
        res.json(restaurant);
    } else {
        res.status(404).json({ error: 'Restaurant not found' });
    }
});
app.get('/api/restaurants/:id/dishes/:dishId', (req, res) => {
    const restaurantId = parseInt(req.params.id);
    const dishId = parseInt(req.params.dishId);
    console.log(restaurantId);
    console.log(dishId);
    const restaurant = restaurants.find(restaurant => restaurant.id === restaurantId);
    if (restaurant) {
        const meals = restaurant.food.flatMap((category) => category.meals);
        dish=meals.find((meal) => meal.id === dishId);
        if (dish) {
            res.json(dish);
        } else {
            res.status(404).json({ error: 'Dish not found' });
        }
    } else {
        res.status(404).json({ error: 'Restaurant not found' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
