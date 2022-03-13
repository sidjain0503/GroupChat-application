const asynchandler = require('express-async-handler');
const generateToken = require('../config/generatetoken');
const User = require('../Models/Users')

const registerUser = asynchandler(async(req,res)=>{
    const {name, email,password , pic } = req.body ; 
    if (!name||!email||!password){
        res.send(400);
        throw new Error("Please Enter all feilds.")
    }
    const userExists= await User.findOne({email});
    if (userExists){
        res.status(404);
        throw new Error("User already Exists")
    }
    const user = await User.create({
        name, 
        email,
        password,
        pic,
    })

    if(user){
        res.status(201).json({
            _id: user._id,
            name : user.name, 
            email : user.email,
            pic: user.pic,
            token: generateToken(user._id)
        })
    }
    else{
        res.status(400);
        throw new Error("Failed to create user.")
        
    }
})

const authUser = asynchandler(async(req,res)=>{

    const {email, password} = req.body;
    const user = await User.findOne({email});

    if(user && (await user.matchPassword(password))){
        res.status(201).json({
            _id: user._id,
            name : user.name, 
            email : user.email,
            pic: user.pic,
            token: generateToken(user._id)
        })
    }
    else{
        res.status(400);
        throw new Error("Invalid Email or password")
        
    }
})

//api/user?search=sid
const allUsers = asynchandler(async (req,res)=>{
const keyword = req.query.search ? {
    $or:[
        {name: {$regex: req.query.search , $options: "i"}},
        {email: {$regex: req.query.search , $options: "i"}}
    ]
}:{}

const users = await User.find(keyword).find({_id : {$ne:req.user.id}})
res.send(users)
})

module.exports = {registerUser,authUser,allUsers}

