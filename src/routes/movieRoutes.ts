import express from "express";
import { insertMovie } from "../controllers/movieControllers.js";
import { validateMovie } from "../middlewares/movieSchema.js";

const router = express.Router();

router.post("/movies/insert-movie", validateMovie, insertMovie);

export default router;