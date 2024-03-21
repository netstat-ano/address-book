import { createApp } from "vue";
import App from "./App.vue";
import "@/css/index.css";
import "@mdi/font/css/materialdesignicons.css";
import router from "./router";
import { vuetify } from "./config/vuetify";
import "vuetify/dist/vuetify.min.css";

const app = createApp(App);

app.use(vuetify);
app.use(router);

app.mount("#app");
