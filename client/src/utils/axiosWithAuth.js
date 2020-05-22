import axios from 'axios';

// Stage 1 - Authentication
// Build a axiosWithAuth module to create an instance of axios with the authentication header
// Save the token to localStorage
export const axiosWithAuth = () => {
	const token = localStorage.getItem('token');

	return axios.create({
		baseURL: 'http://localhost:5000',
		headers: {
			Authorization: token
		}
	});
};
