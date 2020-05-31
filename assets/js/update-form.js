$(document).ready(function(){
    console.log('update file loaded');
    
        
    $("#update-button").click(function(e){
    

        let updateForm = function(id){

            console.log('postForm called');
            return $(`
                    <div id="update-form">
                    <form action="/users/update" enctype="multipart/form-data" method="POST">
                            <label id="avatar-bttn" for="file"> Profile Image </label><br>
                            <input id="file" type="file" name="avatar" placeholder="Profile picture" accept="image/*">
                            <input type="hidden" name="email" value="example@gmail.com" >
                            <textarea name="content" id="" cols="30" rows="3" placeholder="about yourself...!!" ></textarea><br>
                            <input type="submit" id="submit">
                            <label id="update" for="submit"> Update </label>

                            
                        </form>
                    </div>
                 `);
        }

        $("#update-button").hide(100);

        let form = updateForm();
        $("#update-button-container").prepend(form);


     });

});