const express = require('express');
const { sendMessage } = require('../Controllers/MessageController');
const MessageRouter = express.Router();
const {protect} =require('../middleware/authMiddleware')

MessageRouter.route("/").post(protect,sendMessage)
// MessageRouter.route("/:chatId").get(protect,allMessages)

module.exports = MessageRouter