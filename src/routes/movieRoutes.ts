import express from "express";
import { insertMovie, listMovies } from "../controllers/movieControllers.js";
import { validateMovie } from "../middlewares/movieSchema.js";

const router = express.Router();

router.post("/movies/insert-movie", validateMovie, insertMovie);
router.get("/movies", listMovies);

export default router;