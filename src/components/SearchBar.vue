<template>
	<div class="md:w-4/12">
		<div class="relative mt-5">
			<input
				v-model="search"
				type="text"
				placeholder="Search a movie..."
				class="border-2 border-gray-300 bg-white h-10 pl-2 pr-8 rounded-lg text-sm focus:outline-none w-full"
				@input="fetchTrigger"
			/>
			<button class="absolute right-0 top-0 mt-3 mr-2">
				<SearchIcon class="h-4 w-4 text-green-600" />
			</button>
		</div>
		<div v-if="search.length > 3" class="absolute mt-6 ml-2 rounded bg-navbar w-56sm: w-80 z-50">
			<ul>
				<li v-for="movie in searchResults" :key="movie.index" class="">
					<router-link
						:to="/movie/ + movie.id"
						class="flex p-2 ml-1 items-center border-b border-gray-500 z-50"
					>
						<img :src="posterPath(movie.poster_path)" alt="" class="w-10" />
						<span class="ml-3 text-white">{{ movie.title }}</span>
					</router-link>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import axios from "axios";
import { SearchIcon } from "@heroicons/vue/outline";
import env from "../env";
import { posterPath } from "../helpers";

export default {
	components: {
		SearchIcon,
	},

	data() {
		return {
			searchResults: [],
			search: "",
		};
	},

	methods: {
		posterPath,
		async fetchTrigger(e) {
			if (this.search.length > 3) {
				setTimeout(() => {
					this.searchResults = this.fetchMovie(e.target.value);
				}, 200);
			} else {
				return "";
			}
		},

		async fetchMovie(movieName) {
			const response = await axios
				.get(`${env.mainURL}${env.apiKey}&query=${movieName}`)
				.then((response) => response.data.results);
			this.searchResults = response;
		},
	},
};
</script>
