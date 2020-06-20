const Message = require('../models/message'); 
const Chat_room = require('../models/chatRoom'); 

module.exports.chatSockets = function(socketServer){
    let io =require('socket.io')(socketServer);

    io.sockets.on('connection',function(socket){
        console.log('new connection received',socket.id);

        socket.on('disconnect',function(){
            console.log('socket disconnected');
            
        });

        socket.on('join_room',function(data){
            console.log('joinning req received ',data);

            socket.join(data.chat_room);  // it will be joined since we have created room and chat room's messages object

            io.in(data.chat_room).emit('user_joined',data); 
            
        });
        
        socket.on('send-message',function(data){
            
            createMessage(data,);
            
            io.in(data.chat_room).emit('receive_message',data); // when a message is received search for chat room with chat room id or email
        });

    });



}


async function createMessage(data){

    let crooms = await Chat_room.find({RoomCode : data.chat_room});

    let Selfmsg =await Message.create({
        message:data.message,
        messageType:"self-message"

    });

    let Othermsg = await Message.create({
        message:data.message,
        messageType:"other-message"

    });

    Selfmsg.copyMsgID = Othermsg._id;
    Othermsg.copyMsgID = Selfmsg._id;
    Selfmsg.save();
    Othermsg.save();
    console.log(Selfmsg.copyMsgId);
    console.log("selfmsg",Selfmsg);
    console.log("othermsg",Othermsg);
    console.log("id",Othermsg.copyMsgId);

// store self message in chatroom in which Withuseremail is diff from email of user that sent the message(message sent to with user email)  
    let mapRoom =crooms.map(function(room){
        if(room.withUserEmail == data.user_email ){
            room.messageList.push(Othermsg);
        }else{
            room.messageList.push(Selfmsg);
        }
        room.save();
    })

}