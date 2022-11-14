
# Movie Organizer

This application seeks to organize movies and series in a very easy and practical way, adding them to a wish list, being able to update them from "uncheck" to "check" and adding a rate to it.

## This project was built with:

```bash
Node
TypeScript
PostgreSQL
```


## How to run for development

*1.* Clone this repository.

*2.* Install all dependencies.

```bash
npm i
```
*3.* Create a PostgreSQL database with whatever name you want.

*4.* Configure the .env file using the .env.example file. 

*5.* Dump the database using **dump.sql** file


## How to use API

To add a new movie to the api, you must first create the genre and platform for that movie. Because the movie is created according to the id of the existing genre and platform.

*1.* List existing genres.

```
GET request in route "/genres"
Example return model:

[
 {
  "id": 4,
  "name": "Sci-Fi"
 }
]
```

*2.* Genre creation.

```
POST request in route "/genres/insert-genre" 
With a body in json format:

{
  "name": "string"
}
```

*3.* Update an existing genre.

```
PUT request in route "/genres/update-genre/:genreId" 
With a "genreId" in params and a body in json format:

{
  "name": "string"
}
```

*4.* List existing platforms.

```
GET request in route "/platforms"
Example return model:

[
 {
  "id": 3,
  "name": "Prime Video"
 }
]
```

*5.* Platform creation.

```
POST request in route "/platforms/insert-platform" 
With a body in json format:

{
  "name": "string"
}
```

*6.* Update an existing platform.

```
PUT request in route "/platforms/update-platform/:platformId" 
With a "platformId" in params and a body in json format:

{
  "name": "string"
}
```

*7.* List existing movies.

```
GET request in route "/movies"
Example return model:

[
 {
  "id": 1,
  "name": "Iron Man",
  "platformName": "Disney+",
  "genreName": "Hero",
  "status": "uncheck",
  "rating": null
 },
 {
  "id": 2,
  "name": "Round 6",
  "platformName": "Netflix",
  "genreName": "Horror",
  "status": "check",
  "rating": 9
 }
]
```

*8.* Movie creation.

```
POST request in route "/movies/insert-movie" 
With a body in json format:

{
  "name": "string",
  "platformId": number,
  "genreId" number
}
```

*9.* Adding a check and a rating to the existing movie.

```
PUT request in route "/movies/check-movie/:movieId" 
With a "movieId" in params and a body in json format:

{
  "status": "check" or "uncheck",
  "rating": number (0 to 10)
}
```

*10.* Deleting an existing movie

```
DELETE request in route "/movies/delete-movie/:movieId" 
With a "movieId" in params.
```
*11.* List the number of movies by platform.

```
GET request in route "/movies/movies-platform"
Example return model:

[
 {
  "id": 3,
  "platform": "Netflix",
  "movieCount": "6"
 }
]
```

*12.* List the number of movies by genre.

```
GET request in route "/movies/movies-genre"
Example return model:

[
 {
  "id": 2,
  "platform": "Comedy",
  "movieCount": "3"
 }
]
```









