import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
//store
import { createPinia } from "pinia";
import resetStore from "./plugins/reset-store";

//toast
import Toast, { PluginOptions, POSITION } from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";

const pinia = createPinia();
pinia.use(resetStore);
// create vue instance
const app = createApp(App);
// pinia as a plugin
app.use(pinia);
// use router plugin to pass router instance to vue instance
app.use(router);

// use toast plugin to pass options to vue instance
// set toast options
const options: PluginOptions = {
  position: POSITION.TOP_RIGHT,
  timeout: 2000,
};
app.use(Toast, options);

// mount vue instance to DOM
app.mount("#app");
