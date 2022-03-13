const express= require('express')
const UserRouter= express.Router()
const {registerUser,authUser, allUsers} = require('../Controllers/UserController')
const {protect} = require('../middleware/authMiddleware')
const User = require('../Models/Users')

UserRouter.route("/").post(registerUser).get(protect,allUsers)
UserRouter.post('/login',authUser)
    

module.exports = UserRouter
