const express = require('express');
const bodyparser = require('body-parser');
const mangoose = require('./db');
const cors = require('cors');
const app = express();
const path = require('path');
const bcrypt = require('bcrypt');
app.use(express.json());
app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, '..', 'client')));
app.use(cors());
app.get('/', (req, res) => {
  const add = path.join(__dirname, '..', 'client/build/','index.html');
  console.log(add);
    res.sendFile(add);
  });
  
  app.get('/',function(req,res){
    res.send('hello from server');  
  });

app.post('/signup', async (req, res) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
        
      const newUser = new mangoose.model('users')({ 
        _id: '', 
        user: {
          email: req.body.email,
          password: hashedPassword
        }
      });
      await newUser.save();
  
      res.status(201).json({ message: 'User created successfully!' });
    } catch (error) {
      console.error('Failed to create user:', error);
      res.status(500).json({ error: 'Failed to create user' });
    }
  });

  // Login route
  app.post('/login', async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        // Find the user by email
        const user = await mangoose.model('users').findOne({'user.email':email });
        // If user not found, return error
        if (!user) {
            return res.status(401).json({ error: 'Authentication failed' });
        }

        // Compare the provided password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(password, user.user.password);

        // If password is not valid, return error
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Authentication failed' });
        }

        // Authentication successfuld
        res.status(200).json({ message: 'Authentication successful' });
    } catch (error) {
        console.error('Failed to authenticate user:', error);
        res.status(500).json({ error: 'Failed to authenticate user' });
    }
});

const port = 3001;
app.listen(port, () =>{
    console.log('server is runnig over port : '+port);
});
