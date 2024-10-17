const express = require("express");
const Movie = require("../model/modelling");
const router = express.Router();


const { getMovie, getMovies, MovieIdentity, createMovie, updatedMovie, deleteMovie } = require("../controller/movie.controller")

// router.get("/", getMovie);
router.get("/", getMovies);
router.get("/:id", MovieIdentity);
router.post("/", createMovie);
router.put("/:id", updatedMovie);
router.delete("/:id", deleteMovie);



module.exports = router;