import { Request, Response } from "express";
import * as genreRepository from "../repositories/genreRepository.js";
import { PlatformGenre } from "../protocols.js";
import httpStatus from "http-status";

const insertGenre = async (req: Request, res: Response) => {
  const genre = res.locals.platformGenre as PlatformGenre;

  try {
    const isGenre = await genreRepository.readGenre(genre.name);
    
      if (isGenre.rowCount !== 0) {
        return res.status(httpStatus.BAD_REQUEST).send(`The genre already exists.`);
      }

    const result = await genreRepository.createGenre(genre);
    
    res.status(httpStatus.CREATED).send(`${result.rowCount} genre inserted sucessfull.`);

  } catch (error) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
  }
};

const listGenres = async (req: Request, res: Response) => {

  try {
    const genres = await genreRepository.readGenres();

    res.status(httpStatus.OK).send(genres.rows);

  } catch (error) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
  }
};

const changeNameGenre = async (req: Request, res: Response) => {
  const { genreId } = req.params;
  const genre = res.locals.platformGenre as PlatformGenre;

  try {
    const result = await genreRepository.updateGenre(genre, Number(genreId));

    if (result.rowCount === 0) {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }

    res.status(httpStatus.OK).send(`${result.rowCount} genre update successful.`);

  } catch (error) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
  }
};

export {
  insertGenre,
  listGenres,
  changeNameGenre
};