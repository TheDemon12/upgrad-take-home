import axios from 'axios';
import { useState } from 'react';

import MovieSearch from './components/MovieSearch';
import MovieList from './components/MovieList';

import { FetchedMovie, Movie } from './interfaces/Movie';
import { mapMovieToViewModel } from './utils/Models';

import './App.css';

type SortOrder = 'ascending' | 'descending';

const App = () => {
	const [title, setTitle] = useState('');
	const [error, setError] = useState('');
	const [movies, setMovies] = useState<Movie[]>([]);
	const [sortOrder, setSortOrder] = useState<SortOrder>('ascending');

	const fetchMovies = async () => {
		try {
			let { data } = await axios.get(
				`https://www.omdbapi.com/?s=${title}}&apikey=5690d9bf`
			);
			if (data.Response === 'True') {
				const movies = (data.Search as FetchedMovie[]).map(fm =>
					mapMovieToViewModel(fm)
				);
				setMovies(movies);
				setError('');
			} else setError(data.Error);
		} catch (ex) {
			console.log(ex);
		}
	};

	const clearMovies = () => {
		setTitle('');
		setMovies([]);
		setError('');
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
		</div>
	);
};

export default App;
