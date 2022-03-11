const asynchandler = require('express-async-handler')
const req = require('express/lib/request')
const res = require('express/lib/response')
const Chat = require("../Models/Chat")
const User = require('../Models/Users')

const AccessChat = asynchandler(async (req, res)=>{
    const {userid} = req.body
    console.log(req.body)

    if(!userid){
        console.log("UserId params is not send to the request")
        return res.sendStatus(400);
    }

    var isChat = await Chat.find({
        isGroupChat : false,
        $and:[
            {users:{$elemMatch:{$eq:req.user.id}}},
            {users:{$elemMatch:{$eq: userid}}}
        ]
    }).populate('users','-password').populate('latestMessage')

    isChat = await User.populate(isChat,{
        path: "latestMessage.sender",
        select:"name pic email"
    })

    if(isChat.length>0){
        res.send(isChat[0])
    }else{
        var chatData = {
            chatName: "sender",
            isGroupChat: false,
            users:[req.user._id,userid]
        }

        try {
            const createdChat = await Chat.create(chatData)
            const fullChat = await Chat.findOne({_id:createdChat._id}).populate('users','-password');
            res.status(200).send(fullChat)

        } catch (error) {
            res.status(400);
            throw new Error (error.message)
        }
    }
})


module.exports = {AccessChat};