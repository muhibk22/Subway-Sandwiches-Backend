const mongoose = require('mongoose');

const saladSchema = new mongoose.Schema({

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

const Salad = mongoose.model('Salad',saladSchema);
module.exports = {Salad};