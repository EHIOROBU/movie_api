const Movie = require("../model/modelling");



const getMovies = async (req, res) => {
    try {
        const { year, genre, search, title, director, page = 1, limit = 5 } = req.query;
        const filter = {}
        if (year) {
            filter.year = year
        }

        if (genre) {
            filter.genre = {
                $regex: genre, $options: 'i'
            }
        }
        if (title) {
            filter.title = {
                $regex: title, $options: 'i'
            }
        }
        if (director) {
            filter.director = {
                $regex: director, $options: 'i'
            }
        }

        if (search) {
            filter.$or = [
                {
                    title: { $regex: search, $options: 'i' }
                },
                {
                    genre: { $regex: search, $options: 'i' }
                },
                {
                    director: { $regex: search, $options: 'i' }
                },
                {
                    description: { $regex: search, $options: 'i' }
                }
            ]
        };
        const pageNum = parseInt(page) || 1;
        const limitNum = parseInt(limit) || 5;
        const skip = (pageNum - 1) * limitNum;

        //total number of movies
        const totalMovies = await Movie.countDocuments(filter);

        //fetching movie pagination 
        const movies = await Movie.find(filter).skip(skip).limit(limitNum);

        //response
        res.json({
            movies, totalMovies,
            totalPages: Math.ceil(totalMovies / limitNum),
            currentPage: pageNum,
        });

    }
    catch (error) {
        console.log(error)
    }
};


const MovieIdentity = async (req, res) => {
    try {
        const { id } = req.params;
        const movie = await Movie.findById(id);
        res.status(200).json(movie);
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
};

const createMovie = async (req, res) => {
    try {

        const movie = await Movie.create(req.body);
        res.status(200).json(movie);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

};


const updatedMovie = async (req, res) => {
    try {
        const { id } = req.params;
        const movie = await Movie.findByIdAndUpdate(id, req.body);
        res.status(200).json(movie);
        if (!movie) {
            res.status(404).json({ message: "movie not found" });
        }
        const updatedmovie = await Movie.find(id)
        res.status(200).json(updatedmovie);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteMovie = async (req, res) => {
    try {
        const { id } = req.params;
        const movieDelete = await Movie.findByIdAndDelete(id);
        res.status(200).json(movieDelete);

        if (!movieDelete) {
            res.status(404).json({ message: "movie not found for deletion" });
        }
        res.status(200).json({ message: "movie successfully deleted" });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
module.exports = {
    getMovies,
    MovieIdentity,
    createMovie,
    updatedMovie,
    deleteMovie
};