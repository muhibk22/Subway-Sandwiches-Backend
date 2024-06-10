const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({

    customername: {
        type: String,
        required: [true,"Customer Name is Required."]
    },

    reviewDate:{
        type: Date,
        required: [true,"Review Date is Required."]
    },

    rating: {
        type: Number,
        required: [true,"Rating is Required."]
    },

    comment:{
        type: String,
        required: [true,"Comment is Required."]
    }
})

const Review = mongoose.model('Review',reviewSchema);
module.exports = {Review};