import axios from 'axios';

interface ResponseError {
	response: {
		status: number;
	};
}

axios.defaults.baseURL = 'https://www.omdbapi.com/';

axios.interceptors.response.use(undefined, (error: ResponseError) => {
	const expectedError =
		error.response &&
		error.response.status >= 400 &&
		error.response.status < 500;

	if (!expectedError) {
		console.log('error is', error);
	}

	return Promise.reject(error);
});

const http = {
	get: axios.get,
	post: axios.post,
	put: axios.put,
	delete: axios.delete,
};

export default http;
