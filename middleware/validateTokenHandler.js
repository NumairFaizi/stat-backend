const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async(req, res, next) => {

    // console.log(req)
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];

        console.log(token)
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded)=>{
            if (err) {
                res.status(401);
                throw new Error("Unauthorized access");
            }
            req.user = decoded.user;
            next();
        });

        if (!token) {
            res.status(401);
            throw new Error("Unauthorized access!!");
            
        }
    }
});
module.exports = validateToken;