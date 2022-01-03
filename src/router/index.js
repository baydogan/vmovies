import { createRouter, createWebHistory } from "vue-router";
import store from "../store";
const routes = [
	{
		path: "/",
		name: "Home",
		component: () => import("@/views/Home"),
	},


	{
		path: "/MyWatchList",
		name: "MyWatchList",
		component: () => import("@/views/MyWatchList"),
	},

	{
		path: "/SignUp",
		name: "SignUp",
		component: () => import("@/views/SignUp"),
	},

	{
		path: "/Login",
		name: "Login",
		component: () => import("@/views/Login"),
	},

	{
		path: "/movie/:id",
		name: "MovieDetailPage",
		component: () => import("@/views/MovieDetailPage"),
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

router.beforeEach((to, from, next) => {
	const isAuth = store.getters.isAuth;
	const authRequiredRoutes = ["MyWatchList"];

	if (authRequiredRoutes.indexOf(to.name) > -1) {
		if (isAuth) next();
		else next({ name: "Login" });
	} else {
		next();
	}
});

export default router;
