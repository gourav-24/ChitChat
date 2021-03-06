const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/uploads/users/avatar');


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required : true
    },
    email:{
        type:String,
        required:true,
        unique:true

    },
    password:{
        type:String,
        required:true
    },
    avatar:{
        type :String
    },
    about:{
        type : String
    },
    followers:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    
    following:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    chatRoomList:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'ChatRoom',
    }]

},{timestamps:true});


let Storage = multer.diskStorage({
    destination: function (req, file, cb) { 
      cb(null, path.join( __dirname,'..',AVATAR_PATH));
    },
    filename: function (req, file, cb) {        
      cb(null, file.fieldname + '-' + Date.now());
    }
});

userSchema.statics.uploadedAvatar = multer({storage : Storage}).single('avatar'); 
userSchema.statics.avatarPath =AVATAR_PATH;   



const User = mongoose.model('User',userSchema);
module.exports = User;