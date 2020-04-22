const passport =require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');
passport.use(new googleStrategy({
    clientID :"465922811237-fpsjo12qk2oi3p925eelbd405m35pksf.apps.googleusercontent.com",
    clientSecret:"u4kQxDr69hkwxWO6BGw4_49Y",
    callbackURL:"http://localhost:8000/users/auth/google/callback"
},function(accessToken,refreshToken,profile,done){
    User.findOne({email:profile.emails[0].value}).exec(function(err,user){
        if(err){
            console.log("error in finding user in passport-google-oauth-2-strategy in config",err);
            return;
        }
        if(user){
            return done(null,user);
            
        }else{
            User.create({
                name:profile.displayName,
                email:profile.emails[0].value,
                password:crypto.randomBytes(20).toString('hex')
            },function(err,user){
                if(err){
                    console.log("error in creting user in passport-google-oauth2-strategy");
                    return;
                }
                return done(null,user);


            });
        }
    });



}

));

module.exports = passport;