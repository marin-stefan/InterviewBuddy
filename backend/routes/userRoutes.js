const express = require('express');
const router = express.Router();

const {createUser, updateUserById, deleteUserById, getUserById} = require('../controllers/userController');

router.post('/', createUser); //insert user to db

router.get('/:id', getUserById); //get one user by id

router.put('/:id', updateUserById); //update one user by id

router.delete('/:id', deleteUserById); //delete one user by id

module.exports = router;