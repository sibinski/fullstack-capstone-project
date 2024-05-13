router.get('/', async (req, res) => {
    try {
        // Task 1: Connect to MongoDB
        // {{insert code here}}

        // Task 2: Access MongoDB collection
        // {{insert code here}}

        // Task 3: Fetch all gifts
        // {{insert code here}}

        res.json(/* Task 4: Return gifts */);
    } catch (e) {
        console.error('Error fetching gifts:', e);
        res.status(500).send('Error fetching gifts');
    }
});

router.get('/:id', async (req, res) => {
    try {
        // Task 1: Connect to MongoDB
        // {{insert code here}}

        // Task 2: Access MongoDB collection
        // {{insert code here}}

        // Task 3: Find a specific gift by ID
        // {{insert code here}}

        if (!gift) {
            return res.status(404).send('Gift not found');
        }

        res.json(gift);
    } catch (e) {
        console.error('Error fetching gift:', e);
        res.status(500).send('Error fetching gift');
    }
});
