// authController.js
const User = require('../model/userProfileModel');

const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
require('dotenv').config();

async function registerUser(req, res) {
  try {
    const { username, email, password, roles } = req.body; // Include roles here
    
    // Check if the user already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Create a new user
    const newUser = new User({ username, email, password, roles }); // Include roles here
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
}


async function loginUser(req, res) {
  
  try {
    const { username, password} = req.body;
    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      
      // Compare passwords
      const isPasswordValid = await user.comparePassword(password);
      
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      
      // Generate and send JWT token
      
      const token = generateJWT(user);
      res.json({ token, message: 'Login successful' });
    } catch (error) {
      res.status(500).json({ error: 'Login failed' });
    }
  }
  // Generate JWT
  function generateJWT(user) {
    const token = jwt.sign({ user }, process.env.JWT_SECRET || 'my_secret_key', { algorithm: 'HS256', expiresIn: '1h' });
    console.log("auth controller >>> " + token);
    return token;
  }

console.log("before logout");
function logoutUser(req, res) {
  // Clear the cookie
  res.clearCookie('jwt');
  
  res.json({ message: 'Logout successful' });
}

module.exports = {
  registerUser,
  loginUser,
  generateJWT,
  logoutUser
};