const mongoose = require('mongoose');
const chatRoomMessagesSchema = new mongoose.Schema({
    messageList:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'chatMessage'
    }],
    withUserEmail:{
        type:String,
        required:true
    },
    RoomCode:{
        type:String,
        required:true
    }


},{timestamps:true});

const ChatRoom = mongoose.model('ChatRoom',chatRoomMessagesSchema);
module.exports = ChatRoom;