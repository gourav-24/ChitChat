const express = require('express');
const app = express();
const Port = 8000;
const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocalStrategy = require('./config/passport-local-strategy');
const mongoStore = require('connect-mongo')(session);
const passportGoogle =require('./config/passport-google-oauth-2-Strategy'); 
const SassMiddleware = require('node-sass-middleware');

const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);

chatServer.listen(5000);
console.log("chat server is listining on port 5000");


app.use(SassMiddleware({
    src : './assets/scss',
    dest : './assets/css',
    debug : true,
    outputStyle: 'extended',
    prefix : '/css'

}));

app.use(express.urlencoded()); // to parse or convert form data of post method
app.use(express.static('./assets'));

app.use('/uploads',express.static(__dirname+'/uploads'));
app.use('/app',express.static(__dirname+'/app'));

app.set('view engine','ejs');
app.set('views','./views');

app.use(session({
    name: "ChitChat",
    secret: 'blahsomething',  //  TODO: change secret before deployment
    saveUninitialized :false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store : new mongoStore({
        mongooseConnection :db,
        autoRemove:'disabled'
    },function(err){
        console.log(err || 'connect mongo db setup Ok');
    })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser); //it will check if session cookie is present if present then that user is set into locals


app.use('/',require('./routes/index'));
app.listen(Port, function(err){
    if(err){
        console.log("Error in starting the server",err);
    }
    console.log("server is up and running!!");
});