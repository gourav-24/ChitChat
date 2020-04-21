
// creating comment
module.exports.create = function(req,res){
    try{
        console.log("create new comment in db");

        return res.redirect('back');

    }catch(err){
        console.log("error in loading create method of post_controller",err);
        return res.redirect('back');

    }

}

// destroying comment
module.exports.destroy = function(req,res){
    try{
        console.log("destroy post using post id");
        
        return res.redirect('back');

    }catch(err){
        console.log("error in loading destroy method of post_controller",err);
        return res.redirect('back');

    }

}
