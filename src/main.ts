import { createApp } from "vue";
import vuetify from "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import AppLayout from "@/layouts/AppLayout.vue";

createApp(App)
  .use(router)
  .use(store)
  .use(vuetify)
  .component("AppLayout", AppLayout)
  .mount("#app");
