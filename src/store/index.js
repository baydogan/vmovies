import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";
// import UserDataService from "../services/UserDataService";
var ls = new SecureLS({ isCompression: false });

export default createStore({
	state: {
		user: null,
		cryptoKey: "vmoies12345",
	},

	mutations: {
		SET_USER(state, user) {
			state.user = user;
		},
		SING_OUT(state) {
			state.user = null;
		},

		ADD_MOVIE_TO_WATCHLIST(state, movie) {
			state.user.watchList = movie
		},
	},

	actions: {
		// addWatchList({ commit }, userId, watchList) {
		// 	UserDataService.addMovie(userId, watchList)
		// 		.then(() => {
		// 			commit("ADD_MOVIE_TO_WATCHLIST", userId,  watchList);
		// 		})
		// 		.catch((e) => {
		// 			console.log(e);
		// 		});
		// },
	},
	getters: {
		user: (state) => state.user,
		userId: (state) => state.user?.id,
		userWList: (state) => state.user?.watchList || [],
		isAuth: (state) => state.user !== null,
		cryptoKey: (state) => state.cryptoKey,
		displaySearchBar: (state) => state.displaySearchBar,
	},

	plugins: [
		createPersistedState({
			storage: {
				getItem: (key) => ls.get(key),
				setItem: (key, value) => ls.set(key, value),
				removeItem: (key) => ls.remove(key),
			},
		}),
	],
});
