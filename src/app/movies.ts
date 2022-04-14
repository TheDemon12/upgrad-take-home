import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import { Movie } from '../interfaces/Movie';
import { getMovies } from '../services/movie';
import { mapMovieToViewModel } from '../utils/Models';
import { RootState } from './store';

type SortOrder = 'ascending' | 'descending';

export interface MoviesState {
	list: Movie[];
	error: string;
	page: number;
	sortOrder: SortOrder;
}

const initialState: MoviesState = {
	list: [],
	error: '',
	page: 0,
	sortOrder: 'ascending',
};

const sortMoviesByAscendingOrder = (list: Movie[]) =>
	list.sort((a, b) => (a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1));

export const moviesSlice = createSlice({
	name: 'movies',
	initialState,
	reducers: {
		initialMoviesAdded: (movies, action: PayloadAction<Movie[]>) => {
			movies.list = action.payload;
		},
		moviesAdded: (movies, action: PayloadAction<Movie[]>) => {
			movies.list = movies.list.concat(action.payload);
		},
		moviesCleared: movies => {
			movies.list = [];
		},
		movieRemoved: (movies, action: PayloadAction<string>) => {
			movies.list = movies.list.filter(m => m.id !== action.payload);
		},

		moviesSortedByAscendingOrder: movies => {
			movies.list = sortMoviesByAscendingOrder(movies.list);
		},

		moviesSortedByDescendingOrder: movies => {
			movies.list = sortMoviesByAscendingOrder(movies.list).reverse();
		},
		pageChanged: (movies, action: PayloadAction<number>) => {
			movies.page = action.payload;
		},
		errorUpdated: (movies, action: PayloadAction<string>) => {
			movies.error = action.payload;
		},
		sortOrderChanged: (movies, action: PayloadAction<SortOrder>) => {
			movies.sortOrder = action.payload;
		},
		movieTitleUpdated: (
			movies,
			action: PayloadAction<{ id: string; title: string }>
		) => {
			movies.list = movies.list.map(movie => {
				if (movie.id === action.payload.id)
					return { ...movie, title: action.payload.title };
				return movie;
			});
		},
	},
});

export const {
	movieRemoved,
	initialMoviesAdded,
	moviesAdded,
	moviesCleared,
	moviesSortedByAscendingOrder,
	moviesSortedByDescendingOrder,
	pageChanged,
	errorUpdated,
	sortOrderChanged,
	movieTitleUpdated,
} = moviesSlice.actions;

export default moviesSlice.reducer;

export const fetchMovies =
	(title: string) => async (dispatch: Dispatch, getState: () => RootState) => {
		try {
			let { response, fetchedMovies, error: resError } = await getMovies(title);
			if (response) {
				const movies = fetchedMovies.map(fm => mapMovieToViewModel(fm));

				dispatch(initialMoviesAdded(movies));
				dispatch(pageChanged(1));
				dispatch(errorUpdated(''));
			} else dispatch(errorUpdated(resError));
		} catch (ex) {
			console.log(ex);
		}
	};

export const fetchMoreMovies =
	(title: string) => async (dispatch: Dispatch, getState: () => RootState) => {
		let { page } = getState().movies;
		let currPage = page + 1;

		try {
			let {
				response,
				fetchedMovies,
				error: resError,
			} = await getMovies(title, currPage);
			if (response) {
				const movies = fetchedMovies.map(fm => mapMovieToViewModel(fm));

				dispatch(moviesAdded(movies));
				dispatch(pageChanged(currPage));
				dispatch(errorUpdated(''));
			} else dispatch(errorUpdated(resError));
		} catch (ex) {
			console.log(ex);
		}
	};

export const clearMovies = () => async (dispatch: Dispatch) => {
	dispatch(moviesCleared());
	dispatch(errorUpdated(''));
	dispatch(pageChanged(0));
};

export const sortMovies =
	() => async (dispatch: Dispatch, getState: () => RootState) => {
		let { sortOrder } = getState().movies;

		if (sortOrder === 'ascending') {
			dispatch(moviesSortedByAscendingOrder());
			dispatch(sortOrderChanged('descending'));
		} else {
			dispatch(moviesSortedByDescendingOrder());
			dispatch(sortOrderChanged('ascending'));
		}
	};

export const deleteMovie = (id: string) => movieRemoved(id);

export const updateMovieTitle = (id: string, title: string) =>
	movieTitleUpdated({ id, title });
