class Delete_msg{
    constructor(msg,msgId,room){
        console.log("inside constructor",msgId);
        this.MSGid = msgId;
        this.MSG = msg;
        this.RC = room
        //var self =this;
        this.delete_msg();
      }

    delete_msg(){
        let MsgID = this.MSGid;
        let roomCode = this.RC;
        $(this.MSG).click(function(e){
            let self = this; //*** we can refer to msg element via this only inside fn of this.element
            $('h7').remove();
            $(this).before(function(){
                let unsend = $('<h7>unsend</h7>')
                return unsend;
            });
            console.log("1234",MsgID);

            $('h7').click(function(e){
                console.log('clicked and making ajax call');
                $.ajax({
                    type:'get',
                    url:"/users/chatBox/deleteMessage",
                    data:{
                        id:MsgID,
                        rc:roomCode
                    }

                }).done(function(data){
                    
                    $('h7').fadeOut('slow');
                    $(self).fadeOut(1000);
                }).fail(function(err){
                    console.log('err in completing the messagge delete request')
                });

                
            });
            
        });
        
        // $(this.MSG).click(function(e){
        //     let self= this;   // this had key MSG but inside click function we dont have that key anymore WHY?
        //     console.log(self);

        //     console.log('clicked');
        // })

    }
}