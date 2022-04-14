import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';

import { RootState } from '../../app/store';
import { clearMovies, fetchMovies } from '../../app/movies';

import './movieSearch.css';

interface MovieSearchProps {
	title: string;
	setTitle: (title: string) => void;
}

const MovieSearch: FC<MovieSearchProps> = ({ title, setTitle }) => {
	const { error } = useSelector((state: RootState) => state.movies);
	const dispatch = useDispatch();

	return (
		<Container className='search-container'>
			<Stack spacing={4} direction='row'>
				<FormControl variant='standard'>
					<TextField
						error={!!error}
						label='Search movie by title'
						value={title}
						onChange={e => setTitle(e.target.value)}
						variant='filled'
						InputProps={{
							endAdornment: (
								<InputAdornment position='start'>
									<SearchIcon />
								</InputAdornment>
							),
						}}
						helperText={error}
					/>
				</FormControl>
				<Button
					variant='contained'
					onClick={() => dispatch(fetchMovies(title))}
					className='button'>
					Apply
				</Button>
				<Button
					variant='outlined'
					onClick={() => {
						setTitle('');
						dispatch(clearMovies());
					}}
					className='button'>
					Clear
					<DeleteIcon />
				</Button>
			</Stack>
		</Container>
	);
};

export default MovieSearch;
