<template>
	<nav class="bg bg-navbar shadow-md">
		<div class="max-w-6xl mx-auto px-4">
			<div class="flex justify-between h-20">
				<div class="flex space-x-4">
					<div>
						<router-link :to="{ name: 'Home' }" class="flex items-center py-5 px-3 text-gray-700">
							<img class="h-6 w-6" src="../assets/images/vuelogo.png" alt="" />
							<span class="font-fira text-3xl text-white font-bold">Movies</span>
						</router-link>
					</div>
					<div class="hidden md:flex items-center space-x-3">
						<router-link
							:to="{ name: 'MyWatchList' }"
							class="py-5 px-3 text-gray-100 rounded-md transition-all duration-300"
							>MY WATCH LIST</router-link
						>
					</div>
				</div>
				<SearchBar class="" />

				<div class="hidden md:flex items-center space-x-3">
					<router-link :to="{ name: 'Login' }" class="py-5 px-3 text-gray-100" v-if="!isAuth"
						>LOGIN</router-link
					>
					<router-link
						v-if="!isAuth"
						:to="{ name: 'SignUp' }"
						class="py-2 px-3 bg bg-primary text-gray-100 rounded shadow duration-300"
						>SIGN UP</router-link
					>
				</div>
				<div
					v-if="isAuth"
					@click="this.showUserMenu = !this.showUserMenu"
					class="hidden sm:block py-7 px-3 text-gray-100 cursor-pointer"
				>
					{{ user.userName }}
					<div v-if="showUserMenu" class="h-10 bg-white rounded-md absolute">
						<button
							v-if="isAuth"
							class="block text-black rounded-md transition-all duration-300 p-2"
							@click="this.$store.commit('SING_OUT')"
						>
							SING OUT
						</button>
					</div>
				</div>

				<div class="lg:hidden flex items-center">
					<button class="mobile-menu-button" @click="this.showMobileMenu = !this.showMobileMenu">
						<MenuIcon class="h-8 w-8 text-white" />
					</button>
				</div>
			</div>
		</div>
		<Transition name="fade">
			<div
				class="md:hidden w-full h-2/6 absolute shadow-2xl bg-navbar rounded-b-lg z-50"
				v-if="showMobileMenu"
			>
				<router-link
					:to="{ name: 'MyWatchList' }"
					class="block ml-4 mr-4 py-2 px-4 text-md text-gray-100 rounded-md transition-all duration-300"
					>MY WATCH LIST</router-link
				>
				<router-link
					v-if="!isAuth"
					:to="{ name: 'SignUp' }"
					class="block ml-4 mr-4 py-2 px-4 text-md text-gray-100 rounded-md transition-all duration-300"
					>SIGN UP
				</router-link>
				<router-link
					v-if="!isAuth"
					:to="{ name: 'Login' }"
					class="block ml-4 mr-4 py-2 px-4 text-md text-gray-100 rounded-md transition-all duration-300"
					>LOGIN</router-link
				>
				<button
					v-if="isAuth"
					class="block ml-4 mr-4 py-2 px-4 text-md text-gray-100 rounded-md transition-all duration-300"
					@click="this.$store.commit('SING_OUT')"
				>
					SING OUT
				</button>
			</div>
		</Transition>
	</nav>
</template>

<script>
import { mapGetters } from "vuex";
import { MenuIcon } from "@heroicons/vue/outline";
import env from "../env";
import axios from "axios";
import SearchBar from "@/components/SearchBar";

export default {
	components: {
		MenuIcon,
		SearchBar,
	},

	data() {
		return {
			showMobileMenu: false,
			showUserMenu: false,
			movieData: [],
			search: null,
		};
	},

	methods: {
		toggleMenu() {
			this.showMobileMenu = !this.showMobileMenu;
		},

		async searchMovies() {
			const response = await axios
				.get(`${env.mainURL}${env.apiKey}&query=${this.search}`)
				.then((response) => response.data);
			this.movieData = response;
			this.$router.push("/Results");
			console.log(this.movieData);
			this.search = null;
		},
	},

	computed: {
		...mapGetters(["isAuth", "user"]),
	},

	created() {
		this.$router.beforeEach(() => {
			this.showMobileMenu = false;
		});
	},
};
</script>

<style>
.fade-enter-from {
	opacity: 0;
}

.fade-enter-to {
	opacity: 1;
}

.fade-enter-active {
	transition: all 0.7s ease;
}

.fade-leave-from {
	opacity: 1;
}

.fade-leave-to {
	opacity: 0;
}

.fade-leave-active {
	transition: all 0.7s ease;
}
</style>
