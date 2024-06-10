const mongoose = require('mongoose');

const dessertSchema = new mongoose.Schema({

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

const Dessert = mongoose.model('Dessert',dessertSchema);
module.exports = {Dessert};