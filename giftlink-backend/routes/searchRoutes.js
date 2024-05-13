const express = require('express');
const router = express.Router();
const connectToDatabase = require('../models/db');

// Search for gifts
router.get('/', async (req, res, next) => {
    try {
        // Task 1: Connect to MongoDB
        // {{insert code here}}

        // Initialize the query object
        let query = {};

        // Task 2: Add the name filter to the query
        // {{insert code here}}

        // Task 3: Add other filters to the query
        // {{insert code here}}

        // Task 4: Fetch filtered gifts
        // {{insert code here}}

        res.json(gifts);
    } catch (e) {
        next(e);
    }
});

module.exports = router;
