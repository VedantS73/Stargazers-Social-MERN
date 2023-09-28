const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

const userRoutes = require('./routes/api/usersRoutes')
const postRoutes = require('./routes/api/postRoutes')

const app = express();
const PORT = process.env.PORT || 3001

//Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use('/api/users',userRoutes)
app.use('/api/posts',postRoutes)
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
    }
  });  

//Starting the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    db();
});