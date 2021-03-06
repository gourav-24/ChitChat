const Post =require('../models/post');
const Like = require('../models/likes');
const Comment = require('../models/comment');

// creating post
module.exports.create = async function(req,res){
    try{

        Post.uploadedImage(req,res,function(err){
            if(err){
                console.log('error in uploading imag/Pdf of posts',err);
                return;
            }

            Post.create({
                content: req.body.content,
                user: req.user._id,
                picture: Post.imagePath +'/'+ req.file.filename
            });




        });

        return res.redirect('back');

    }catch(err){
        console.log("error in loading create method of post_controller",err);
        return res.redirect('back');

    }

}

// destroying post
module.exports.destroy = async function(req,res){
    try{
        let post = await Post.findById(req.params.id);
        if(post.user == req.user.id){
            await Like.deleteMany({likeable:post,onModel:'Post'});
            await Like.deleteMany({_id : {$in : post.comments}});
            post.remove();
            await Comment.deleteMany({post:req.params.id});
            return res.redirect('back');
        }
        return res.redirect('back');

    }catch(err){
        console.log("error in loading destroy method of post_controller",err);
        return res.redirect('back');
    }

}
