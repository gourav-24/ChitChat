const mongoose =require('mongoose');
mongoose.connect('mongodb://localhost/chitchat');
const db = mongoose.connection;  // require connection of db

// handling error
db.on('error',console.error.bind(console,'error in connecting to mongo db data base'));

db.once('open',function(){
    console.log("succesfully connected to mongo db");
});

module.exports = db;
