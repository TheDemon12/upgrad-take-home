export interface FetchedMovie {
	imdbID: string;
	Title: string;
	Year: string;
	Poster: string;
}
export interface Movie {
	id: string;
	title: string;
	year: string;
	posterUrl: string;
}

export interface ExpandedFetchedMovie extends FetchedMovie {
	Genre: string;
	Released: string;
	Actors: string;
	Plot: string;
	imdbRating: string;
	Director: string;
}
export interface ExpandedMovie extends Movie {
	genre: string;
	releaseDate: string;
	actors: string;
	plot: string;
	rating: string;
	director: string;
}
