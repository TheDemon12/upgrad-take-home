import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import MovieSearch from './components/MovieSearch';
import MovieList from './components/MovieList';

import { RootState } from './app/store';
import { fetchMoreMovies } from './app/movies';

import './App.css';

const App = () => {
	const [title, setTitle] = useState('');

	const dispatch = useDispatch();
	const { page } = useSelector((state: RootState) => state.movies);

	return (
		<div className='app'>
			<MovieSearch title={title} setTitle={setTitle} />
			<MovieList />

			{page !== 0 && (
				<Container className='load-more-container'>
					<Button
						variant='outlined'
						className='button'
						onClick={() => dispatch(fetchMoreMovies(title))}>
						LOAD MORE
					</Button>
				</Container>
			)}
		</div>
	);
};

export default App;
