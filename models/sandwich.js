const mongoose = require('mongoose');

const sandwichSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true,"Name is Required."]
    },

    price:{
        type: Number,
        required: [true,"Price is Required."]
    },

    availability:{
        type: Boolean,
        required: [true,"Availability is Required."]
    }
})

const Sandwich = mongoose.model('Sandwich',sandwichSchema);
module.exports = {Sandwich};