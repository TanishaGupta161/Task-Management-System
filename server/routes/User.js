const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// SIGN-UP (sign-in in your code)
router.post("/sign-in", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check existing name
        const existingUser = await User.findOne({ name });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Validate name length
        if (name.length < 4) {
            return res.status(400).json({ message: "Name must be at least 4 characters long" });
        }

        // Check existing email
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        return res.status(201).json({ message: "Signup Successfully", user: newUser });
    } catch (error) {
        console.error("Error during sign-in:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

// LOGIN
router.post("/login", async (req, res) => {
    try {
        const { name, password } = req.body;

        // Find user by name
        const existingUser = await User.findOne({ name });
        if (!existingUser) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        // Create token
        const token = jwt.sign(
            {
                id: existingUser._id,
                name: existingUser.name,
                email: existingUser.email
            },
            "tcmTM",
            { expiresIn: "2d" }
        );

        res.status(200).json({
            message: "Login Successfully",
            token,
            user: existingUser
        });
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
