import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import { ExpandedMovie } from '../interfaces/Movie';
import { getMovie } from '../services/movie';
import { mapExpandedMovieToViewModel } from '../utils/Models';

export interface MovieState {
	details: ExpandedMovie;
	error: string;
}

const initialState: MovieState = {
	details: {
		id: '',
		title: '',
		posterUrl: '',
		releaseDate: '',
		actors: '',
		director: '',
		genre: '',
		plot: '',
		rating: '',
		year: '',
	},
	error: '',
};

export const movieSlice = createSlice({
	name: 'movie',
	initialState,
	reducers: {
		movieAdded: (movies, action: PayloadAction<ExpandedMovie>) => {
			movies.details = action.payload;
		},
		errorUpdated: (movies, action: PayloadAction<string>) => {
			movies.error = action.payload;
		},
		titleUpdated: (movies, action: PayloadAction<string>) => {
			movies.details.title = action.payload;
		},
	},
});

export const { movieAdded, errorUpdated, titleUpdated } = movieSlice.actions;

export default movieSlice.reducer;

export const fetchMovie = (id: string) => async (dispatch: Dispatch) => {
	try {
		let { response, fetchedMovie, error: resError } = await getMovie(id);
		if (response) {
			const movie = mapExpandedMovieToViewModel(fetchedMovie);

			dispatch(movieAdded(movie));

			dispatch(errorUpdated(''));
		} else dispatch(errorUpdated(resError));
	} catch (ex) {
		console.log(ex);
	}
};

export const updateTitle = (title: string) => titleUpdated(title);
