import express from "express";
import { checkMovie, deleteMovie, insertMovie, listMovies } from "../controllers/movieControllers.js";
import { validateCheckMovie, validateMovie } from "../middlewares/joiSchemas.js";

const router = express.Router();

router.post("/movies/insert-movie", validateMovie, insertMovie);
router.get("/movies", listMovies);
router.put("/movies/check-movie/:movieId", validateCheckMovie, checkMovie);
router.delete("/movies/delete-movie/:movieId", deleteMovie);

export default router;