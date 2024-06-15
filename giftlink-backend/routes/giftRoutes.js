/*jshint esversion: 8 */
import { Router } from 'express';
const router = Router();
import connectToDatabase from "../models/db";
import { console } from '../logger';
const logger = require('../logger');
const { ObjectId } = require('mongodb');

// Get all gifts
router.get('/', async (req, res, next) => {
    try {
        // Task 1: Connect to MongoDB and store connection to db constant
         
            const db = await connectToDatabase();
         

        // Task 2: use the collection() method to retrieve the gift collection
        
            const collection = db.collection("gifts");
        
        // Task 3: Fetch all gifts using the collection.find method. Chain with toArray method to convert to JSON array
        
        const gifts = await collection.find({}).toArray();
        
        // Task 4: return the gifts using the res.json method
        
        res.json(gifts);
        
    } catch (e) {
        logger.error('Error fetching gifts:', e);
        next(e);
    }
});

// Get a single gift by ID
router.get('/:id', async (req, res) => {
    try {
        // Task 1: Connect to MongoDB and store connection to db constant
        
            const db = await connectToDatabase();
        

        // Task 2: use the collection() method to retrieve the gift collection
        
            const collection = db.collection("gifts");

        // Task 3: Find a specific gift by ID using the collection.fineOne method and store in constant called gift

            const id = req.params.id;
            const gift = await collection.findOne({ _id: ObjectId(id) });
        
        if (!gift) {
            return res.status(404).send('Gift not found');
        }
        
        // Task 4: Return gifts
        res.json(gift);
    } catch (e) {
        next(e);
    }
});



// Add a new gift
router.post('/', async (req, res, next) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection('gifts');
        const gift = await collection.insertOne(req.body);

        res.status(201).json(gift.ops[0]);
    } catch (e) {
        logger.error('Error adding gift:', e);
        next(e);
    }
});

export default router;
