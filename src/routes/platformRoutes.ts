import express from "express";
import { insertPlatform, listPlatforms, changeNamePlatform  } from "../controllers/platformControllers.js";
import { validatePlatformGenre } from "../middlewares/joiSchemas.js";

const router = express.Router();

router.post("/platforms/insert-platform", validatePlatformGenre, insertPlatform);
router.get("/platforms", listPlatforms);
router.put("/platforms/update-platform/:platformId", validatePlatformGenre, changeNamePlatform);

export default router;