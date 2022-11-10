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
  rating: joi.number().min(1).max(10).integer().required()
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

export { validateMovie };

