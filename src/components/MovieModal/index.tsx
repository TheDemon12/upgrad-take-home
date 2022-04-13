import { FC, useState, useEffect } from 'react';
import axios from 'axios';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import DeleteIcon from '@mui/icons-material/Delete';

import { ExpandedFetchedMovie, ExpandedMovie } from '../../interfaces/Movie';
import { mapExpandedMovieToViewModel } from '../../utils/Models';

import './movieModal.css';
import { getMovie } from '../../services/movie';

interface MovieModalProps {
	id: string;
	open: boolean;
	handleModalClose: () => void;
	handleMovieTitleChange: (id: string, updatedTitle: string) => void;
}

const MovieModal: FC<MovieModalProps> = ({
	id,
	open,
	handleModalClose,
	handleMovieTitleChange,
}) => {
	const [movie, setMovie] = useState<ExpandedMovie>();
	const [error, setError] = useState('');

	const fetchMovie = async (id: string) => {
		try {
			let { response, fetchedMovie, error } = await getMovie(id);

			if (response) {
				const movie = mapExpandedMovieToViewModel(fetchedMovie);

				setMovie(movie);
				setError('');
			} else setError(error);
		} catch (ex) {}
	};

	useEffect(() => {
		if (open) fetchMovie(id);
	}, [open]);

	return (
		<Modal open={open} onClose={handleModalClose}>
			<Box className='modal-box' bgcolor='background.paper'>
				<TextField
					id='standard-basic'
					label='Title'
					variant='standard'
					value={movie?.title || ''}
					onChange={e => movie && setMovie({ ...movie, title: e.target.value })}
					fullWidth
				/>
				<img
					src={movie?.posterUrl}
					className='movie-poster'
					alt={movie?.title}
				/>

				<Typography variant='body1' gutterBottom>
					Release Date - {movie?.releaseDate}
				</Typography>
				<Divider />
				<Typography variant='body1' gutterBottom>
					Directed By - {movie?.director}
				</Typography>
				<Divider />
				<Typography variant='body1' gutterBottom>
					Genre - {movie?.genre}
				</Typography>
				<Divider />
				<Typography variant='body1' gutterBottom>
					Actors - {movie?.actors}
				</Typography>
				<Divider />
				<Typography variant='body1' gutterBottom>
					IMDB Rating - {movie?.rating}
				</Typography>
				<Divider />
				<Typography variant='body1' gutterBottom>
					Plot - {movie?.plot}
				</Typography>

				<Stack spacing={4} direction='row' className='modal-buttons'>
					<Button
						variant='contained'
						onClick={() => {
							handleModalClose();
							handleMovieTitleChange(movie!.id, movie!.title);
						}}
						className='button'>
						Save
					</Button>
					<Button
						variant='outlined'
						onClick={handleModalClose}
						color='error'
						className='button'>
						Discard Changes
						<DeleteIcon />
					</Button>
				</Stack>
			</Box>
		</Modal>
	);
};

export default MovieModal;
