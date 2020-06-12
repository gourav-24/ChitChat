class ChatProfile{
    constructor(id,email){
        console.log('chat_profile loaded',id);
        this.UserId = id
        
        if(this.UserId){
            this.getChatProfile(email);

        }
    }

    getChatProfile(email){
        let self =this;
        
        $.ajax({
            url:'/users/chatBox/find',
            method:'GET',
            data:{id:self.UserId},
            success:function(data){

                let file = new ChatEngine(data,email);
                //render on 
                $('#ChatBox').prepend(function(e){
                    

                    $('#message-form').show();
                    return $(`
                <div id="chat-header">
                    <div id="user-image"> <img src="${ data.chat_user.avatar }" alt="" /> </div>
                    <div id="username">
                        ${ data.chat_user.name}
                    </div>


                </div>
                <div id="chat-meassages">
                <ul type="none" id="chat-meassages-list">
               
                       
               


                </ul>
                </div>
                `);
               });
               for(var msg of data.rc.messageList){
                $('#chat-meassages-list').append(function(){
                    return $(`
                    <li class="${msg.messageType}">
                        <span>
                            ${msg.message}
                        </span>
                    </li>

                    `)
                });

            }

            }


        });


    }

}