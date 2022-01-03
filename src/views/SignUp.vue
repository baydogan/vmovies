<template>
	<div class="flex items-center justify-center h-screen">
		<div class="md:max-w-md max-w-sm w-full bg-white rounded-md shadow-lg p-5">
			<img src="@/assets/images/vuelogo.png" class="h-12 w-12 mx-auto" alt="" />
			<h3 class="text-2xl mt-3 text-center">CREATE AN USER</h3>
			<div>
				<form class="mt-5" @submit.prevent="sendRegister()">
					<div class="mb-3">
						<input
							v-model="formData.email"
							id="email"
							class="w-full py-1 px-2 rounded-md border border-gray-300 focus:outline-none focus:border-green-600 focus:ring-green-600"
							type="email"
							placeholder="Email"
						/>
						<label class="sr-only" for="email">Email</label>
					</div>
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
					<button
						@click="sendRegister"
						type="submit"
						class="bg-navbar w-full rounded-md py-2 text-white"
					>
						SUBMIT
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import CryptoJS from "crypto-js";
import { resetData } from "@/helpers";

import { v4 as uuidv4 } from "uuid";
import UserDataService from "../services/UserDataService";

export default {
	data() {
		return {
			formData: {
				userName: null,
				email: null,
				password: null,
			},
		};
	},

	computed: {
		nameIsValid() {
			return !!this.formData.userName;
		},
	},

	methods: {
		sendRegister() {
			const cryptedPassword = CryptoJS.HmacSHA1(
				this.formData.password,
				this.$store.getters.cryptoKey
			).toString();
			if (this.formValidation()) {
				UserDataService.addUser({
					...this.formData,
					id: uuidv4(),
					password: cryptedPassword,
					watchList: [],
				})
					.then(() => {
						this.$router.push("/Login");
					})
					.catch((e) => console.log(e));
			} else {
				alert('Please check your information')
			}
			resetData(this.formData);
		},

		formValidation() {
			return this.formData.password.length > 5 && this.formData.userName.length > 5;
		},
	},
};
</script>
