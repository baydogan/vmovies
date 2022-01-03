<template>
	<div class="flex items-center justify-center h-screen">
		<div class="md:max-w-md max-w-sm w-full bg-white rounded-md shadow-lg p-5">
			<img src="@/assets/images/vuelogo.png" class="h-12 w-12 mx-auto" alt="" />
			<h3 class="text-2xl mt-3 text-center">Login with username</h3>
			<div>
				<form class="mt-5">
					<div class="mb-3">
						<input
							v-model="formData.userName"
							id="username"
							class="w-full py-1 px-2 rounded-md border border-gray-300 focus:outline-none focus:border-green-600 focus:ring-green-600"
							type="text"
							placeholder="Username"
						/>
						<label class="sr-only" for="username">Username</label>
					</div>
					<div>
						<input
							v-model="formData.password"
							id="password"
							class="w-full py-1 px-2 rounded-md border border-gray-300 focus:outline-none focus:border-green-600 focus:ring-green-600"
							type="password"
							placeholder="Password"
						/>
						<label class="sr-only" for="password">Password</label>
					</div>
				</form>
				<div class="mt-4">
					<button @click="onLogin" class="bg-navbar w-full rounded-md py-2 text-white">
						Login
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import CryptoJS from "crypto-js";
import { resetData } from "@/helpers";
import UserDataService from "@/services/UserDataService";

export default {
	data() {
		return {
			formData: {
				userName: null,
				password: null,
			},
		};
	},
	methods: {
		onLogin() {
			const cryptedPassword = CryptoJS.HmacSHA1(
				this.formData.password,
				this.$store.getters.cryptoKey
			).toString();
			UserDataService.getUser(this.formData.userName, cryptedPassword)
				.then((login_response) => {
					if (login_response.data.length === 1) {
						this.$store.commit("SET_USER", login_response.data[0]);
						this.$router.push("/");
					} else {
						alert("Not matched user");
					}
					resetData(this.formData);
				})
				.catch((e) => {
					console.log(e);
				});
		},
	},
};
</script>
