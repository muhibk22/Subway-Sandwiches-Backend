const router = require('express').Router();
const { Review } = require('../models/review');

router.post('/createreview', async (req, res) => {
    try {
        const { customername,reviewDate,rating,comment } = req.body;
        if (!customername || !reviewDate || !rating || !comment) {
            return res.status(400).send({ message: 'Please Fill in all the Required Fields.' })
        }

        const review = new Review({
            customername,reviewDate,rating,comment 
        })
        await review.save();
        res.status(200).send({ message: 'Review Data Submitted Successfully!!!' });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message })
    }
})

// GET route for fetching all bread
router.get('/viewreview', async (req, res) => {
    try {
        const reviews = await Review.find();
        res.status(200).send(reviews);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// GET route for fetching a single bread by name
router.get('/viewreview', async (req, res) => {
    try {
        const customername = req.query.customername;
        const review = await Review.findOne({ customername});
        if (!review) {
            return res.status(404).send({ message: 'Review not found' });
        }
        res.status(200).send(review);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// PUT route for updating bread by name
router.put('/updatereview', async (req, res) => {
    try {
        const { customername,reviewDate,rating,comment } = req.body;
        const review = await Review.findOneAndUpdate(
            { customername: customername },
            { customername,reviewDate,rating,comment },
            { new: true, runValidators: true }
        );
        if (!review) {
            return res.status(404).send({ message: 'Review not found' });
        }
        res.status(200).send({ message: 'Review updated successfully', review });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// DELETE route for deleting bread by name
router.delete('/deletereview', async (req, res) => {
    try {
        const review = await Review.findOneAndDelete({ customername: req.query.customername });
        if (!review) {
            return res.status(404).send({ message: 'Review not found' });
        }
        res.status(200).send({ message: 'Review deleted successfully' });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

module.exports = router;