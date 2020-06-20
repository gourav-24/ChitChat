const express = require('express');
const router = express.Router();
const chatBoxController = require('../controller/chatBoxController');
const passport = require('passport');

router.get('/',chatBoxController.chatBox);
router.get('/find',chatBoxController.find);
router.get('/deleteChat/:id',passport.checkAuthentication,chatBoxController.deleteChat);
router.get('/deleteMessage',passport.checkAuthentication,chatBoxController.deleteMessage);


module.exports = router;