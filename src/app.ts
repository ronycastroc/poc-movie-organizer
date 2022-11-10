import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { PORT } from "./configs/constants.js";
import movieRoutes from "./routes/movieRoutes.js"

const app = express();
app
  .use(express.json())
  .get("/health", (req, res) => res.send("Ok"))
  .use(movieRoutes);
  
app.listen(PORT, () => console.log(`Listening on ${PORT}`));

