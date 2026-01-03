const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}/?appName=IBCluster`;

mongoose
    .connect(uri)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`API is listening to port ${process.env.PORT}`);
        });
        console.log("Connected to MongoDB");
    })
    .catch((error) => console.log(error));

app.get("/", (req, res) => {
    res.send("hello from the other side");
});