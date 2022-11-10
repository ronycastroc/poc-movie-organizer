import express from "express";
import { checkMovie, deleteMovie, insertMovie, listGenreCount, listMovies, listPlatformCount } from "../controllers/movieControllers.js";
import { validateCheckMovie, validateMovie } from "../middlewares/joiSchemas.js";

const router = express.Router();

router.post("/movies/insert-movie", validateMovie, insertMovie);
router.get("/movies", listMovies);
router.put("/movies/check-movie/:movieId", validateCheckMovie, checkMovie);
router.delete("/movies/delete-movie/:movieId", deleteMovie);
router.get("/movies/movies-platform", listPlatformCount);
router.get("/movies/movies-genre", listGenreCount);

export default router;