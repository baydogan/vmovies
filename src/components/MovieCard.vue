<template>
	<div class="w-card flex flex-col rounded-md shadow-lg mb-10">
		<div class="relative shadow-lg">
			<img :src="posterPath(movie.poster_path)" alt="" />
		</div>
		<div class="h-card flex justify-center flex-col">
			<div class="text-center">
				<h3 class="font-semibold">{{ movie.title }}</h3>
			</div>
			<div class="h-3/5">
				<p class="text-left p-3 text-base leading-relaxed flex">
					{{ stringTruncate(movie.overview, 0, 250) }}
				</p>
			</div>
			<div class="flex justify-center">
				<router-link :to="/movie/ + movie.id">
					<button
						class="bg-green-600 p-3 px-4 rounded-md shadow text-sm text-gray-100 border-b-4 border-green-900 mr-5"
					>
						Get more info
					</button>
				</router-link>
				<button
					@click="addMovieToWatchList"
					class="p-3 px-4 rounded-md shadow text-sm text-gray-100 border-b-4 border-black bg-blue-900"
				>
					<BookmarkIcon
						:class="{
							'text-red-600': alreadyAdded,
						}"
						class="h-5 w-5 fill-current hover:text-red-600 transition-all duration-300"
					/>
				</button>
			</div>
		</div>
	</div>
</template>

<script>
import { BookmarkIcon } from "@heroicons/vue/outline";
import { mapGetters } from "vuex";
import { posterPath, stringTruncate, checkBoolean, findById } from "../helpers";
import UserDataService from "../services/UserDataService";

export default {
	components: {
		BookmarkIcon,
	},
	props: {
		movie: {
			Type: Array,
		},
	},

	computed: {
		alreadyAdded() {
			return checkBoolean(this.checkMovie);
		},
		checkMovie() {
			return findById(this.userWList, this.movie.id);
		},

		...mapGetters(["isAuth", "user", "userId", "userWList"]),
	},

	methods: {
		stringTruncate,
		posterPath, //imported posterPatch function
		addMovieToWatchList() {
			let list = [...this.userWList];
			if (!this.alreadyAdded) {
				list = [...list, this.movie];
			} else {
				list = list.filter((m) => m.id !== this.movie.id);
			}
			UserDataService.addMovie(this.userId, list).then(() => {
				this.$store.commit("ADD_MOVIE_TO_WATCHLIST", list);
			});
		},
	},
};
</script>
