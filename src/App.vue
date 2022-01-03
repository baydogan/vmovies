<template>
	<TheNavBar />
	<router-view :key="$route.path" class="min-h-screen"> </router-view>
	<footer><TheFooter /></footer>
</template>

<script>
import TheNavBar from "./components/TheNavBar.vue";
import TheFooter from "./components/TheFooter.vue";

export default {
	components: { TheNavBar, TheFooter },
};
</script>
