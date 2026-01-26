const express = require('express');
const { createQuestion, getQuestionById } = require('../controllers/questionController');
const router = express.Router();

router.post('/', createQuestion); //insert question to db

router.get('/:id', getQuestionById); //get one question by id



module.exports = router;