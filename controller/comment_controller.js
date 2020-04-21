
// create a new comment 
module.exports.create = function(req,res){
    try{
        console.log("create a new comment");

        return res.redirect('back');

    }catch(err){
        console.log("error in loading create method of comment controller",err);
        return res.redirect('back');

    }

}
module.exports.destroy = function(req,res){
    try{
        console.log("destroy the comment using comment id");

        return res.redirect('back');

    }catch(err){
        console.log("error in loading destroy method of comment controller",err);
        return res.redirect('back');
    }

}
