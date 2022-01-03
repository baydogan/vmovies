import axios from "axios";
// const qs = require('qs');

const apiClient = axios.create({
	baseURL: "http://localhost:3000",
	withCredentials: false,
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json",
	},
});

export default {
	addMovie(id, watchList) {
		return apiClient.patch(`/users/${id}`, { watchList });
	},

	getUser(userName, password) {
		return apiClient.get(`/users?userName=${userName}&password=${password}`);
	},

	addUser(formData) {
		return apiClient.post("/users", formData);
	},
};
