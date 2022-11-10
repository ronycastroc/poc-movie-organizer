import { QueryResult } from "pg";
import { connection } from "../database/db.js";
import { Movie, MovieCheck, MovieEntity } from "../protocols.js";

const createMovie = async (movie: Movie): Promise<QueryResult<MovieEntity>> => {
  return connection.query(`
    INSERT INTO movie 
      (name, "platformId", "genreId") 
    VALUES 
      ($1, $2, $3);`, [movie.name, movie.platformId, movie.genreId]);
};

const readMovie = async (name: string): Promise<QueryResult<MovieEntity>> => {
  return connection.query(`
    SELECT 
      * 
    FROM 
      movie 
    WHERE name ILIKE $1;`, [name]);
};

const readMovies = async (): Promise<QueryResult<MovieEntity>> => {
  return connection.query(`
    SELECT 
      *
    FROM
      movie;
  `);
};

const readMovieById = async (movieId: number): Promise<QueryResult<MovieEntity>> => {
  return connection.query(`
    SELECT 
      * 
    FROM 
      movie 
    WHERE id = $1;`, [movieId]);
};

const updateMovie = async (movieCheck: MovieCheck, movieId: number): Promise<QueryResult<MovieEntity>> => {
  return connection.query(`
    UPDATE 
      movie 
    SET 
      status = $1, rating = $2 
    WHERE 
      id = $3;`, [movieCheck.status, movieCheck.rating, movieId]);
};

export { 
  readMovie, 
  createMovie, 
  readMovies, 
  updateMovie,
  readMovieById 
};