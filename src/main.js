import { createApp } from "vue";
import App from "./App.vue";
import "./assets/tailwind.css";
import router from "./router";
import store from "./store";

const movieApp = createApp(App);
movieApp.use(router);
movieApp.use(store);
movieApp.mount("#app");
