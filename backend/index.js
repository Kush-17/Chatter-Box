const express  = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const colors = require('colors');
const userRoutes = require('./routes/userRoutes');
const messagesRoute = require('./routes/messagesRoute');
const socket = require('socket.io');
require('dotenv').config();

 
app.use(cors());
app.use(express.json()); 

app.use('/api/auth',userRoutes);
app.use('/api/messages',messagesRoute);

mongoose.connect(process.env.MONGO_URL, 
    {
        useNewUrlParser: true,  
        useUnifiedTopology: true 
    }).then(()=>{
        console.log('Database Connected Successfully'.yellow.bold)
    }).catch((err)=>{
        console.log(err.message.red.bold)
    });
    

const server  = app.listen(process.env.PORT, () => {
    console.log(`Server is running on port: ${process.env.PORT}`.cyan.bold
    );
})


/*************** SOCKET.IO ***************/

const io = socket(server, {
    cors: {
        origin: "http://localhost:5173",
        credentials:true,
    },
});

global.onlineUsers = new Map()            // store online users

io.on('connection', (socket) => {
    global.chatSocket = socket;            // store chat socket
    socket.on('add-user',(userId)=>{       // add user to online users
        onlineUsers.set(userId,socket.id)   // set user id and socket id
    })

    socket.on('send-msg',(data)=>{
        const sendUserSocket = onlineUsers.get(data.to)  // get receiver socket id
        if(sendUserSocket){
            socket.to(sendUserSocket).emit('receive-msg',data)  // send message to receiver
        }
    })
})

