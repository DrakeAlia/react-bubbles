import axios from 'axios';

// Stage 1 - Authentication
export const axiosWithAuth = () => {
	const token = localStorage.getItem('token');

	return axios.create({
		baseURL: 'http://localhost:5000',
		headers: {
			Authorization: token
		}
	});
};
