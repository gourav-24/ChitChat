const express = require('express');
const Route = express.Router();
const likeController = require('../controller/likes_controller');

Route.post('/toggle',likeController.toggleLike);

module.exports = Route;