const mongoose = require("mongoose");
const movieSchema = mongoose.Schema(
    {
        title: {
            type: String,
            require: true,
        },
        image_URL: {
            type: String,
            require: true,
        },
        director: {
            type: String,
            require: true,
        },
        genre: {
            type: String,
            require: true,
        },
        year: {
            type: Number,
            require: true,
        },
        description: {
            type: String,
            require: true,
        },
    },
    {
        Timestamps: true

    }
)

const Movie = mongoose.model("movie", movieSchema);
module.exports = Movie