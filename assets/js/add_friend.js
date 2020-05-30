class AddFriend {
    constructor(id_value,self) {
        if(id_value){
            this.addFriend(id_value,self);
        } 

    }

    addFriend = function (id_value,self) {
            $.ajax({
                type: "post",
                url: "/users/addFollower",
                data: {id:id_value},
                success: function (data) {
                    if (data.message) {
                        $(self).text("Following");
                    }
                },
                error: function () {
                    console.log(error.responseText);
                },
             });
    }  
}   

