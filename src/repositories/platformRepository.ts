import { QueryResult } from "pg";
import { connection } from "../database/db.js";
import { PlatformGenreEntity, PlatformGenre } from "../protocols.js";

const creatPlatform = async (platform: PlatformGenre): Promise<QueryResult<PlatformGenreEntity>> => {
  return connection.query(`
    INSERT INTO 
      platform (name) 
    VALUES ($1);`, [platform.name]);
};

const readPlatforms = async (): Promise<QueryResult<PlatformGenreEntity>> => {
  return connection.query(`
    SELECT 
      * 
    FROM 
      platform;`);
};

const readPlatform = async (name: string): Promise<QueryResult<PlatformGenreEntity>> => {
  return connection.query(`
    SELECT 
      * 
    FROM 
      platform 
    WHERE name ILIKE $1;`, [name]);
};

const updatePlatform = async (platform: PlatformGenre, platformId: number): Promise<QueryResult<PlatformGenreEntity>> => {
  return connection.query(`
    UPDATE 
      platform 
    SET 
      name = $1 
    WHERE 
      id = $2;`, [platform.name, platformId]);
};

export {
  creatPlatform,
  readPlatforms,
  readPlatform,
  updatePlatform
};



