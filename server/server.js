const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const socket = require('socket.io');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

const User = require('./models/users')
const userRoutes = require('./routes/api/usersRoutes')
const postRoutes = require('./routes/api/postRoutes')
const messageRoutes = require('./routes/api/messageRoutes')

const app = express();
const PORT = process.env.PORT || 3001

//Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use('/api/users',userRoutes)
app.use('/api/posts',postRoutes)
app.use('/api/messages',messageRoutes)
const authenticateToken = require('./middlewares/authenticateToken')

const mongoose = require('mongoose');

const db = async ()=>{
    try{
        const connect = await mongoose.connect(process.env.mongoDB_URL)
        console.log(`connected successfully ${connect.connection.host}` )
    }
    catch(error){
        console.log(`error is ${error}`)
    }
}

app.get('/' ,(req, res) => {
    res.send('Hello from the stargazers backend!');
});

app.get('/userapi', authenticateToken, async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
      console.log(error);
    }
  });  

//Starting the server
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    db();
});

const io = socket(server, {
    cors:{
      origin: 'http://localhost:3000',
      credentials: true,
    }
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  console.log(`Socket connected: ${socket.id}`);

  socket.on("addUser", (id) => {
    console.log(`User added: User ID ${id}, Socket ID ${socket.id}`);
    onlineUsers.set(id, socket.id);
    console.log("Online Users:", onlineUsers);
  });

  socket.on("send-msg", (data) => {
    console.log(`Message received from ${socket.id}:`, data);

    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      console.log(`Sending message to User ID ${data.to}, Socket ID ${sendUserSocket}`);
      socket.to(sendUserSocket).emit("msg-receive", data.message);
      console.log("Message sent.");
    } else {
      console.log(`User ID ${data.to} not found in onlineUsers.`);
    }
  });

  socket.on("disconnect", () => {
    console.log(`Socket disconnected: ${socket.id}`);

    // Remove the disconnected user from onlineUsers
    onlineUsers.forEach((value, key) => {
      if (value === socket.id) {
        onlineUsers.delete(key);
        console.log(`User ID ${key} removed from onlineUsers.`);
      }
    });

    console.log("Updated Online Users:", onlineUsers);
  });
});

// global.onlineUsers = new Map();
// io.on("connection", (socket) => {
//   global.chatsocket = socket;
//   socket.on("addUser", (id)=>{
//     onlineUsers.set(id, socket.id); 
//   })

//   socket.on("send-msg", (data) => {
//     const sendUserSocket = onlineUsers.get(data.to);
//     if(sendUserSocket){
//       socket.to(sendUserSocket).emit("msg-receive", data.message);
//     }
//   })
// });