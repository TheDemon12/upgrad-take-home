import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import MovieListElement from '../MovieListElement';

import { RootState } from '../../app/store';
import { sortMovies } from '../../app/movies';

import './movieList.css';

const MovieList: FC = () => {
	const dispatch = useDispatch();
	const { list } = useSelector((state: RootState) => state.movies);

	return (
		<Container>
			<Stack spacing={4} direction='column'>
				<Button
					variant='outlined'
					className='sort-button'
					onClick={() => dispatch(sortMovies())}>
					SORT
				</Button>
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 650 }}>
						<TableHead>
							<TableRow>
								<TableCell>S. No.</TableCell>
								<TableCell width={250}>Movie Title</TableCell>
								<TableCell>Movie Year</TableCell>
								<TableCell width={250}>Movie Poster</TableCell>
								<TableCell>Action</TableCell>
								<TableCell>View</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{list.map((movie, index) => (
								<MovieListElement
									key={index}
									movie={movie}
									rowNumber={index + 1}
								/>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Stack>
		</Container>
	);
};

export default MovieList;
