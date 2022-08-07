const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
    cityname: {
        type: String,
        notEmpty: true,
        errorMessage: "This field cannot be empty"
       
      
    },
    date: String,
    time: String

});

const requestModal = mongoose.model("myrequest", requestSchema);

module.exports = requestModal;