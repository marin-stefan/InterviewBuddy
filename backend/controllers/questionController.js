const Question = require("../models/QuestionModel");

const createQuestion = async (req, res) => {
    try {
        const question = await Question.create(req.body);
        res.status(200).json(question);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};

const getQuestionById = async (req, res) => {
    try {
        const { id } = req.params;
        const question = await Question.findById(id);
        res.status(200).json(question);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getQuestions = async (req, res) => {
    try {
        const { category, difficulty } = req.query;
        const questions = await Question.find({ category, difficulty });
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch questions" });
    }
};

module.exports = {
    createQuestion,
    getQuestionById,
    getQuestions,
};
