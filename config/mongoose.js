const mongoose =require('mongoose');
const env = require('./enviroment');
// Add thge database name in environment file and fetch it from there 
mongoose.connect(`mongodb://localhost/'${env.db}`);
const db = mongoose.connection;  // require connection of db

// handling error
db.on('error',console.error.bind(console,'error in connecting to mongo db data base'));

db.once('open',function(){
    console.log("succesfully connected to mongo db");
});

module.exports = db;
