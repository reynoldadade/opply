import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
//store
import { createPinia } from "pinia";
import resetStore from "./plugins/reset-store";
const pinia = createPinia();
pinia.use(resetStore);
// create vue instance
const app = createApp(App);
// pinai as a plugin
app.use(pinia);
// use router plugin to pass router instance to vue instance
app.use(router);

// mount vue instance to DOM
app.mount("#app");
