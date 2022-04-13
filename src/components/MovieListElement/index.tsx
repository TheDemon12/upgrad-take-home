import { FC, useState } from 'react';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Button from '@mui/material/Button';

import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';

import { Movie } from '../../interfaces/Movie';

import './movieListElement.css';
import MovieModal from '../MovieModal';

interface MovieListElementProps {
	rowNumber: number;
	movie: Movie;
	deleteMovie: (id: string) => void;
	handleMovieTitleChange: (id: string, updatedTitle: string) => void;
}

const MovieListElement: FC<MovieListElementProps> = ({
	rowNumber,
	movie,
	deleteMovie,
	handleMovieTitleChange,
}) => {
	const [modal, setModal] = useState(false);
	const handleModalClose = () => setModal(false);

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
						onClick={() => deleteMovie(movie.id)}>
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
				handleMovieTitleChange={handleMovieTitleChange}
			/>
		</>
	);
};

export default MovieListElement;
