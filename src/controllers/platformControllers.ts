import { Request, Response } from "express";
import * as platformRepository from "../repositories/platformRepository.js"
import { PlatformGenre } from "../protocols.js";
import httpStatus from "http-status";

const insertPlatform = async (req: Request, res: Response) => {
  const platform = res.locals.platformGenre as PlatformGenre;

  try {
    const isPlatform = await platformRepository.readPlatform(platform.name);
    
      if (isPlatform.rowCount !== 0) {
        return res.status(httpStatus.BAD_REQUEST).send(`The platform already exists.`);
      }

    const result = await platformRepository.createPlatform(platform);
    
    res.status(httpStatus.CREATED).send(`${result.rowCount} platform inserted sucessfull.`)

  } catch (error) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
  }
};

const listPlatforms = async (req: Request, res: Response) => {

  try {
    const platforms = await platformRepository.readPlatforms();

    res.status(httpStatus.OK).send(platforms.rows);

  } catch (error) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
  }
};

const changeNamePlatform = async (req: Request, res: Response) => {
  const { platformId } = req.params;
  const platform = res.locals.platformGenre as PlatformGenre;

  try {
    const result = await platformRepository.updatePlatform(platform, Number(platformId));

    if (result.rowCount === 0) {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }

    res.status(httpStatus.OK).send(`${result.rowCount} platform update successful.`);

  } catch (error) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
  }
};

export {
  insertPlatform,
  listPlatforms,
  changeNamePlatform
};