export type MovieEntity = {
  id: number,
  name: string,
  platformId: number,
  genreId: number,
  status: string,
  rating: number | null 
}

export type Movie = Omit<MovieEntity, "id" | "status" | "rating">

export type MovieCheck = Partial<MovieEntity>

export type PlatformGenreEntity = {
  id: number,
  name: string
}

export type PlatformGenre = Omit<PlatformGenreEntity, "id">