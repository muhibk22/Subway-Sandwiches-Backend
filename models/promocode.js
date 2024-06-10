const mongoose = require('mongoose');

const promocodeSchema = new mongoose.Schema({

    promo_code: {
        type: String,
        required: [true,"Promo Code is Required."]
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
    },

    usage_limit:{
        type: Number,
        required: [true,"Usage Limit is Required."]
    }
})

const PromoCode = mongoose.model('Promo Code',promocodeSchema);
module.exports = {PromoCode};