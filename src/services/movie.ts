import http from './http';
import { FetchedMovie, ExpandedFetchedMovie } from '../interfaces/Movie';

const apiKey = '5690d9bf'; // CAM BE EXTRACTED TO ENV VARIABLE

export const getMovies = async (title: string, page?: number) => {
	const { data } = await http.get('/', {
		params: {
			apikey: apiKey,
			s: title,
			page: page || 1,
		},
	});

	return {
		response: data.Response === 'True',
		fetchedMovies: data.Search as FetchedMovie[],
		error: data.Error,
	};
};

export const getMovie = async (id: string) => {
	const { data } = await http.get('/', {
		params: {
			apikey: apiKey,
			i: id,
		},
	});

	return {
		response: data.Response === 'True',
		fetchedMovie: data as ExpandedFetchedMovie,
		error: data.Error,
	};
};
