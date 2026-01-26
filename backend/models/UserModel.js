const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Full name is required"],
        },
        email: {
            type: String,
            required: [true, "Email address is required"],
            unique: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            select: false,
        },
        answers: {
            type: [Number],
            enum: [0, 1],
            default: [],
        },
        correctAnswerCount: {
            type: Number,
            default: 0,
        },
        favoriteQuestions: {
            type: [
                {
                    questionId: {
                        type: String,
                        required: true,
                    },
                    title: {
                        type: String,
                        required: true,
                    },
                    answer: {
                        type: String,
                        required: true,
                    },
                    category: {
                        type: String,
                        required: true,
                    },
                    difficulty: {
                        type: String,
                        required: true,
                    },
                },
            ],
            default: [],
        },
    },
    {
        timestamps: true,
    },
);

userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;

    this.password = await bcrypt.hash(this.password, 10);
});

module.exports = mongoose.model("User", userSchema);
