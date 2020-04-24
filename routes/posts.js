const express =require('express');
const router = express.Router();
const passport = require('passport');

const PostController = require('../controller/post_controller');

router.post('/create',passport.checkAuthentication ,PostController.create); 
router.get('/destroy/:id' , PostController.destroy);

module.exports =router;