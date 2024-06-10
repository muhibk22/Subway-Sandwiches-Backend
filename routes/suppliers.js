const router = require('express').Router();
const { Supplier } = require('../models/supplier');

router.post('/createsupplier', async (req, res) => {
    try {
        const { name, contact_name, phone, email, address, supplied_items} = req.body;
        if (!name || !contact_name || !phone || !email || !address || !supplied_items) {
            return res.status(400).send({ message: 'Please Fill in all the Required Fields.' })
        }

        const supplier = new Supplier({
            name, contact_name, phone, email, address, supplied_items
        })
        await supplier.save();
        res.status(200).send({ message: 'Supplier Data Submitted Successfully!!!' });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message })
    }
})

// GET route for fetching all bread
router.get('/viewsuppliers', async (req, res) => {
    try {
        const suppliers = await Supplier.find();
        res.status(200).send(suppliers);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// GET route for fetching a single bread by name
router.get('/viewsupplier', async (req, res) => {
    try {
        const name = req.query.name;
        const supplier = await Supplier.findOne({ name: name });
        if (!supplier) {
            return res.status(404).send({ message: 'Supplier not found' });
        }
        res.status(200).send(supplier);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// PUT route for updating bread by name
router.put('/updatesupplier', async (req, res) => {
    try {
        const { name, contact_name, phone, email, address, supplied_items } = req.body;
        const supplier = await Supplier.findOneAndUpdate(
            { name: name },
            { name, contact_name, phone, email, address, supplied_items },
            { new: true, runValidators: true }
        );
        if (!supplier) {
            return res.status(404).send({ message: 'Supplier not found' });
        }
        res.status(200).send({ message: 'Supplier updated successfully', supplier });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// DELETE route for deleting bread by name
router.delete('/deletesupplier', async (req, res) => {
    try {
        const supplier = await Supplier.findOneAndDelete({ name: req.query.name });
        if (!supplier) {
            return res.status(404).send({ message: 'Supplier not found' });
        }
        res.status(200).send({ message: 'Supplier deleted successfully' });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

module.exports = router;