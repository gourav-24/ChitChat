const Post =require('../models/post');

// creating post
module.exports.create =  function(req,res){
    try{

        Post.uploadedImage(req,res,function(err){
            if(err){
                console.log('error in uploading imag/Pdf of posts',err);
                return;
            }
             Post.create({
                content: req.body.content,
                user: req.body.user_id,
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
            post.remove();
            return res.redirect('back');
        }
        return res.redirect('back');

    }catch(err){
        console.log("error in loading destroy method of post_controller",err);
        return res.redirect('back');
    }

}
