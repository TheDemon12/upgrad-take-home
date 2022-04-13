import {
	FetchedMovie,
	Movie,
	ExpandedFetchedMovie,
	ExpandedMovie,
} from '../interfaces/Movie';

export const mapMovieToViewModel = ({
	imdbID,
	Title,
	Year,
	Poster,
}: FetchedMovie): Movie => ({
	id: imdbID,
	title: Title,
	year: Year,
	posterUrl: Poster,
});

export const mapExpandedMovieToViewModel = ({
	Actors,
	Genre,
	Plot,
	Released,
	imdbRating,
	Director,
	...rest
}: ExpandedFetchedMovie): ExpandedMovie => ({
	actors: Actors,
	genre: Genre,
	releaseDate: Released,
	rating: imdbRating,
	plot: Plot,
	director: Director,
	...mapMovieToViewModel(rest),
});
