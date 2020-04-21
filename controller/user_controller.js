module.exports.profile = function(req,res){
    try{
        res.send('<h1>This is users profile page </h1>');

    }catch(err){
        console.log("error in loading profile controller",err);

    }

}

module.exports.Sign_up = function(req,res){
    try{
        res.send('<h1>This is Sign Up page </h1>');

    }catch(err){
        console.log("error in loading Sign Up controller",err);

    }

}

module.exports.Sign_In = function(req,res){
    try{
        res.send('<h1>This is Sign In page </h1>');

    }catch(err){
        console.log("error in loading Sign In controller",err);

    }

}

//for creating new user
module.exports.create = function(req,res){
    try{
        console.log("Please create new user in DB");

        return res.redirect('back');

    }catch(err){
        console.log("error in loading create user controller",err);
        return res.redirect('back');

    }

}

//creating session for user which is signing in
module.exports.createSession = function(req,res){
    try{
        console.log("when user gets authenticated redirect it to users/profile and render their data");

    }catch(err){
        console.log("error in loading createSession controller",err);

        return res.redirect('back');

    }

}

// logging out the user or destroying its session
module.exports.destroySession = function(req,res){
    try{
        console.log("log out the user using passpsrt js and redirect the user to sign in page");

    }catch(err){
        console.log("error in loading destroySession controller",err);
        return res.redirect('back');

    }

}

//updating avatar of user
module.exports.update = function(req,res){
    try{
        console.log("update avatar file link to user model");
        
        
        return res.redirect('back');

    }catch(err){
        console.log("error in loading profile controller",err);
        return res.redirect('back');

    }

}




