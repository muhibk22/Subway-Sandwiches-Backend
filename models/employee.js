const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true,"Frist Name is Required."]
    },

    role:{
        type: String,
        required: [true,"Role is Required."]
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

    hireDate:{
        type: Date,
        required: [true,"Hire Date is Required."]
    },

    salary:{
        type: Number,
        required: [true,"Salary is Required."]
    }
})

const Employee = mongoose.model('Employee',employeeSchema);
module.exports = {Employee};