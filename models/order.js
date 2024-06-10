const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({

    customername : {
        type: String,
        required: [true,"Customer Name is Required."]
    },

    orderDate : {
        type: Date,
        required: [true,"Order Date is Required."]
    },

    items:{
        type: [String],
        required: [true,"Items are Required."]
    },

    totalAmount :{
        type: Number,
        required: [true,"Total Amount  is Required."]
    },

    paymentMethod :{
        type: String,
        required: [true,"Payment Method is Required."]
    },

    DeliveryAddress:{
        type: String,
        required: [true,"Delivery Address is Required."]
    },

    promocode:{
        type: String,
        required: [true,"Promo Code is Required."]
    }
})

const Order = mongoose.model('Order',orderSchema);
module.exports = {Order};