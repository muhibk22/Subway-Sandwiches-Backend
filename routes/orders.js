const router = require('express').Router();
const { Order } = require('../models/order');

router.post('/createorder', async (req, res) => {
    try {
        const { customername, orderDate, items, totalAmount, paymentMethod, DeliveryAddress, promocode } = req.body;
        if (!customername || !orderDate || !items || !totalAmount || !paymentMethod || !DeliveryAddress || !promocode) {
            return res.status(400).send({ message: 'Please Fill in all the Required Fields.' });
        }

        const order = new Order({
            customername, orderDate, items, totalAmount, paymentMethod, DeliveryAddress, promocode
        });
        await order.save();
        res.status(200).send({ message: 'Order Data Submitted Successfully!!!' });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

router.get('/vieworders', async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).send(orders);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

router.get('/vieworder', async (req, res) => {
    try {
        const order = await Order.findOne({ customername: req.params.customername });
        if (!order) {
            return res.status(404).send({ message: 'Order not found' });
        }
        res.status(200).send(order);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

router.put('/updateorder', async (req, res) => {
    try {
        const { customername, orderDate, items, totalAmount, paymentMethod, DeliveryAddress, promocode } = req.body;
        const order = await Order.findOneAndUpdate(
            { customername: req.params.customername },
            { customername, orderDate, items, totalAmount, paymentMethod, DeliveryAddress, promocode },
            { new: true, runValidators: true }
        );
        if (!order) {
            return res.status(404).send({ message: 'Order not found' });
        }
        res.status(200).send({ message: 'Order updated successfully', order });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

router.delete('/deleteorder', async (req, res) => {
    try {
        const order = await Order.findOneAndDelete({ customername: req.params.customername });
        if (!order) {
            return res.status(404).send({ message: 'Order not found' });
        }
        res.status(200).send({ message: 'Order deleted successfully' });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

module.exports = router;
