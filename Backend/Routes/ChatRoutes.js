const express= require('express')
const { AccessChat } = require('../Controllers/ChatControllers')
const ChatRoutes= express.Router()

ChatRoutes.route('/').post(AccessChat)
// ChatRoutes.route('/').get(fetchChat)
// ChatRoutes.route('/group').post(CreateGroupChat)
// ChatRoutes.route('/rename').put(RenameChat)
// ChatRoutes.route('/removegroup').put(removeFromGroup)
// ChatRoutes.route('/groupadd').put(addtoGroup)




module.exports = ChatRoutes
