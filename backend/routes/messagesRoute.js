const express = require('express');
const router = express.Router();
const {getMessages,addMessage} = require('../controllers/messagesController');



router.post('/addmsg',addMessage)
router.get('/getmsg',getMessages)

module.exports = router; 