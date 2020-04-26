const Post = require('../models/post');
const Comment =require('../models/comment');
// create a new comment 
module.exports.create = async function(req,res){
    try{
        
        let post = await Post.findById(req.body.id);
        if(post){
          let comment = await Comment.create({
                content:req.body.content,
                user :req.user._id,
                Post: post._id
            });
            post.comments.push(comment);
            post.save();
            return res.redirect('back');
        }



        return res.redirect('back');

    }catch(err){
        console.log("error in loading create method of comment controller",err);
        return res.redirect('back');

    }

}
module.exports.destroy = async function(req,res){
    try{
        let comment = await Comment.findById(req.params.id);
        let post = await Post.findById(comment.Post);
        if((comment.user == req.user.id) || (post.user == req.user.id)){  
            let postid = comment.Post;  
            comment.remove();

            Post.findById(postid ,{$pull :{comment : req.params.id}});
            return res.redirect('back');
            

        }else{
            return res.redirect('back');
        }
        
        
    }catch(err){
        console.log("error in loading destroy method of comment controller",err);
        return res.redirect('back');
    }

}
