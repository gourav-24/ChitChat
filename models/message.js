const mongoose = require('mongoose');

const chatMessageSchema = new mongoose.Schema({
    message:String,
    messageType:{
        type : String
    },
    copyMsgID:{
        type:mongoose.Schema.Types.ObjectId,
        ref :"chatMessage"
    }

},{timestamps:true});


const chatMessage = mongoose.model('chatMessage',chatMessageSchema);
module.exports = chatMessage;

