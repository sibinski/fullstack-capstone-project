import express, { Router } from 'express';
const app = express();
import { genSalt, hash as _hash, compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import connectToDatabase from '../models/db';
const router = Router();
import { config } from 'dotenv';
import pino from 'pino';  // Import Pino logger

const logger = pino(); //Create a Pino logger instance

config();

//Step 1 - Task 4: Create JWT secret
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables');
}

router.post('/register', [
    // Add validation for register route
    body('email').isEmail().withMessage('Enter a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('firstName').notEmpty().withMessage('First name is required'),
    body('lastName').notEmpty().withMessage('Last name is required'),
], async (req, res) => {
    try {
        // Task 1: Connect to `giftsdb` in MongoDB through `connectToDatabase` in `db.js`
        const db = await connectToDatabase();

        // Task 2: Access MongoDB collection
        const collection = db.collection("users");

        //Task 3: Check for existing email
        const existingEmail = await collection.findOne({ email: req.body.email });
        if (existingEmail) {
            logger.error('Email id already exists');
            return res.status(400).json({ error: 'Email id already exists' });
        }

        const salt = await genSalt(10);
        const hash = await _hash(req.body.password, salt);
        const email = req.body.email;

        //Task 4: Save user details in database
        const newUser = await collection.insertOne({
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: hash,
            createdAt: new Date(),
        });
         //Task 5: Create JWT authentication with user._id as payload
         const payload = {
            user: {
                id: newUser.insertedId,
            }
         };

        //Create JWT

        const authtoken = sign(payload, JWT_SECRET);
        logger.info('User registered successfully');
        res.json({authtoken,email});
    } catch (e) {
        logger.error(e);
        return res.status(500).send('Internal server error');
    }
});

router.post('/login', [
    // Add validation for login route
    body('email').isEmail().withMessage('Enter a valid email'),
    body('password').notEmpty().withMessage('Password is required'),
], async (req, res) => {
    console.log("\n\n Inside login")
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            logger.error('Validation errors in login request', errors.array());
            return res.status(400).json({ errors: errors.array() });
        }  
        // Task 1: Connect to `giftsdb` in MongoDB through `connectToDatabase` in `db.js`.
        const db = await connectToDatabase();
        // Task 2: Access MongoDB `users` collection
        const collection = db.collection("users");
        // Task 3: Check for user credentials in database
        const theUser = await collection.findOne({ email: req.body.email });
        // Task 4: Task 4: Check if the password matches the encrypyted password and send appropriate message on mismatch
        if (theUser) {
            let result = await compare(req.body.password, theUser.password)
            if(!result) {
                logger.error('Passwords do not match');
                return res.status(404).json({ error: 'Wrong password' });            
        }
        // Task 5: Fetch user details from database
        const userName = theUser.firstName;
        const userEmail = theUser.email;
        // Task 6: Create JWT authentication if passwords match with user._id as payload
        const payload = {
            user: {
                id: theUser._id.toString(),
            }
        };
        const authtoken = sign(payload, JWT_SECRET);
        logger.info('User logged in successfully');
        return res.status(200).json({authtoken, userName, userEmail });
    }
        // Task 7: Send appropriate message if user not found
        else {
            logger.error('User not found');
            return res.status(404).json({ error: 'User not found' });
        }
    } catch (e) {
        logger.error(e);
        return res.status(500).send('Internal server error');
    }
});

router.put('/update', [
    // Add validation for update route
    body('email').isEmail().withMessage('Enter a valid email'),
], async (req, res) => {
    // Task 2: Validate the input using `validationResult` and return approiate message if there is an error.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        logger.error('Validation errors in update request', errors.array());
        return res.status(400).json({ errors: errors.array() });
    }
try {
    // Task 3: Check if `email` is present in the header and throw an appropriate error message if not present.
    const email = req.headers.email;
    if(!email) {
        logger.error('Email not found in the request headers');
        return res.status(400).json({error: "Email not found in the request headers" });
    }
    // Task 4: Connect to MongoDB
    const db = await connectToDatabase();
    const collection = db.collection("users");
    // Task 5: find user credentials in database
    const existingUser = await collection.findOne({ email });
    if (!existingUser) {
            logger.error('User not found');
            return res.status(404).json({ error: 'User not found' });
        }
    existingUser.updatedAt = new Date();
    // Task 6: update user credentials in database
    const updatedUser = await collection.findOneAndUpdate(
        { email },
        { $set: existingUser },
        { returnDocument: 'after' }
    );
    // Task 7: create JWT authentication using secret key from .env file
    const payload = {
        user: {
            id: updatedUser.value._id.toString(),
        }
    };
    const authtoken = sign(payload, JWT_SECRET);
    logger.info('User updated successfully');
    res.json({authtoken});
} catch (error) {
    logger.error(error);
    return res.status(500).send('Internal server error');

}
});

export default router;