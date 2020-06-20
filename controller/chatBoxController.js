const User = require("../models/user");
const ChatRoom = require("../models/chatRoom");
const Message = require("../models/message");

module.exports.chatBox = async function (req, res) {
  try {
    let allUsers;
    if (req.user) {
      let u1 = await User.findById({ _id: req.user._id });
      let arrayOfUsers = u1.following;
      
      for (var i of u1.followers) {
        arrayOfUsers.push(i);
      }
      
      allUsers = await User.find({ _id: { $in: arrayOfUsers } }).sort("-updatedAt");
    }

    return res.render("chat-file", {
      userSend: allUsers,
      chat_user: "",
      title: "Chats",
    });
  } catch (err) {
    console.log("error in loading chatBox method of chatBox controller", err);
  }
};

module.exports.find = async function (req, res) {
  try {
    console.log("--", req.user.id);
    let askingUser = await User.findById({ _id: req.user.id }).populate(
      "chatRoomList"
    );

    let askedUser = await User.findById({ _id: req.query.id }).populate(
      "chatRoomList"
    );

    let roomCode = Date.now();

    //search for room in chat rooms list of user that requsted to chat
    let room = await askingUser.chatRoomList.find(
      (chatRoom) => chatRoom.withUserEmail == askedUser.email
    );
    // not able to populate a document here

    if (room) {
      await room.populate("messageList").execPopulate();
    }

    if (!room) {
      // creating room for user that requested to chat with another user and adding that room to users chatrooms list

      room = await ChatRoom.create({
        withUserEmail: askedUser.email,
        RoomCode: roomCode,
      });

      askingUser.chatRoomList.push(room);
      askingUser.save();
    }

    //PART2: creating room and saving it in asked user's chatRoom list

    let askedUserRoom = askedUser.chatRoomList.find(
      (chatRoom) => chatRoom.withUserEmail == askingUser.email
    );

    if (!askedUserRoom) {
      console.log(askedUserRoom);
      askedUserRoom = await ChatRoom.create({
        withUserEmail: askingUser.email,
        RoomCode: room.RoomCode,
      });
      askedUser.chatRoomList.push(askedUserRoom);
      askedUser.save();
    }

    if (req.xhr) {
      return res.status(200).json({
        message: "chat box found",
        rc: room,
        chat_user: askedUser,
      });
    }
  } catch (err) {
    console.log("error in find method of chat_Box controller", err);
  }
};

module.exports.deleteChat= async function(req,res){
    try{
        const room = await ChatRoom.findById({_id:req.params.id});
        
        var length = room.messageList.length;
        for(var i =0; i<length;i++){
          let msgId = room.messageList.shift();
          await Message.findByIdAndDelete(msgId);
        }
        room.save();
        return res.redirect('back');


    }catch(err){
        console.log('error in deleteChat method of chatBox controller',err);
    }

}

module.exports.deleteMessage = async function(req,res){
  try{
    console.log("@@@",req.query);
    let chatRoom1 = await ChatRoom.findById(req.query.rc);
    console.log(chatRoom1);
    let message1 = await Message.findByIdAndDelete(req.query.id);
    console.log(message1);

    let message2 = await Message.findByIdAndDelete(message1.copyMsgID);

    console.log(message2);

    //find msg

    //find copy msg
    // find other chatroom list by with user email received via one chatroom (we can also find chatrooms via roomcode)
    let user = await User.findOne({email:chatRoom1.withUserEmail}).populate('chatRoomList');
    console.log(user);

    let chatRoom2 = await user.chatRoomList.find(room=> room.withUserEmail == req.user.email);
    console.log(chatRoom2);
    
    // shift thode msgs out of respective msglists
    let index1 = chatRoom1.messageList.indexOf(message1._id);
    chatRoom1.messageList.splice(index1,1);
    chatRoom1.save();
    
    let index2 = chatRoom2.messageList.indexOf(message2._id);
    chatRoom2.messageList.splice(index2,1);
    chatRoom2.save();
    
    


    if(req.xhr){
      return res.status(200).json({
        message: "message deleted"

      });
    }

  }catch(err){
    console.log('error in deleteMessage method of chatBoxController',err);

  }


}