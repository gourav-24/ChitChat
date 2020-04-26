const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

passport.use( new LocalStrategy({
    usernameField:'email',
    passReqToCallback:true
},function(email,password,done){
    User.findOne({email : email},function(err,user){
        if(err){
            console.log('error in finding user in passport',err);
            return done(err);
        }
        if(!user || user.password != password){
            console.log('Invalid user name or password');
            return done(null,false);
        }
        return done(null,user);
    });

}));

passport.serializeUser(function(user,done){
    return done(null,user.id);

});

passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log('error in deserializing user');
            return done(err);
        }
        return done(null,user);
    });

});

passport.checkAuthentication = function(req,res,next){
    if(req.isAuthenticated()){ //isAuthenticated is a fn by passport to detect if user is logged in 
        return next();

    }
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){   
        res.locals.user =req.user;  // here we are putting user in local object of res for future use since req is handeled by passport 
    
    }
    next();

}

module.exports = passport;