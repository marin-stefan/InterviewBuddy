const User = require("../models/UserModel");

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

const deleteUserById = async(req, res) => {
    try {
        const {id} =  req.params;
        const user = await User.findByIdAndDelete(id);

        //if we can't find in bd
        if(!user) {
            return res.status(404).json({message: `Can't find any user with ID ${id}`})
        }

        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({message: error.mesage})
    }
}

module.exports = {createUser, updateUserById, getUserById, deleteUserById};
