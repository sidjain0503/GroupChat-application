const jwt = require('jsonwebtoken')
const User = require('../Models/Users')
const asynchandler = require('express-async-handler');
const req = require('express/lib/request');
const res = require('express/lib/response');

const protect = asynchandler(async (req,res,next)=>{})

let token ; 
if (
    req.headers.authorization && 
    req.headers.authorization.startswith("Bearer")
){
    try{
        token = req.headers.authorization.split(" ")[1];
        //decodes the token 
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user= await = User.findById(decoded.id).select("-password")

        next();

    }catch(error){
        res.status(401);
        throw new Error("Not authorized, token failed ")
        
    }
    if(!token){
        res.status(401);
        throw new Error("Not authorized, no token  ")
    }
}


module.exports = {protect}