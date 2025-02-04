const asyncHandler = require('express-async-handler');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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
        res.status(201).json({_id: user.id, phoneNumber: user.phoneNumber,})
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
    const{phoneNumber,password} = req.body;
    if (!phoneNumber || !password) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    const user = await User.findOne({phoneNumber});
    //compare password with hashedpassword
    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            user:{
                username: user.username,
                phoneNumber: user.phoneNumber,
                id: user.id,
            },
        }, process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "50m"}
    );
        res.status(200).json({ accessToken});
    }else{
        res.status(401)
        throw new Error("Invalid Credentials!!");
    }
});

//@desc Get current user
//@route GET /api/user/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user);
});

module.exports = { registerUser, loginUser, currentUser };
