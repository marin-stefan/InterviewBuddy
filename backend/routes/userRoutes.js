const express = require('express');
const router = express.Router();

const {createUser, loginUser, updateUserById, deleteUserById, getUserById, getCurrentUser, getFavoritesQuestionsByUserId, getUserAnswersByUserId} = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', createUser); //insert user to db

router.post('/login', loginUser) // login for user

router.get('/me', authMiddleware, getCurrentUser) // for authentification

router.get('/:id', getUserById); //get one user by id

router.get('/favorites/:id', getFavoritesQuestionsByUserId); //get favorite questions list for user with id

router.get('/answers/:id', getUserAnswersByUserId); //get answers list for user with id

router.put('/:id', updateUserById); //update one user by id

router.delete('/:id', deleteUserById); //delete one user by id

module.exports = router;