const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please enter a Username!"]
    },
    phoneNumber:{
        type: String,
        required: [true, "Please enter your phone number!"],
        unique: [true, "Phone number is already in use."]
    },
    password:{
        type: String,
        required: [true, "Please enter the password."],
    },
},{
    timestamps: true,
}
);
 module.exports = mongoose.model("User", userSchema);