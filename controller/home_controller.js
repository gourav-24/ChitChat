const User = require('../models/user'); 
const Post = require('../models/post');
const Like = require('../models/likes');


module.exports.home = async function(req, res){
    try{
        let posts = await Post.find({}).sort('-createdAt').populate('user').populate({
            path:'comments',
            populate:{
                path: 'user'
            },
            populate:{
                path:'likes'
            }
        }).populate('likes');

        return res.render('home',{
            posts : posts,
            title : 'Home'
        });

    }catch(err){
        console.log('error in loading home controller');

    }

}