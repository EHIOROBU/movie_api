const express = require("express");
const mongoose = require("mongoose");
const Movie = require("./model/modelling");
const movieRoute = require("./route/movie.route")
const app = express();

//middle ware
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

//route
app.use("/api/movies", movieRoute)



require("dotenv").config()
const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.MONGO_DB_URL)
    .then(() => {
        console.log("connecting to mongodb")
        app.listen(PORT, () => {
            console.log(`connecting port ${PORT}`)

        });
    })
    .catch((error) => {
        {
            console.log(error)
        }
    });

