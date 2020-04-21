


module.exports.home = function(req, res){
    try{
        res.send('<h1>This is Home Page and signup / in</h1>')

    }catch(err){
        console.log('error in loading home controller');

    }

}