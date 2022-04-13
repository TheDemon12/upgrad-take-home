import { FC } from 'react';

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

import { Movie } from '../../interfaces/Movie';

import './movieList.css';

interface MovieListProps {
	movies: Movie[];
	deleteMovie: (id: string) => void;
	sortMovies: () => void;
	handleMovieTitleChange: (id: string, updatedTitle: string) => void;
}

const MovieList: FC<MovieListProps> = ({
	movies,
	deleteMovie,
	sortMovies,
	handleMovieTitleChange,
}) => {
	return (
		<Container>
			<Stack spacing={4} direction='column'>
				<Button variant='outlined' className='sort-button' onClick={sortMovies}>
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
							{movies.map((movie, index) => (
								<MovieListElement
									key={index}
									movie={movie}
									rowNumber={index + 1}
									deleteMovie={deleteMovie}
									handleMovieTitleChange={handleMovieTitleChange}
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
