const User = require('../models/user');
const ChatRoom = require('../models/chatRoom');

module.exports.chatBox = async function(req,res){
    try{
    let allUsers;
    if (req.user) {
        console.log(req.user._id);
      let u1 = await User.findById({ _id: req.user._id });
      let arrayOfUsers = u1.following;
      console.log(u1.followers);
      for(var i of u1.followers){
          arrayOfUsers.push(i);
      }
      console.log(arrayOfUsers);
      allUsers = await User.find({ _id: { $in: arrayOfUsers } });
    }

        return res.render('chat-file',{
            userSend: allUsers,
            chat_user: '',
            title : 'Chats'
        });

    }catch(err){
        console.log("error in loading chatBox method of chatBox controller",err);
    }
}

module.exports.find =  async function(req,res){
    try{
         let askingUser = await User.findById({_id:req.user.id}).populate("chatRoomList");
         
         let askedUser = await User.findById({_id:req.query.id}).populate("chatRoomList");
        
         
         let roomCode = Date.now();
         
         //search for room in chat rooms list of user that requsted to chat
         let room =await askingUser.chatRoomList.find(chatRoom => chatRoom.withUserEmail == askedUser.email); 
        // not able to populate a document here
         
          await room.populate('messageList').execPopulate();
        
        

         if(!room){
             // creating room for user that requested to chat with another user and adding that room to users chatrooms list 
            
             room = await ChatRoom.create({
                 withUserEmail : askedUser.email,
                 RoomCode: roomCode
                });
                
                askingUser.chatRoomList.push(room);
                askingUser.save();
                
            }
        
            
        //PART2: creating room and saving it in asked user's chatRoom list
            
        let askedUserRoom = askedUser.chatRoomList.find(chatRoom =>chatRoom.withUserEmail == askingUser.email );
        
        if(!askedUserRoom){
            console.log(askedUserRoom);
            askedUserRoom = await ChatRoom.create({
                withUserEmail:askingUser.email,
                RoomCode:room.RoomCode
            });
            askedUser.chatRoomList.push(askedUserRoom);
            askedUser.save();

        }

        if(req.xhr){
            return res.status(200).json({
                message:'chat box found',
                rc:room,
                chat_user:askedUser
            });
        }


    }catch(err){
        console.log('error in find method of chat_Box controller',err);
    }

}