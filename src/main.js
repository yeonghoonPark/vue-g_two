import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router/index.js";
import { functionPluginsEx } from "./plugins/functionPluginsEx";
import { objectPluginsEx } from "./plugins/objectPluginsEx";
import { objectPerson } from "./plugins/objectPerson";

import { globalComponents } from "./plugins/globalComponents";

// import focus from "./directives/focus";
// import { color } from "./directives/color";
import { globalDirectives } from "./plugins/globalDirectives";

import dayjs from "./plugins/dayJs";

// pinia
import { createPinia } from "pinia";

const app = createApp(App);
app.use(functionPluginsEx);
app.use(objectPluginsEx, { name: "Jasper" });
app.use(objectPerson, { name: "Tom Cruise" });
app.use(globalComponents);
app.use(globalDirectives);
app.use(createPinia());
app.use(dayjs);
app.use(router);

// app.directive("focus", focus);
// app.directive("color", color);
app.mount("#app");

import "bootstrap/dist/js/bootstrap.js";

// console.log(import.meta.env.MODE);
// console.log(import.meta.env.BASE_URL);
// console.log(import.meta.env.PROD);
// console.log(import.meta.env.DEV);
// console.log(import.meta.env.VITE_APP_API_URL);
