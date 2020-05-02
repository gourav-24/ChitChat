const mongoose = require ('mongoose');
const multer = require('multer');
const path = require('path');
const IMAGE_PATH = path.join('/uploads/posts/posts_imageOrPdf')
const postSchema =new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    picture:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Comment'
        }
    ],
    likes :[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref :'Like'
        }
    ]


    

},{timestamps:true});

let storage = multer.diskStorage({
    destination : function(req,file ,cb){
        cb(null,path.join(__dirname,'..',IMAGE_PATH));
    },

    filename:function(req,file,cb){
        cb(null,file.fieldname+'-'+Date.now());
    }
});


postSchema.statics.uploadedImage = multer({storage:storage}).single('picture');
postSchema.statics.imagePath = IMAGE_PATH;


const Post = mongoose.model('Post',postSchema);
module.exports =Post;