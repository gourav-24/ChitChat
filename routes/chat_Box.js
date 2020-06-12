const express = require('express');
const router = express.Router();
const chatBoxController = require('../controller/chatBoxController');

router.get('/',chatBoxController.chatBox);
router.get('/find',chatBoxController.find);

module.exports = router;