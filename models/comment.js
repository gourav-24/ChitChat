const mongoose = require('mongoose');
const commmentSchema = new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    Post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post'
    },
    likes : [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref :'Like'

        }
    
    ]

    
},{timestamps:true});

const Comment = mongoose.model('Comment',commmentSchema);
module.exports = Comment;
