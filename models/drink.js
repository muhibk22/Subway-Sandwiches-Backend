const mongoose = require('mongoose');

const drinkSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true,"Name is Required."]
    },

    type: {
        type: String,
        required: [true,"type is Required."]
    },

    price:{
        type: Number,
        required: [true,"Price is Required."]
    },

    availability:{
        type: Boolean,
        required: [true,"Availability No is Required."]
    }
})

const Drink = mongoose.model('Drinks',drinkSchema);
module.exports = {Drink};