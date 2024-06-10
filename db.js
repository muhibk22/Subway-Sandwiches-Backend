const mongoose = require('mongoose');

module.exports = () => {
    const parameter = {
        useNewUrlParser : true,
        useUnifiedTopology : true
    }
    try {
        mongoose.connect(process.env.MONGODB_URL, parameter)
        console.log("Connected to DataBase.")

    }
    catch{
        console.log("Couldnot connect to Database.")
    }
}