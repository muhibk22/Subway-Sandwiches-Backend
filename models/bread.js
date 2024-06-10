const mongoose = require('mongoose');

const breadSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true,"Name is Required."]
    },

    type: {
        type: String,
        required: [true,"type is Required."]
    },
    
    quantity:{
        type: Number,
        required: [true,"Quantity is Required."]
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

const Bread = mongoose.model('Bread',breadSchema);
module.exports = {Bread};