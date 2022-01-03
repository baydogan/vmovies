<template>
	<DetailedMovieCard :detailedMovieData="detailedMovieData" />
</template>

<script>
import DetailedMovieCard from "@/components/DetailedMovieCard";
import { fetchMovie } from "../helpers";
import env from "../env";


export default {
	components: {
		DetailedMovieCard,
	},

	data() {
		return {
			detailedMovieData: [],
			routeId: this.$route.params.id,
		};
	},

	async created() {
		this.detailedMovieData = await fetchMovie(env.movieDetailURL, this.routeId);
	},
};


</script>

