const router = require('express').Router();
const { Inventory } = require('../models/inventory');

router.post('/createinventory', async (req, res) => {
    try {
        const { name,category,quantity,price,availability } = req.body;
        if (!name || !category || !quantity || !price || !availability) {
            return res.status(400).send({ message: 'Please Fill in all the Required Fields.' })
        }

        const inventory = new Inventory({
            name,category,quantity,price,availability
        })
        await inventory.save();
        res.status(200).send({ message: 'Inventory Data Submitted Successfully!!!' });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message })
    }
})

// GET route for fetching all bread
router.get('/viewinventorys', async (req, res) => {
    try {
        const inventorys = await Inventory.find();
        res.status(200).send(inventorys);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// GET route for fetching a single bread by name
router.get('/viewinventory', async (req, res) => {
    try {
        const name = req.query.name;
        const inventory = await Inventory.findOne({ name });
        if (!inventory) {
            return res.status(404).send({ message: 'Inventory not found' });
        }
        res.status(200).send(inventory);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// PUT route for updating bread by name
router.put('/updateinventory', async (req, res) => {
    try {
        const { name,category,quantity,price,availability } = req.body;
        const inventory = await Inventory.findOneAndUpdate(
            { name: name },
            { name,category,quantity,price,availability },
            { new: true, runValidators: true }
        );
        if (!inventory) {
            return res.status(404).send({ message: 'Inventory not found' });
        }
        res.status(200).send({ message: 'Inventory updated successfully', inventory });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// DELETE route for deleting bread by name
router.delete('/deleteinventory', async (req, res) => {
    try {
        const inventory = await Inventory.findOneAndDelete({ name: req.query.name });
        if (!inventory) {
            return res.status(404).send({ message: 'Inventory not found' });
        }
        res.status(200).send({ message: 'Inventory deleted successfully' });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

module.exports = router;