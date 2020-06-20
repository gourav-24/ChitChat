class ChatProfile {
  constructor(id, email) {
    this.UserId = id;

    if (this.UserId) {
      this.getChatProfile(email);
    }
  }

  getChatProfile(email) {
    let self = this;

    $.ajax({
      url: "/users/chatBox/find",
      method: "GET",
      data: { id: self.UserId },
      success: function (data) {
        let file = new ChatEngine(data, email);
        //render on
        $("#user-specific-box").html("");
        $("#ChatBox").prepend(function (e) {
          $("#message-form").show();
          return $(`
                    <div id="user-specific-box">
                        <div id="chat-header">
                            <div id="user-image"> <img src="${data.chat_user.avatar}" alt="" /> </div>
                            <div id="user-name">
                                ${data.chat_user.name}
                            </div>
                            <div id="info">
                                <span id="chat-info" class="material-icons">
                                    info
                                </span>
                            </div>
                        </div>
                        <div id="chat-meassages">
                            <ul type="none" id="chat-meassages-list">
               
                       
               


                            </ul>
                        </div>
                    </div>    
                `);
        });
        for (var msg of data.rc.messageList) {
          $("#chat-meassages-list").append(function () {
            return $(`
                    <li class="${msg.messageType} " data-id="${msg._id}" href="/href" >
                        <span data-id="${msg._id}" >
                            ${msg.message}
                        </span>
                        
                    </li>

                    `);
          });

        }
        
      $(".self-message span").each(function () {
        let self = this;
        let msgId =$(self).attr('data-id');
        
        let Dmsg = new Delete_msg(self,msgId,data.rc._id);
      });



          $("#chat-info").click(function () {
            new deleteChat(data.rc._id);
          });

          
      },
    });
  }
}
