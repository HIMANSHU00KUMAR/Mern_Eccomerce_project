import User from '../models/user.js';
import jwt from 'jsonwebtoken';

const ADMIN_SECRET_KEY = "your_admin_secret_key"; 

export const Adminsignup = async(req,res) => {
    const { name, email, password, secret } = req.body;
    console.log(name)
    if (secret !== ADMIN_SECRET_KEY) {
      return res.status(403).json({ message: 'Forbidden' });
    }
  
    try {
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
      }
      const user = new User({ name, email, password, isAdmin: true });
      const response=await user.save();
      res.status(201).json({json, message: 'Admin registered successfully',response});
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
}


export const signup = async(req,res) => {
    try {
        const { name, email, password} = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create new user
        const newUser = new User({ name, email, password });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}

export const login = async (req,res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Compare password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, 'your_jwt_secret', {
            expiresIn: '1h'
        });
        res.json({ message: 'Login successful', user: { id: user._id, name: user.name, email: user.email ,token:token} });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}

export const get_user = async(req,res) => {
    try {
        const { userId } = req.params;

        const user = await User.findById(userId).select('-password'); // Exclude password
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}