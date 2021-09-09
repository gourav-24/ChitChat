class detailPost{
    constructor(self,id){
        console.log("detail-post file loaded");
        this.ID = id;
        console.log(id);
        if(id){
            this.post(id);

        }
    }

    post(ID){
        let self = this;
        $(self).click(function(){
            console.log("clicked and asking for post");
            $.ajax({
                type:'get',
                url:"/post/find",
                data:{
                    id:ID
                },
                success:function(data){
                    if(data){
                        self.showPost(data);
    
                    }
    
    
                },
                error:function(){
                    
                    console.log(error.responseText);
    
                }
    
    
    
    
            });
            
    
            
        })

        

    }

    showPost(data){
        var modalbg = document.querySelector('.modal-bg');
        modalbg.classList.add('bg-active');

    }
}