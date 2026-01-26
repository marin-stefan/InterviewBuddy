const mongoose = require("mongoose");

const questionSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Question title is required"],
        },
        answer: {
            type: String,
            required: [true, "Question answer is required"],
        },
        category: {
            type: String,
            required: [true, "Question category is required"],
        },
        difficulty: {
            type: String,
            required: [true, "Question difficulty is required"],
        }
    }
)



module.exports = mongoose.model("Questions", questionSchema);