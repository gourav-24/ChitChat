$(document).ready(function(){
    
        
            $("#show-form").click(function(e){
            
        
    let postForm = function(id){

        console.log('postForm called');
        return $(`<div id="post-form">
        <form action="/post/create" id="new-post-form" method="POST" enctype="multipart/form-data">
            <input id="file"  type="file" name="picture" accept="image/*" required />
            <label id="file-button" for="file" > Choose a Photo</label><br>
            <textarea name="content" id="" cols="30" rows="3" placeholder="what you want to write!!" required></textarea><br>
            <input type="submit" id="submit">
            <label id="post" for="submit">Post It</label>

        </form>

    </div>`);
    }
    $("#show-form").hide(100);
    
        let form = postForm();
        $(".post-area").prepend(form);
        

    });

    




});