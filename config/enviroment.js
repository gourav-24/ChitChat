const development ={
    name:'development',
    asset_path:'./assets',
    session_cookie_key: 'blahsomething',
    db:'Chit-Chat',
    client_ID :"465922811237-fpsjo12qk2oi3p925eelbd405m35pksf.apps.googleusercontent.com",
    client_Secret:"u4kQxDr69hkwxWO6BGw4_49Y",
    callback_URL:"https://chit-chat-v1.herokuapp.com/users/auth/google/callback"


}

const production={
    name:"production"
}


module.exports = development;