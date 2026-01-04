const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
require("dotenv").config();

const User = require('./backend/models/UserModel');
const userRoutes = require('./backend/routes/userRoutes');

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}/Ibuddy?appName=IBCluster`;

mongoose
    .connect(uri)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`API is listening to port ${process.env.PORT}`);
        });
        console.log("Connected to MongoDB");
    })
    .catch((error) => console.log(error));


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/user', userRoutes); // sau aici si tot API face /api/blabla sa nu avem conflict de rute ca e aceiasi app si fe si be



app.get("/", (req, res) => {
    res.send("hello from the other side");
});



//get all users
app.get('/users', async(req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json((users))
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})