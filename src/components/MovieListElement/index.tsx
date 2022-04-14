import { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Button from '@mui/material/Button';

import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';

import { Movie } from '../../interfaces/Movie';

import './movieListElement.css';
import MovieModal from '../MovieModal';
import { deleteMovie } from '../../app/movies';

interface MovieListElementProps {
	rowNumber: number;
	movie: Movie;
}

const MovieListElement: FC<MovieListElementProps> = ({ rowNumber, movie }) => {
	const [modal, setModal] = useState(false);
	const handleModalClose = () => setModal(false);

	const dispatch = useDispatch();

	return (
		<>
			<TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
				<TableCell component='th' scope='row'>
					{rowNumber}
				</TableCell>
				<TableCell>{movie.title}</TableCell>
				<TableCell>{movie.year}</TableCell>
				<TableCell>
					<img
						src={movie.posterUrl}
						className='poster-thumbnail'
						alt={movie.title}
					/>
				</TableCell>
				<TableCell>
					<Button
						variant='outlined'
						color='error'
						onClick={() => dispatch(deleteMovie(movie.id))}>
						DELETE
						<DeleteIcon />
					</Button>
				</TableCell>
				<TableCell>
					<Button variant='outlined' onClick={() => setModal(true)}>
						VIEW
						<VisibilityIcon />
					</Button>
				</TableCell>
			</TableRow>
			<MovieModal
				id={movie.id}
				open={modal}
				handleModalClose={handleModalClose}
			/>
		</>
	);
};

export default MovieListElement;
