const router = require('express').Router();
const { Feedback } = require('../models/feedback');

router.post('/createfeedback', async (req, res) => {
    try {
        const { name,email,phone,feedbackDate,comment } = req.body;
        if (!name || !email || !phone || !feedbackDate || !comment) {
            return res.status(400).send({ message: 'Please Fill in all the Required Fields.' })
        }

        const feedback = new Feedback({
            name,email,phone,feedbackDate,comment 
        })
        await feedback.save();
        res.status(200).send({ message: 'Feedback Data Submitted Successfully!!!' });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message })
    }
})
// GET route for fetching all bread
router.get('/viewfeedbacks', async (req, res) => {
    try {
        const feedbacks = await Feedback.find();
        res.status(200).send(feedbacks);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// GET route for fetching a single bread by name
router.get('/viewfeedback', async (req, res) => {
    try {
        const name = req.query.name;
        const feedback = await Feedback.findOne({ name });
        if (!feedback) {
            return res.status(404).send({ message: 'Feedback not found' });
        }
        res.status(200).send(feedback);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// PUT route for updating bread by name
router.put('/updatefeedback', async (req, res) => {
    try {
        const { name,email,phone,feedbackDate,comment } = req.body;
        const feedback = await Feedback.findOneAndUpdate(
            { name: name },
            {  name,email,phone,feedbackDate,comment },
            { new: true, runValidators: true }
        );
        if (!feedback) {
            return res.status(404).send({ message: 'Feedback not found' });
        }
        res.status(200).send({ message: 'Feedback updated successfully', feedback });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// DELETE route for deleting bread by name
router.delete('/deletefeedback', async (req, res) => {
    try {
        const feedback = await Feedback.findOneAndDelete({ name: req.query.name });
        if (!feedback) {
            return res.status(404).send({ message: 'Feedback not found' });
        }
        res.status(200).send({ message: 'Feedback deleted successfully' });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

module.exports = router;