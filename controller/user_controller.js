const User = require('../models/user');
const Post = require('../models/post');

module.exports.profile = async function(req,res){
    try{

        let user_req = await User.findById(req.params.id);
        let post = await Post.find({user:user_req._id}).populate('user').populate({
            path:'comments',
            populate:{
                path: 'user'
            }
        });
        res.render('profile',{
            user_visited : user_req,
            posts :post
        });

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
module.exports.createSession =  function(req,res){
    try{ //it is authenticated via passport when route is being processed in user.js in routes
        return res.redirect('/');

    }catch(err){
        console.log("error in loading createSession method of user controller",err);

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
module.exports.update = async function(req,res){
    if (req.user.id == req.params.id) {
        try {
          
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req, res, function(err) {       
              if (err) {
                console.log("error in upladedAvatar of user", err);
              return err;
              }
              user.name = req.body.name;        
              user.email = req.body.email;
              if (req.file) {
                user.avatar = User.avatarPath + '/' + req.file.filename;
              }
              user.save();
              console.log(user.avatar);
            });
          
           return res.redirect("back");
        } catch (err) {
          console.log("error in update method of user controller of user", err);
          return res.redirect("back");
        }
      }else{
        console.log("unauthorized");
        return res.status(401).send("unauthorized");
      }

}




