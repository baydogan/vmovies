import * as env from "../env";
import axios from "axios";

export const resetData = (data) => Object.keys(data).forEach((key) => (data[key] = null));

export const newDate = () => {
	const dateOptions = { year: "numeric", month: "long", day: "numeric" };
	const date = new Date().toLocaleString("en-US", dateOptions);
	return date;
};

export const posterPath = (poster_path) => {
	if (poster_path) {
		return env.posterPath + poster_path;
	} else {
		return env.emptyImageURL;
	}
};

export const stringTruncate = (string, firstIndex, sencondIndex) => {
	if (string.length > sencondIndex) {
		return string.slice(firstIndex, sencondIndex) + "...";
	} else {
		return string;
	}
};

export const fetchMovie = (url, moveID) => {
	return axios
		.get(`${url}${moveID}?api_key=${env.apiKey}&language=en-US`)
		.then((response) => response.data);
};

export const fetchPopularMovies = () => {
	return axios
		.get(`${env.popularMoviesURL}${env.apiKey}&language=en-US&page=1`)
		.then((response) => response.data.results);
};

export const checkBoolean = (value) => {
	return Boolean(value);
};

export const findById = (resource, id) => {
	return resource?.find((m) => m.id === id)
}


