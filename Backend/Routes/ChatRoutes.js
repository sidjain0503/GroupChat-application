const express= require('express')
const { AccessChat, fetchChat, CreateGroupChat,RenameGroupChat, addtoGroup ,removeFromGroup} = require('../Controllers/ChatControllers')
const { protect } = require('../middleware/authMiddleware')
const ChatRoutes= express.Router()

ChatRoutes.route('/').post(protect,AccessChat)
ChatRoutes.route('/').get(protect,fetchChat)
ChatRoutes.route('/group').post(protect,CreateGroupChat)
ChatRoutes.route('/rename').put(protect,RenameGroupChat)
ChatRoutes.route('/removegroup').put(protect, removeFromGroup)
ChatRoutes.route('/groupadd').put(protect,addtoGroup)




module.exports = ChatRoutes
