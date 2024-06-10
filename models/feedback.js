const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true,"Customer Name is Required."]
    },

    email: {
        type: String,
        required: [true,"Email is Required."]
    },

    phone: {
        type: Number,
        required: [true,"Phone No is Required."]
    },

    feedbackDate:{
        type: Date,
        required: [true,"Feedback Date is Required."]
    },

    comment:{
        type: String,
        required: [true,"Comment is Required."]
    }
})

const Feedback = mongoose.model('Feedback',feedbackSchema);
module.exports = {Feedback};