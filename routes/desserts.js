const router = require('express').Router();
const { Dessert } = require('../models/dessert');

router.post('/createdessert', async (req, res) => {
    try {
        const { name,price,availability } = req.body;
        if (!name || !price || !availability) {
            return res.status(400).send({ message: 'Please Fill in all the Required Fields.' })
        }

        const dessert = new Dessert({
            name,price,availability
        })
        await dessert.save();
        res.status(200).send({ message: 'Dessert Data Submitted Successfully!!!' });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message })
    }
})

// GET route for fetching all bread
router.get('/viewdessert', async (req, res) => {
    try {
        const desserts = await Dessert.find();
        res.status(200).send(desserts);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// GET route for fetching a single bread by name
router.get('/viewdesserts', async (req, res) => {
    try {
        const name = req.query.name;
        const dessert = await Dessert.findOne({ name });
        if (!dessert) {
            return res.status(404).send({ message: 'Dessert not found' });
        }
        res.status(200).send(dessert);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// PUT route for updating bread by name
router.put('/updatedessert', async (req, res) => {
    try {
        const { name,price,availability } = req.body;
        const dessert = await Dessert.findOneAndUpdate(
            { name: name },
            { name,price,availability },
            { new: true, runValidators: true }
        );
        if (!dessert) {
            return res.status(404).send({ message: 'Dessert not found' });
        }
        res.status(200).send({ message: 'Dessert updated successfully', dessert });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// DELETE route for deleting bread by name
router.delete('/deletedessert', async (req, res) => {
    try {
        const dessert = await Dessert.findOneAndDelete({ name: req.query.name });
        if (!dessert) {
            return res.status(404).send({ message: 'Dessert not found' });
        }
        res.status(200).send({ message: 'Dessert deleted successfully' });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

module.exports = router;