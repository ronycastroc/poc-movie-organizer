import { NextFunction, Request, Response } from "express";
import joi from "joi";
import httpStatus from "http-status";

const movieSchema = joi.object({
  name: joi.string().min(2).max(30).required(),
  platformId: joi.number().greater(0).integer().required(),
  genreId: joi.number().greater(0).integer().required(),
});

const checkMovieSchema = joi.object({
  status: joi.string().valid('uncheck', 'check').required(),
  rating: joi.number().min(0).max(10).integer().required()
});

const platformGenreSchema = joi.object({
  name: joi.string().min(2).max(30).required()
});

const validateMovie = async (req: Request, res: Response, next: NextFunction) => {
  const movie = req.body;

  const validation = movieSchema.validate(req.body, { abortEarly: false });

  if (validation.error) {
    const error = validation.error.details.map(value => value.message);

    return res.status(httpStatus.UNPROCESSABLE_ENTITY).send(error);
  }

  res.locals.movie = movie;
  next();
};

const validateCheckMovie = async (req: Request, res: Response, next: NextFunction) => {
  const movieCheck = req.body;

  const validation = checkMovieSchema.validate(req.body, { abortEarly: false });

  if (validation.error) {
    const error = validation.error.details.map(value => value.message);

    return res.status(httpStatus.UNPROCESSABLE_ENTITY).send(error);
  }

  res.locals.movieCheck = movieCheck;
  next();
};

const validatePlatformGenre = async (req: Request, res: Response, next: NextFunction) => {
  const platformGenre = req.body;

  const validation = platformGenreSchema.validate(req.body, { abortEarly: false });

  if (validation.error) {
    const error = validation.error.details.map(value => value.message);

    return res.status(httpStatus.UNPROCESSABLE_ENTITY).send(error);
  }

  res.locals.platformGenre = platformGenre;
  next();
};

export { validateMovie, validateCheckMovie, validatePlatformGenre };

