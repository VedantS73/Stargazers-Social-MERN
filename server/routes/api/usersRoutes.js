const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/users');
const authenticateToken = require('../../middlewares/authenticateToken')
const admintoken = require('../../middlewares/adminToken')
const jwt_decode = require('jwt-decode');
const dotenv = require('dotenv');

dotenv.config();
const secretkey = process.env.JWT_SECRET;

router.get('/', (req, res) => {
    res.send('auth function');
});

router.get('/gettoken', (req, res) => {
    const token = req.headers['authorization'];
    if (token) {
        res.send(token);
    } else {
        res.status(401).send('Error: No token found');
    }
});

router.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
            username: req.body.username,
            password: hashedPassword,
            createdAt: new Date(),
        });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error saving user:', error);
        res.status(500).json({ error: 'An error occurred while registering the user' });
    }
});

router.post('/login', async (req, res) => {
    const name = req.body.name;
    const password = req.body.pass;

    try {
        const user = await User.findOne({ username: name });

        if (user && await bcrypt.compare(password, user.password)) {
            const admin = (user.username === 'admin');
            const payload = {
                id: user.id,
                username: user.username,
                admin: admin,
            };
            const token = jwt.sign(payload, secretkey, { expiresIn: '1h' });
            res.header('Authorization', `Bearer ${token}`);
            res.json({ message: 'Login successful', jwttoken: token, admin: admin });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'An error occurred during login' });
    }
});

router.get('/search', async (req, res) => {
    try {
      const { query } = req.query;
  
      const users = await User.find({ username: { $regex: new RegExp(query, 'i') } });
  
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });

router.post('/adminverify', async (req, res) => {
    try {
        const admintoken = req.body.jwtToken;
        const decodedToken = jwt_decode(admintoken);
        const isAdmin = decodedToken.admin;

        res.json({ adminroute: isAdmin });
    } catch (error) {
        console.error('Error verifying admin:', error);
        res.status(500).json({ error: 'An error occurred while verifying admin status' });
    }
});

module.exports = router;
