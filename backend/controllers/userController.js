const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(200).json(user);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getCurrentUser = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: "Not authenticated" });
    }

    res.status(200).json(req.user);
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Find user and explicitly include password
        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // 2. Compare plaintext password to stored hash
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // 3. Success (+ create jwt
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        });
        
        //4. send token + info
        res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                createdAt: user.createdAt
            },
            token: token,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndUpdate(id, req.body);

        //if we can't find in bd
        if (!user) {
            return res
                .status(404)
                .json({ message: `Can't find any user with  ID ${id}` });
        }
        const updatedUser = await User.findById(id);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.mesage });
    }
};

const deleteUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);

        //if we can't find in bd
        if (!user) {
            return res
                .status(404)
                .json({ message: `Can't find any user with ID ${id}` });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.mesage });
    }
};

module.exports = {
    createUser,
    getCurrentUser,
    loginUser,
    updateUserById,
    getUserById,
    deleteUserById,
};
