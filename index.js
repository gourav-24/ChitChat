const express = require('express');
const app = express();
const Port = 8000;
const db = require('./config/mongoose');


app.use('/',require('./routes/index'));

app.listen(Port, function(err){
    if(err){
        console.log("Error in starting the server",err);
    }
    console.log("server is up and running!!");
});