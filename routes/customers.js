const router = require('express').Router();
const { Customer } = require('../models/customer');

router.post('/createcustomer', async (req, res) => {
    try {
        const { name, email, phone, address, registrationDate, loyaltyPoints } = req.body;
        if (!name || !email || !phone || !address || !registrationDate || !loyaltyPoints) {
            return res.status(400).send({ message: 'Please Fill in all the Required Fields.' })
        }

        const customer = new Customer({
            name, email, phone, address, registrationDate, loyaltyPoints
        })
        await customer.save();
        res.status(200).send({ message: 'Customer Data Submitted Successfully!!!' });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message })
    }
})

// GET route for fetching all bread
router.get('/viewcustomers', async (req, res) => {
    try {
        const customers = await Customer.find();
        res.status(200).send(customers);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// GET route for fetching a single bread by name
router.get('/viewcustomer', async (req, res) => {
    try {
        const name = req.query.name;
        const customer = await Customer.findOne({ name });
        if (!customer) {
            return res.status(404).send({ message: 'Customer not found' });
        }
        res.status(200).send(customer);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// PUT route for updating bread by name
router.put('/updatecustomer', async (req, res) => {
    try {
        const { name,email, phone, address, registrationDate, loyaltyPoints } = req.body;
        const customer = await Customer.findOneAndUpdate(
            { name: name },
            { name,email, phone, address, registrationDate, loyaltyPoints },
            { new: true, runValidators: true }
        );
        if (!customer) {
            return res.status(404).send({ message: 'Customer not found' });
        }
        res.status(200).send({ message: 'Customer updated successfully', customer });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// DELETE route for deleting bread by name
router.delete('/deletecustomer', async (req, res) => {
    try {
        const customer = await Customer.findOneAndDelete({ name: req.query.name });
        if (!customer) {
            return res.status(404).send({ message: 'Customer not found' });
        }
        res.status(200).send({ message: 'Customers deleted successfully' });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});
module.exports = router;