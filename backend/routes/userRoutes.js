const express = require('express');
const router = express.Router();

const {createUser, loginUser, updateUserById, deleteUserById, getUserById, getCurrentUser} = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', createUser); //insert user to db

router.post('/login', loginUser) // login for user

router.get('/me', authMiddleware, getCurrentUser) // for authentification

router.get('/:id', getUserById); //get one user by id

router.put('/:id', updateUserById); //update one user by id

router.delete('/:id', deleteUserById); //delete one user by id

module.exports = router;