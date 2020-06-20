class ChatEngine {
    constructor(chat_room,email){
        //this.ChatBox = $(`#${chatBoxId}`);
        this.UserEmail = email;
         this.RoomCode = chat_room.rc.RoomCode;
        

        this.socket =io.connect('http://localhost:5000');
        if(chat_room){
            this.connectionHandler(chat_room);
        }

    }

connectionHandler(chatRoom){

    let self =this;
    this.socket.on('connect',function(){
        self.socket.emit('join_room', {
            user_email: self.userEmail,
            chat_room : self.RoomCode
        });

        self.socket.on('user_joined',function(data){
            console.log('a user joined');
        })


    });

    $('#send-message').click(function(){
        
        let msgArea = $('#chat-message')
        let msg =msgArea.val();

        msgArea.val("");
        
        if(msg!=''){
            self.socket.emit('send-message',{
                message:msg,
                user_email:self.UserEmail,
                chat_room:self.RoomCode
            });
        }
    });

    self.socket.on('receive_message',function(data){
        console.log(' message received',data);
        let newMessage = $('<li>');
        let messageType='other-message';
        if(data.user_email==self.UserEmail){
            messageType='self-message';
        }
        newMessage.append($('<span>',{
            'html':data.message
        }));

        newMessage.addClass(messageType);

        $('#chat-meassages').append(newMessage);
    })
}

}