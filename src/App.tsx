import axios from 'axios';
import { useState } from 'react';

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import MovieSearch from './components/MovieSearch';
import MovieList from './components/MovieList';

import { getMovies } from './services/movie';

import { FetchedMovie, Movie } from './interfaces/Movie';
import { mapMovieToViewModel } from './utils/Models';

import './App.css';

type SortOrder = 'ascending' | 'descending';

const App = () => {
	const [title, setTitle] = useState('');
	const [error, setError] = useState('');
	const [movies, setMovies] = useState<Movie[]>([]);
	const [sortOrder, setSortOrder] = useState<SortOrder>('ascending');

	const [page, setPage] = useState(0);

	const fetchMovies = async () => {
		try {
			let { response, fetchedMovies, error } = await getMovies(title);
			if (response) {
				const movies = fetchedMovies.map(fm => mapMovieToViewModel(fm));
				setMovies(movies);
				setError('');

				setPage(page + 1);
			} else setError(error);
		} catch (ex) {
			console.log(ex);
		}
	};

	const loadMoreMovies = async () => {
		let currPage = page + 1;
		try {
			let { response, fetchedMovies, error } = await getMovies(title, currPage);

			if (response) {
				const newMovies = fetchedMovies.map(fm => mapMovieToViewModel(fm));
				setMovies(movies.concat(newMovies));
				setError('');
			} else setError(error);

			setPage(currPage);
		} catch (ex) {
			console.log(ex);
		}
	};

	const clearMovies = () => {
		setTitle('');
		setMovies([]);
		setError('');
		setPage(0);
	};

	const handleMovieSort = () => {
		const newMovies = [...movies].sort((a, b) =>
			a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1
		);

		if (sortOrder === 'ascending') setMovies(newMovies);
		else setMovies(newMovies.reverse());

		changeSortOrder();
	};

	const changeSortOrder = () => {
		if (sortOrder === 'ascending') setSortOrder('descending');
		else setSortOrder('ascending');
	};

	const handleMovieTitleChange = (id: string, updatedTitle: string) => {
		const newMovies = movies.map(movie => {
			if (movie.id === id) return { ...movie, title: updatedTitle };
			return movie;
		});

		setMovies(newMovies);
	};

	const handleMovieDelete = (id: string) => {
		const newMovies = movies.filter(m => m.id !== id);
		setMovies(newMovies);
	};

	return (
		<div className='app'>
			<MovieSearch
				title={title}
				setTitle={setTitle}
				error={error}
				fetchMovies={fetchMovies}
				clearMovies={clearMovies}
			/>

			<MovieList
				movies={movies}
				deleteMovie={handleMovieDelete}
				sortMovies={handleMovieSort}
				handleMovieTitleChange={handleMovieTitleChange}
			/>

			{page !== 0 && (
				<Container className='load-more-container'>
					<Button
						variant='outlined'
						className='button'
						onClick={loadMoreMovies}>
						LOAD MORE
					</Button>
				</Container>
			)}
		</div>
	);
};

export default App;
