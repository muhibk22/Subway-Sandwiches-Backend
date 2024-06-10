const router = require('express').Router();
const { Sandwich } = require('../models/sandwich');

router.post('/createsandwich', async (req, res) => {
    try {
        const { name,price,availability } = req.body;
        if (!name || !price || !availability) {
            return res.status(400).send({ message: 'Please Fill in all the Required Fields.' })
        }

        const sandwich = new Sandwich({
            name,price,availability
        })
        await sandwich.save();
        res.status(200).send({ message: 'Sandwich Data Submitted Successfully!!!' });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message })
    }
})

// GET route for fetching all bread
router.get('/viewsandwich', async (req, res) => {
    try {
        const sandwichs = await Sandwich.find();
        res.status(200).send(sandwichs);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// GET route for fetching a single bread by name
router.get('/viewsandwiches', async (req, res) => {
    try {
        const name = req.query.name;
        const sandwich = await Sandwich.findOne({ name });
        if (!sandwich) {
            return res.status(404).send({ message: 'Sandwich not found' });
        }
        res.status(200).send(sandwich);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// PUT route for updating bread by name
router.put('/updatesandwich', async (req, res) => {
    try {
        const { name,price,availability } = req.body;
        const sandwich = await Sandwich.findOneAndUpdate(
            { name: name },
            { name,price,availability },
            { new: true, runValidators: true }
        );
        if (!sandwich) {
            return res.status(404).send({ message: 'Sandwich not found' });
        }
        res.status(200).send({ message: 'Sandwich updated successfully', sandwich });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// DELETE route for deleting bread by name
router.delete('/deletesandwich', async (req, res) => {
    try {
        const sandwich = await Sandwich.findOneAndDelete({ name: req.query.name });
        if (!sandwich) {
            return res.status(404).send({ message: 'Sandwich not found' });
        }
        res.status(200).send({ message: 'Sandwich deleted successfully' });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

module.exports = router;