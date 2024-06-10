const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is Required."]
    },
    password: {
        type: String,
        required: [true, "Password is Required."]
    }
});

const Login = mongoose.model('Login', loginSchema);
module.exports = { Login };
