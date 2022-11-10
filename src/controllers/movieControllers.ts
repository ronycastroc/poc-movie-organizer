import { Request, Response } from "express";
import * as movieRepository from "../repositories/movieRepository.js"
import { Movie, MovieCheck } from "../protocols.js";
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

const listMovies = async (req: Request, res: Response) => {

  try {
    const movies = await movieRepository.readMovies();

    res.status(httpStatus.OK).send(movies.rows);

  } catch (error) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
  }
};

const checkMovie = async (req: Request, res: Response) => {
  const { movieId } = req.params;
  const movieCheck = res.locals.movieCheck as MovieCheck;

  try {
    const isMovie = await movieRepository.readMovieById(Number(movieId));

    if (isMovie.rowCount === 0) {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }

    const result = await movieRepository.updateMovie(movieCheck, Number(movieId));

    if (result.rowCount === 0) {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }

    res.status(httpStatus.OK).send(`${result.rowCount} movie update successful.`);

  } catch (error) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
  }
};

const deleteMovie = async (req: Request, res: Response) => {
  const { movieId } = req.params;

  try {
    const isMovie = await movieRepository.readMovieById(Number(movieId));

    if (isMovie.rowCount === 0) {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }

    const result = await movieRepository.deleteMovieById(Number(movieId));

    if (result.rowCount === 0) {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }

    res.status(httpStatus.OK).send(`${result.rowCount} movie deleted successful.`);

  } catch (error) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
  }
};

export { 
  insertMovie, 
  listMovies, 
  checkMovie,
  deleteMovie
};