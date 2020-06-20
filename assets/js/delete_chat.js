class deleteChat{
    constructor(id){
        this.ID = id;
        if(id){
            this.deleteMethod(id);

        }

    }

    deleteMethod(chatBox_id){
        let self = this;
        var modalbg = document.querySelector('.modal-bg');
        modalbg.classList.add('bg-active');
        //$('.modal-bg').attr('class','bg-active'); some styles were not working when i used this line in place of above
        
        $("#link").attr("href","/users/chatBox/deleteChat/"+chatBox_id);
       
        $('#modal-close').click(function(){
            modalbg.classList.remove('bg-active');
        });
        
    }

}