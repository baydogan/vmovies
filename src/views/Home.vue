<template>
	<div class="container mx-auto mt-5">
		<h2 class="flex justify-center text-3xl">POPULAR MOVIES</h2>
		<div class="flex flex-wrap justify-around px-20 mt-10">
			<MovieCard v-for="movie in populerMovies" :key="movie.id" :movie="movie" />
		</div>
	</div>
</template>

<script>
import MovieCard from "@/components/MovieCard";
import { fetchPopularMovies } from "../helpers";

export default {
	components: {
		MovieCard,
	},

	data() {
		return {
			populerMovies: [],
		};
	},

	async created() {
		this.populerMovies = await fetchPopularMovies();
		console.log(this.populerMovies)
	},
};
</script>
