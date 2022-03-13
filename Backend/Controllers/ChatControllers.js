const asynchandler = require('express-async-handler')
const req = require('express/lib/request')
const res = require('express/lib/response')
const { add } = require('nodemon/lib/rules')
const Chat = require("../Models/Chat")
const User = require('../Models/Users')

const AccessChat = asynchandler(async (req, res)=>{
    const {userId} = req.body
    console.log()
    // res.send(userId)

    if(!userId){
        console.log("UserId params is not send to the request")
        return res.sendStatus(400);
    }

    var isChat = await Chat.find({
        isGroupChat : false,
        $and:[
            {users:{$elemMatch:{$eq:req.user._id}}},
            {users:{$elemMatch:{$eq: userId}}}
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
            users:[req.user._id,userId]
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

const fetchChat = asynchandler(async (req,res)=>{
        try {
            Chat.find({users:{$elemMatch:{$eq:req.user._id}}})
            .populate("users","-password")
            .populate("groupAdmin","-password")
            .populate("latestMessage")
            .sort({updatedAt : -1 })
            .then(async (results)=>{
                results = await User.populate(results,{
                    path: "latestMessage.sender",
                    select:"name pic email"
                })
                res.status(200).send(results)
            })
            
        } catch (error) {
            res.status(400);
            throw new Error (error.message)
        }
})

const CreateGroupChat = asynchandler(async (req,res)=>{
    if(!req.body.users||!req.body.name){
        return res.status(400).send({message:"Please fill all the Feilds"})
    }
        var users = JSON.parse(req.body.users);

        if(users.length<2){
        return res.status(400).send({message:"More than two users required to form a group"})

        }

        users.push(req.user);//to add the currently logged in user into the group

        try {
            const groupChat = await Chat.create({
                chatName:req.body.name,
                users:users,
                isGroupChat:true,
                groupAdmin: req.user

            })

            const fullGroupChat = await Chat.findOne({_id: groupChat._id})
            .populate("users","-password")
            .populate("groupAdmin","-password")

            res.status(200).json(fullGroupChat)
        } catch (error) {
            res.status(400);
            throw new Error(error.message)
        }
})



const RenameGroupChat = asynchandler(async (req,res)=>{

    const {chatId , chatName } = req.body;
    const UpdatedChat = await Chat.findByIdAndUpdate(chatId,{
        chatName 
    },
    {new : true }
    
    ).populate("users","-password")
    .populate("groupAdmin","-password")
    
    

    if(!UpdatedChat){
        res.status(400);
        throw new Error("Chat not Found");
    }else{
        res.json(UpdatedChat);
    }

})

const addtoGroup = asynchandler(async (req,res)=>{
    const {chatId , userId} =req.body;
    const added = Chat.findByIdAndUpdate(chatId,{
        $push: {users: userId},
       
    },
    {new: true }
    )
    .populate("users","-password")
    .populate("groupAdmin","-password")

    if(!added){
        res.status(400);
        throw new Error("Chat not Found");
    }else{
        res.json(added);
    }
})

const removeFromGroup = asynchandler(async (req,res)=>{
    const {chatId , userId} =req.body;
    const added = Chat.findByIdAndUpdate(chatId,{
        $pull: {users: userId},
       
    },
    {new: true }
    )
    .populate("users","-password")
    .populate("groupAdmin","-password")

    if(!added){
        res.status(400);
        throw new Error("Chat not Found");
    }else{
        res.json(added);
    }
})


module.exports = {AccessChat,fetchChat,CreateGroupChat,RenameGroupChat,addtoGroup,removeFromGroup};