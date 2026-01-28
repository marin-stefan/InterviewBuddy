const express = require('express');
const { createQuestion, getQuestionById, getQuestions } = require('../controllers/questionController');
const router = express.Router();

router.post('/', createQuestion); //insert question to db

router.get('/:id', getQuestionById); //get one question by id

router.get('/', getQuestions); //get all questions we\ll use query params



module.exports = router;