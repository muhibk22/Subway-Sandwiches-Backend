const router = require('express').Router();
const { Employee } = require('../models/employee');

router.post('/create', async (req, res) => {
    try {
        const { name, role, email, phone, address, hireDate, salary } = req.body;
        if (!name || !role || !email || !phone || !address || !hireDate || !salary) {
            return res.status(400).send({ message: 'Please Fill in all the Required Fields.' })
        }

        const employee = new Employee({
            name, role, email, phone, address, hireDate, salary
        })
        await employee.save();
        res.status(200).send({ message: 'Employee Data Submitted Successfully!!!' });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message })
    }
})

// GET route for fetching all bread
router.get('/viewemployees', async (req, res) => {
    try {
        
        const employees = await Employee.find();
        res.status(200).send(employees);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// GET route for fetching a single bread by name
router.get('/viewemployee', async (req, res) => {
    try {
        const name = req.query.name;
        const employee = await Employee.findOne({ name: name });
        if (!employee) {
            return res.status(404).send({ message: 'Customer not found' });
        }
        res.status(200).send(employee);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// PUT route for updating bread by name
router.put('/updateemployee', async (req, res) => {
    try {
        const { name, role, email, phone, address, hireDate, salary } = req.body;
        const employee = await Employee.findOneAndUpdate(
            { name: name },
            { name, role, email, phone, address, hireDate, salary },
            { new: true, runValidators: true }
        );
        if (!employee) {
            return res.status(404).send({ message: 'Employee not found' });
        }
        res.status(200).send({ message: 'Employee updated successfully', employee });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// DELETE route for deleting bread by name
router.delete('/deleteemployee', async (req, res) => {
    try {
        const employee = await Employee.findOneAndDelete({ name: req.query.name });
        if (!employee) {
            return res.status(404).send({ message: 'Employee not found' });
        }
        res.status(200).send({ message: 'Employee deleted successfully' });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

module.exports = router;