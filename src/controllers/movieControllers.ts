import { Request, Response } from "express";
import * as movieRepository from "../repositories/movieRepository.js"
import { Movie } from "../protocols.js";
import httpStatus from "http-status";

const insertMovie = async (req: Request, res: Response) => {
  const movie = res.locals.movie as Movie;

  try {
    const isMovie = await movieRepository.readMovie(movie.name);
    
      if (isMovie.rowCount !== 0) {
        return res.status(httpStatus.BAD_REQUEST).send(`The movie already exists.`);
      }

    const result = await movieRepository.createMovie(movie);
    
    res.status(httpStatus.CREATED).send(`${result.rowCount} movie inserted sucessfull.`)

  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
  }
};

export { insertMovie };