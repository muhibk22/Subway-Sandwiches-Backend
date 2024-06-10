const router = require('express').Router();
const { Drink } = require('../models/drink');

router.post('/createdrink', async (req, res) => {
    try {
        const { name,type,price,availability } = req.body;
        if (!name || !type || !price || !availability) {
            return res.status(400).send({ message: 'Please Fill in all the Required Fields.' })
        }

        const drink = new Drink({
            name,type,price,availability
        })
        await drink.save();
        res.status(200).send({ message: 'Drink Data Submitted Successfully!!!' });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message })
    }
})

// GET route for fetching all bread
router.get('/viewdrinks', async (req, res) => {
    try {
        const drinks = await Drink.find();
        res.status(200).send(drinks);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// GET route for fetching a single bread by name
router.get('/viewdrink', async (req, res) => {
    try {
        const name = req.query.name;
        const drink = await Drink.findOne({ name: name });
        if (!drink) {
            return res.status(404).send({ message: 'Drink not found' });
        }
        res.status(200).send(drink);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// PUT route for updating bread by name
router.put('/updatedrink', async (req, res) => {
    try {
        const { name,type,price,availability } = req.body;
        const drink = await Drink.findOneAndUpdate(
            { name: name },
            { name,type,price,availability },
            { new: true, runValidators: true }
        );
        if (!drink) {
            return res.status(404).send({ message: 'Drink not found' });
        }
        res.status(200).send({ message: 'Drink updated successfully', drink });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// DELETE route for deleting bread by name
router.delete('/deletedrink', async (req, res) => {
    try {
        const drink = await Drink.findOneAndDelete({ name: req.query.name });
        if (!drink) {
            return res.status(404).send({ message: 'Drink not found' });
        }
        res.status(200).send({ message: 'Drink deleted successfully' });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

module.exports = router;