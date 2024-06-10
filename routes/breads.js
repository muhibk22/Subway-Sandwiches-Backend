const router = require('express').Router();
const { Bread } = require('../models/bread');

router.post('/createbread', async (req, res) => {
    try {
        const { name,type,quantity,price,availability } = req.body;
        if (!name || !type || !quantity || !price || !availability) {
            return res.status(400).send({ message: 'Please Fill in all the Required Fields.' })
        }

        const bread = new Bread({
            name,type,quantity,price,availability
        })
        await bread.save();
        res.status(200).send({ message: 'Bread Data Submitted Successfully!!!' });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message })
    }
})

// GET route for fetching all bread
router.get('/viewbreads', async (req, res) => {
    try {
        const breads = await Bread.find();
        res.status(200).send(breads);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// GET route for fetching a single bread by name
router.get('/viewbread', async (req, res) => {
    try {
        const name = req.query.name;
        const bread = await Bread.findOne({ name });
        if (!bread) {
            return res.status(404).send({ message: 'Bread not found' });
        }
        res.status(200).send(bread);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// PUT route for updating bread by name
router.put('/updatebread', async (req, res) => {
    try {
        const { name, type, quantity, price, availability } = req.body;
        const bread = await Bread.findOneAndUpdate(
            { name: name },
            { name, type, quantity, price, availability },
            { new: true, runValidators: true }
        );
        if (!bread) {
            return res.status(404).send({ message: 'Bread not found' });
        }
        res.status(200).send({ message: 'Bread updated successfully', bread });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// DELETE route for deleting bread by name
router.delete('/deletebread', async (req, res) => {
    try {
        const bread = await Bread.findOneAndDelete({ name: req.query.name });
        if (!bread) {
            return res.status(404).send({ message: 'Bread not found' });
        }
        res.status(200).send({ message: 'Bread deleted successfully' });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

module.exports = router;