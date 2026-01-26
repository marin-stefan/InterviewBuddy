const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
// const questionsList = require("./backend/middleware/questionList") // !!!for manual insert to mongo!!!

const User = require("./backend/models/UserModel");
const userRoutes = require("./backend/routes/userRoutes");
const Question = require("./backend/models/QuestionModel");
const questionRoutes = require("./backend/routes/questionRoutes");

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}/Ibuddy?appName=IBCluster`;


mongoose
    .connect(uri)
    .then(async () => {
        app.listen(process.env.PORT, () => {
            console.log(`API is listening to port ${process.env.PORT}`);
        });
        console.log("Connected to MongoDB");

        // !!!! for manual insert to mongo only!!!!!
        // const inserted = await Question.insertMany(questionsList);
        // !!!! for manual insert to mongo only!!!!
    })
    .catch((error) => console.log(error));

const corsOptions = {
  origin: (origin, callback) => {
    const allowed = [
      'http://localhost:3000',
      'http://localhost:5173',
      'https://marin-stefan-interview-buddy.netlify.app',
      process.env.FRONTEND_URL
    ].filter(Boolean);

    if (!origin || allowed.includes(origin)) {
      callback(null, true);
    } else {
      console.log(`CORS blocked origin: ${origin}`);
      callback(null, false);
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 204
};

app.options('/*splat', cors(corsOptions));      // preflight
app.use(cors(corsOptions));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Configuration for "Static-files"
app.use('/', express.static('static-app'));

app.use("/api/user", userRoutes);
app.use("/api/questions", questionRoutes)

app.get("/", (req, res) => {
    res.send("hello from the other side");
});

//get all users
app.get("/api/users", async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
