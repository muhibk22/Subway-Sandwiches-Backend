const router = require('express').Router();
const { Salad } = require('../models/salad');

router.post('/createsalad', async (req, res) => {
    try {
        const { name,price,availability } = req.body;
        if (!name || !price || !availability) {
            return res.status(400).send({ message: 'Please Fill in all the Required Fields.' })
        }

        const salad = new Salad({
            name,price,availability
        })
        await salad.save();
        res.status(200).send({ message: 'Salad Data Submitted Successfully!!!' });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message })
    }
})

// GET route for fetching all bread
router.get('/viewsalads', async (req, res) => {
    try {
        const salads = await Salad.find();
        res.status(200).send(salads);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// GET route for fetching a single bread by name
router.get('/viewsalad', async (req, res) => {
    try {
        const name = req.query.name;
        const salad = await Salad.findOne({ name: name });
        if (!salad) {
            return res.status(404).send({ message: 'Salad not found' });
        }
        res.status(200).send(salad);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// PUT route for updating bread by name
router.put('/updatesalad', async (req, res) => {
    try {
        const { name,price,availability} = req.body;
        const salad = await Salad.findOneAndUpdate(
            { name: name },
            { name,price,availability },
            { new: true, runValidators: true }
        );
        if (!salad) {
            return res.status(404).send({ message: 'Salad not found' });
        }
        res.status(200).send({ message: 'Salad updated successfully', salad });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// DELETE route for deleting bread by name
router.delete('/deletesalad', async (req, res) => {
    try {
        const salad = await Salad.findOneAndDelete({ name: req.query.name });
        if (!salad) {
            return res.status(404).send({ message: 'Salad not found' });
        }
        res.status(200).send({ message: 'Salad deleted successfully' });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

module.exports = router;