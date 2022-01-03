<template>
	<div class="container mt-20 bg p-5 max-h-screen">
		<div class="flex justify-center">
			<div class="mr-5">
				<img
					class="h-card shadow-md rounded-md"
					:src="posterPath(detailedMovieData.poster_path)"
					alt=""
				/>
			</div>
			<div class="">
				<div>
					<h3 class="ml-1 font-semibold text-2xl">{{ detailedMovieData.title }}</h3>
					<div class="ml-1">
						<span class="text-sm font-semibold">{{
							detailedMovieData.release_date.substring(0, 4)
						}}</span>
						<span
							class="text-sm p-1 font-semibold"
							v-for="genre in detailedMovieData.genres"
							:key="genre.index"
							>{{ genre.name }}</span
						>
					</div>
				</div>
				<div class="max-w-sm">
					<div class="ml-1 mt-5">
						<span>Summary</span>
						<p class="mt-1 text-base leading-relaxed mb-4">{{ detailedMovieData.overview }}</p>
						<span class="mr-2">IMDB Rate: {{ checkRate }}</span>
						<span>{{ this.detailedMovieData.spoken_languages[0].name }}</span>
					</div>
					<div class="mt-4">
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
		</div>
	</div>
</template>

<script>
import { posterPath, checkBoolean, findById } from "../helpers";
import { BookmarkIcon } from "@heroicons/vue/outline";
import UserDataService from "../services/UserDataService";
import { mapGetters } from "vuex";

export default {
	props: {
		detailedMovieData: {
			type: Object,
		},
	},

	components: {
		BookmarkIcon,
	},

	methods: {
		posterPath,
		addMovieToWatchList() {
			let list = [...this.userWList];
			if (!this.alreadyAdded) {
				list = [...list, this.detailedMovieData];
			} else {
				list = list.filter((m) => m.id !== this.detailedMovieData.id);
			}
			UserDataService.addMovie(this.userId, list).then(() => {
				this.$store.commit("ADD_MOVIE_TO_WATCHLIST", list);
			});
		},
	},

	computed: {
		checkRate() {
			if (this.detailedMovieData.vote_average === 0) {
				return "Not released yet";
			} else {
				return this.detailedMovieData.vote_average;
			}
		},

		alreadyAdded() {
			return checkBoolean(this.checkMovie);
		},
		checkMovie() {
			return findById(this.userWList, this.detailedMovieData.id);
		},

		...mapGetters(["userWList", "userId"]),
	},
};
</script>
