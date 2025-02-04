const asyncHandler = require('express-async-handler');
const bcrypt = require("bcrypt");
const User = require('../models/userModel');

//@desc Register a user
//@route POST /api/user/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
    const {username, phoneNumber, password} = req.body;
    if (!username || !phoneNumber || !password){
        res.status(400);s
        throw new Error("All fields are mandatory");
    }
    const userAvailable = await User.findOne({phoneNumber});
    if (userAvailable) {
        res.status(400);
        throw new Error("Phone Number is already in use");
    }

    //Hash password 
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Passwords;",hashedPassword);
    const user = await User.create({
        username,
        phoneNumber,
        password: hashedPassword,
    });

    console.log(`User created ${user}`)
    if (user) {
        res.status(201).json({_id: user.id, phoneNumber: user.id,})
    }else{
        res.status(400);
        throw new Error("User data is not valid");
        
    }
    res.json({ message: "Register the user" });

});

//@desc Login user
//@route POST /api/user/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
    res.json({ message: "Login user" });
});

//@desc Get current user
//@route GET /api/user/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
    res.json({ message: "Current user information" });
});

module.exports = { registerUser, loginUser, currentUser };
