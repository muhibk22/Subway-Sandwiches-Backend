const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true,"Name is Required."]
    },

    category: {
        type: String,
        required: [true,"Category is Required."]
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
        required: [true,"Availability No is Required."]
    }
})

const Inventory = mongoose.model('Inventory',inventorySchema);
module.exports = {Inventory};