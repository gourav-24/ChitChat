const express =require('express');
const router = express.Router();

const PostController = require('../controller/post_controller');

router.post('/create',PostController.create); 
router.get('/destroy/:id' , PostController.destroy);

module.exports =router;