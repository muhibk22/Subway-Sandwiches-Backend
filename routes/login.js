const express = require('express');
const router = express.Router();
const { Login } = require('../models/login');

// POST route for user login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        console.log('Received credentials:', { username, password });

        if (!username || !password) {
            console.log('Missing fields');
            return res.status(400).send({ success: false, message: 'Please fill in all the required fields.' });
        }

        const user = await Login.findOne({ username });

        console.log('Retrieved user:', user);

        if (!user) {
            console.log('User not found');
            return res.status(401).send({ success: false, message: 'Invalid username or password' });
        }

        console.log('Comparing passwords:', password, user.password);

        if (password !== user.password) {
            console.log('Password mismatch');
            return res.status(401).send({ success: false, message: 'Invalid username or password' });
        }

        console.log('Login successful');
        res.status(200).send({ success: true, message: 'Login successful' });
    } catch (err) {
        console.log('Error:', err.message);
        res.status(500).send({ success: false, message: 'An error occurred. Please try again.' });
    }
});

module.exports = router;
