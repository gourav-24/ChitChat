const mongoose =require('mongoose');
const env = require('./enviroment');
// // Add thge database name in environment file and fetch it from there 
// mongoose.connect(`mongodb://localhost/'${env.db}`);
// const db = mongoose.connection;  // require connection of db

// // handling error
// db.on('error',console.error.bind(console,'error in connecting to mongo db data base'));

// db.once('open',function(){
//     console.log("succesfully connected to mongo db");
// });

const uri = `mongodb+srv://user_gaurav01:vELqbBDxs@cluster0.7c5nu.mongodb.net/${env.db}?retryWrites=true&w=majority`;

// Connect to the MongoDB cluster
    mongoose.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true });
    const db = mongoose.connection;
    db.on('error',console.error.bind(console,'error in connecting to mongo db data base'));
    db.once('open',function(){
        console.log("succesfully connected to mongo db");
    });
module.exports = db;
