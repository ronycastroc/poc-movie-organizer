import express from "express";
import { checkMovie, insertMovie, listMovies } from "../controllers/movieControllers.js";
import { validateCheckMovie, validateMovie } from "../middlewares/movieSchema.js";

const router = express.Router();

router.post("/movies/insert-movie", validateMovie, insertMovie);
router.get("/movies", listMovies);
router.put("/movies/check-movie/:movieId", validateCheckMovie, checkMovie);

export default router;