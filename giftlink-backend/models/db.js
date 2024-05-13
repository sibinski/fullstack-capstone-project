const { MongoClient } = require('mongodb');
let dbInstance = null;

async function connectToDatabase() {
    if (dbInstance) return dbInstance;

    // Task 1: Connect to MongoDB
    // {{insert code here}}

    // Task 2: Assign dbInstance
    // {{insert code here}}

    // Task 3: Return dbInstance
    // {{insert code here}}
}

module.exports = connectToDatabase;
