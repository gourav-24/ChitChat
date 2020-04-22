const User = require('../models/user');

module.exports.profile = function(req,res){
    try{
        res.send('<h1>This is users profile page </h1>');

    }catch(err){
        console.log("error in loading profile controller",err);

    }

}

module.exports.Sign_up = function(req,res){
    try{
        if(req.isAuthenticated()){
            return res.redirect('/users/profile');
        }
        return res.render('sign_up');

    }catch(err){
        console.log("error in loading Sign Up controller",err);

    }

}

module.exports.Sign_In = function(req,res){
    try{
        if(req.isAuthenticated()){
            return res.redirect('/users/profile');
        }
        return res.render('sign_In');

    }catch(err){
        console.log("error in loading Sign In controller",err);

    }

}

//for creating new user
module.exports.create = function(req,res){
    try{
        if(req.body.password != req.body.conformPassword){
            return res.redirect('back');   
        }

        User.findOne({email:req.body.email},function(err,user){
            if(err){
                console.log('error in finding user in create method of user controller',err);
                return;
            }

            if(!user){
                User.create(req.body,function(err,user){
                    
                    if(err){
                        console.log('error in finding user in create method of user controller',err);
                    return;
                    }

                });
                return res.redirect('/users/sign-in');

            }else{
                return res.redirect('/users/sign-in');
            }

        });

    }catch(err){
        console.log("error in loading create method in user controller",err);
        return res.redirect('back');

    }

}

//creating session for user which is signing in
module.exports.createSession = async function(req,res){
    try{ //it is authenticated via passport when route is being processed in user.js in routes
        let user = await User.findOne({email :req.body.email});

        return res.redirect('/users/profile/'+user.id);

    }catch(err){
        console.log("error in loading createSession controller",err);

        return res.redirect('back');

    }

}

// logging out the user or destroying its session
module.exports.destroySession = function(req,res){
    try{
        req.logout(); // method by passport
        return res.redirect('/');

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




