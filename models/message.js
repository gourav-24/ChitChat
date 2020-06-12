const mongoose = require('mongoose');

const chatMessageSchema = new mongoose.Schema({
    message:String,
    messageType:{
        type : String,
        required:true
    }
        

    


},{timestamps:true});


const chatMessage = mongoose.model('chatMessage',chatMessageSchema);
module.exports = chatMessage;

