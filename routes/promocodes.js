const router = require('express').Router();
const { PromoCode } = require('../models/promocode');

router.post('/createpromocode', async (req, res) => {
    try {
        const { promo_code,discount_percentage,valid_from,valid_until,usage_limit } = req.body;
        if (!promo_code || !discount_percentage || !valid_from || !valid_until || !usage_limit) {
            return res.status(400).send({ message: 'Please Fill in all the Required Fields.' })
        }

        const promocode = new PromoCode({
            promo_code,discount_percentage,valid_from,valid_until,usage_limit
        })
        await promocode.save();
        res.status(200).send({ message: 'Promo Code Data Submitted Successfully!!!' });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message })
    }
})

// GET route for fetching all bread
router.get('/viewpromocode', async (req, res) => {
    try {
        const promocodes = await PromoCode.find();
        res.status(200).send(promocodes);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// GET route for fetching a single bread by name
router.get('/viewpromocodes', async (req, res) => {
    try {
        const promo_code = req.query.promo_code;
        const promocode = await PromoCode.findOne({ promo_code: promo_code });
        if (!promocode) {
            return res.status(404).send({ message: 'Promocode not found' });
        }
        res.status(200).send(promocode);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// PUT route for updating bread by name
router.put('/updatepromocode', async (req, res) => {
    try {
        const { promo_code,discount_percentage,valid_from,valid_until,usage_limit } = req.body;
        const promocode = await PromoCode.findOneAndUpdate(
            { promo_code: promo_code },
            { promo_code,discount_percentage,valid_from,valid_until,usage_limit },
            { new: true, runValidators: true }
        );
        if (!promocode) {
            return res.status(404).send({ message: 'Promocode not found' });
        }
        res.status(200).send({ message: 'Promocode updated successfully', promocode });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// DELETE route for deleting bread by name
router.delete('/deletepromocode', async (req, res) => {
    try {
        const promocode = await PromoCode.findOneAndDelete({ promo_code: req.query.promo_code });
        if (!promocode) {
            return res.status(404).send({ message: 'Promocode not found' });
        }
        res.status(200).send({ message: 'Promocode deleted successfully' });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

module.exports = router;