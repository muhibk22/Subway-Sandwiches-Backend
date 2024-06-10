const router = require('express').Router();
const { Discount } = require('../models/discount');

router.post('/creatediscount', async (req, res) => {
    try {
        const { name,discount_percentage,valid_from,valid_until} = req.body;
        if (!name || !discount_percentage || !valid_from || !valid_until) {
            return res.status(400).send({ message: 'Please Fill in all the Required Fields.' })
        }

        const discount = new Discount({
            name,discount_percentage,valid_from,valid_until
        })
        await discount.save();
        res.status(200).send({ message: 'Discount Data Submitted Successfully!!!' });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message })
    }
})

// GET route for fetching all bread
router.get('/viewdiscounts', async (req, res) => {
    try {
        const discounts = await Discount.find();
        res.status(200).send(discounts);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// GET route for fetching a single bread by name
router.get('/viewdiscount', async (req, res) => {
    try {
        const name = req.query.name;
        const discount = await Discount.findOne({ name: name });
        if (!discount) {
            return res.status(404).send({ message: 'Discount not found' });
        }
        res.status(200).send(discount);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// PUT route for updating bread by name
router.put('/updatediscount', async (req, res) => {
    try {
        const { name,discount_percentage,valid_from,valid_until } = req.body;
        const discount = await Discount.findOneAndUpdate(
            { name: name },
            { name,discount_percentage,valid_from,valid_until },
            { new: true, runValidators: true }
        );
        if (!discount) {
            return res.status(404).send({ message: 'Discount not found' });
        }
        res.status(200).send({ message: 'Discount updated successfully', discount });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// DELETE route for deleting bread by name
router.delete('/deletediscount', async (req, res) => {
    try {
        const discount = await Discount.findOneAndDelete({ name: req.query.name });
        if (!discount) {
            return res.status(404).send({ message: 'Discount not found' });
        }
        res.status(200).send({ message: 'Discount deleted successfully' });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

module.exports = router;