const express = require('express');
const router = express.Router();
const { connectDatabase } = require('../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const User = require("../models/user");

const secretKey = crypto.randomBytes(32).toString();

router.post('/register', async (req, res) => {
    const { username, email, password, fullName, bio, profilePictureURL, socialMedia, skills, location, websiteURL } = req.body;

    if (!username || !email || !password || !fullName) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Email or Username already exists' });
        }

        const db = await connectDatabase();
        const usersCollection = db.collection('users');
        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await usersCollection.insertOne({ 
            username, 
            email, 
            password: hashedPassword, 
            fullName, 
            bio, 
            profilePictureURL, 
            socialMedia, 
            skills, 
            location, 
            websiteURL 
        });
        
        res.status(201).json({ message: 'User registered successfully', user: username });
    } catch (error) {
        console.error("Error Registering User ", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const db = await connectDatabase();
        const userCollection = db.collection('users');
        const user = await userCollection.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const inputPassword = String(password);
        const storedPassword = String(user.password);
        const passwordMatch = await bcrypt.compare(inputPassword, storedPassword);

        if (!passwordMatch) {
            return res.status(404).json({ message: "Password does not match" });
        }

        const token = jwt.sign({ userId: user._id }, secretKey);

        res.status(200).json({ token });
    } catch (error) {
        console.error("Error logging in user ", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
