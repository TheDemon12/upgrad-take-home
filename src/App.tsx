import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import SearchIcon from '@mui/icons-material/Search';

import Stack from '@mui/material/Stack';

import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Container from '@mui/material/Container';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';

const App = () => {
	const [title, setTitle] = useState('');
	const [movies, setMovies] = useState<any[]>([]); //add type
	const [sortOrder, setSortOrder] = useState<'ascending' | 'descending'>(
		'ascending'
	);
	const [error, setError] = useState('');

	const sortMovies = (order?: 'ascending' | 'descending') => {
		let newMovies;

		if (order === 'ascending') {
			setSortOrder('descending');
			newMovies = [...movies].sort((a, b) =>
				a.Title.toLowerCase() > b.Title.toLowerCase() ? 1 : -1
			);
		} else {
			setSortOrder('ascending');
			newMovies = [...movies].sort((a, b) =>
				a.Title.toLowerCase() < b.Title.toLowerCase() ? 1 : -1
			);
		}

		setMovies(newMovies);
	};

	const fetchMovies = async () => {
		try {
			let { data } = await axios.get(
				`https://www.omdbapi.com/?s=${title}}&apikey=5690d9bf`
			);
			console.log(title, data);
			if (data.Response === 'True') {
				setMovies(data.Search);
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

	const deleteMovie = (id: string) => {
		const newMovies = movies.filter(m => m.imdbID !== id);
		setMovies(newMovies);
	};

	return (
		<div className='app'>
			<Container maxWidth='md' className='search-container'>
				<Stack spacing={4} direction='row'>
					<FormControl variant='standard'>
						<TextField
							error={!!error}
							id='filled-error'
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
						onClick={fetchMovies}
						className='search-button'>
						Apply
					</Button>
					<Button
						variant='outlined'
						onClick={clearMovies}
						className='clear-button'>
						Clear
						<DeleteIcon />
					</Button>
				</Stack>
			</Container>
			<Container>
				<Stack spacing={4} direction='column'>
					<Button
						variant='outlined'
						className='sort-button'
						onClick={() => sortMovies(sortOrder)}>
						SORT
					</Button>
					<TableContainer component={Paper}>
						<Table sx={{ minWidth: 650 }} aria-label='simple table'>
							<TableHead>
								<TableRow>
									<TableCell>S. No.</TableCell>
									<TableCell width={250}>Movie Title</TableCell>
									<TableCell>Movie Year</TableCell>
									<TableCell>Movie Poster</TableCell>
									<TableCell>Action</TableCell>
									<TableCell>View</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{movies.map((m, i) => (
									<TableRow
										key={i}
										sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
										<TableCell component='th' scope='row'>
											{i + 1}
										</TableCell>
										<TableCell>{m.Title}</TableCell>
										<TableCell>{m.Year}</TableCell>
										<TableCell>
											<img src={m.Poster} className='poster-image' />
										</TableCell>
										<TableCell>
											<Button
												variant='outlined'
												color='error'
												onClick={() => deleteMovie(m.imdbID)}>
												DELETE
												<DeleteIcon />
											</Button>
										</TableCell>
										<TableCell>
											<Button variant='outlined'>
												VIEW
												<VisibilityIcon />
											</Button>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</Stack>
			</Container>
		</div>
	);
};

export default App;
