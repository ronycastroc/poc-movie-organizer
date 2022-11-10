import express from "express";
import { insertGenre, listGenres, changeNameGenre } from "../controllers/genreControllers.js";
import { validatePlatformGenre } from "../middlewares/joiSchemas.js";

const router = express.Router();

router.post("/genres/insert-genre", validatePlatformGenre, insertGenre);
router.get("/genres", listGenres);
router.put("/genres/update-genre/:genreId", validatePlatformGenre, changeNameGenre);

export default router;