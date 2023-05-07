// mongoose.js file

const mongoose = require('mongoose');

const username = 'krishanjangid516';
const password = 'Admin@123';
const hostname = 'cluster0.fq6fou7.mongodb.net';
const dbname = 'accounts';

const uri = `mongodb+srv://${encodeURIComponent(username)}:${encodeURIComponent(password)}@${hostname}/${dbname}`;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB Atlas successfully!');
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB Atlas:', err);
  });

  const userSchema = new mongoose.Schema({
    _id: Number,
    user: {
        email: { type: String, required: true },
        password: { type: String, required: true }
    }
  }); 
  
const users = mongoose.model('users', userSchema);                
module.exports = mongoose;
