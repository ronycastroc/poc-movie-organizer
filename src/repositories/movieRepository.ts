import { QueryResult } from "pg";
import { connection } from "../database/db.js";
import { Movie, MovieEntity } from "../protocols.js";

const readMovie = async (name: string): Promise<QueryResult<MovieEntity>> => {
  return connection.query(`
    SELECT 
      * 
    FROM 
      movie 
    WHERE name ILIKE $1;`, [name]);
};

const createMovie = async (movie: Movie): Promise<QueryResult<MovieEntity>> => {
  return connection.query(`
    INSERT INTO movie 
      (name, "platformId", "genreId") 
    VALUES 
      ($1, $2, $3);`, [movie.name, movie.platformId, movie.genreId]);
}

const readMovies = async (): Promise<QueryResult<MovieEntity>> => {
  return connection.query(`
    SELECT 
      *
    FROM
      movie;
  `);
}

export { readMovie, createMovie, readMovies };