import { QueryResult } from "pg";
import { connection } from "../database/db.js";
import { PlatformGenreEntity, PlatformGenre } from "../protocols.js";

const creatGenre = async (genre: PlatformGenre): Promise<QueryResult<PlatformGenreEntity>> => {
  return connection.query(`
    INSERT INTO 
      genre (name) 
    VALUES ($1);`, [genre.name]);
};

const readGenres = async (): Promise<QueryResult<PlatformGenreEntity>> => {
  return connection.query(`
    SELECT 
      * 
    FROM 
      genre;`);
};

const readGenre = async (name: string): Promise<QueryResult<PlatformGenreEntity>> => {
  return connection.query(`
    SELECT 
      * 
    FROM 
      genre 
    WHERE name ILIKE $1;`, [name]);
};

const updateGenre = async (genre: PlatformGenre, genreId: number): Promise<QueryResult<PlatformGenreEntity>> => {
  return connection.query(`
    UPDATE 
      genre 
    SET 
      name = $1 
    WHERE 
      id = $2;`, [genre.name, genreId]);
};

export {
  creatGenre,
  readGenres,
  readGenre,
  updateGenre
};