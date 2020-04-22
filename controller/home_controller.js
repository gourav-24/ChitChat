


module.exports.home = function(req, res){
    try{
        return res.render('home');

    }catch(err){
        console.log('error in loading home controller');

    }

}