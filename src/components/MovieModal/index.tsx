import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import DeleteIcon from '@mui/icons-material/Delete';

import './movieModal.css';
import { updateMovieTitle } from '../../app/movies';
import { fetchMovie, updateTitle } from '../../app/movie';
import { RootState } from '../../app/store';

interface MovieModalProps {
	id: string;
	open: boolean;
	handleModalClose: () => void;
}

const MovieModal: FC<MovieModalProps> = ({ id, open, handleModalClose }) => {
	const dispatch = useDispatch();
	const { details, error } = useSelector((state: RootState) => state.movie);

	useEffect(() => {
		if (open) dispatch(fetchMovie(id));
	}, [open]);

	return (
		<Modal open={open} onClose={handleModalClose}>
			<Box className='modal-box' bgcolor='background.paper'>
				<TextField
					id='standard-basic'
					label='Title'
					variant='standard'
					value={details.title || ''}
					onChange={e => dispatch(updateTitle(e.target.value))}
					fullWidth
				/>
				<img
					src={details.posterUrl}
					className='movie-poster'
					alt={details.title}
				/>

				<Typography variant='body1' gutterBottom>
					Release Date - {details.releaseDate}
				</Typography>
				<Divider />
				<Typography variant='body1' gutterBottom>
					Directed By - {details.director}
				</Typography>
				<Divider />
				<Typography variant='body1' gutterBottom>
					Genre - {details.genre}
				</Typography>
				<Divider />
				<Typography variant='body1' gutterBottom>
					Actors - {details.actors}
				</Typography>
				<Divider />
				<Typography variant='body1' gutterBottom>
					IMDB Rating - {details.rating}
				</Typography>
				<Divider />
				<Typography variant='body1' gutterBottom>
					Plot - {details.plot}
				</Typography>

				<Stack spacing={4} direction='row' className='modal-buttons'>
					<Button
						variant='contained'
						onClick={() => {
							handleModalClose();
							dispatch(updateMovieTitle(details.id, details.title));
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
