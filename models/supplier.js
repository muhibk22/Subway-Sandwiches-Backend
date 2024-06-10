const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: [true, "Supplier name is required."]
    },
    contact_name: {
        type: String,
        required: [true, "Contact name is required."]
    },
    phone: {
        type: String,
        required: [true, "Phone number is required."]
    },
    email: {
        type: String,
        required: [true, "Email is required."]
    },
    address: {
        type: String,
        required: [true, "Address is required."]
    },
    supplied_items: {
        type: [String],
        required: [true, "Supplied items are required."]
    }
});

const Supplier = mongoose.model('Supplier', supplierSchema);
module.exports = { Supplier };
