const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true,"Name is Required."]
    },

    email:{
        type: String,
        required: [true,"Email is Required."]
    },

    phone:{
        type: Number,
        required: [true,"Phone No is Required."]
    },

    address:{
        type: String,
        required: [true,"Address is Required."]
    },

    registrationDate:{
        type: Date,
        required: [true,"Registration Date is Required."]
    },

    loyaltyPoints:{
        type: Number,
        required: [true,"Loyalty Points is Required."]
    }
})

const Customer = mongoose.model('Customer',customerSchema);
module.exports = {Customer};