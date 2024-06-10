const mongoose = require('mongoose');

const discountSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true,"Discount Name is Required."]
    },

    discount_percentage: {
        type: Number,
        required: [true,"Discount Percentage is Required."]
    },

    valid_from:{
        type: Date,
        required: [true,"Valid From Date is Required."]
    },

    valid_until:{
        type: Date,
        required: [true,"Valid Until Date is Required."]
    }
})

const Discount = mongoose.model('Discount',discountSchema);
module.exports = {Discount};