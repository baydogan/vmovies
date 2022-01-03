<template>
	<div class="container mx-auto mt-5">
		<div class="flex flex-wrap justify-around px-20 mt-10">
			<MovieCard v-for="movie in userWList" :key="movie.id" :movie="movie" />
		</div>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
import MovieCard from "../components/MovieCard";
export default {
	components: {
		MovieCard,
	},

	created(){
		console.log(this.userWList)
	},

	computed: {
		...mapGetters(["isAuth", "user", "userId", "userWList"]),
	},
};
</script>
