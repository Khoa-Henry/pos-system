import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// Vuetify
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "vuetify/styles";

import "@mdi/font/css/materialdesignicons.css";
import { aliases, mdi } from "vuetify/lib/iconsets/mdi";

// Import custom SASS file
import "./styles/main.scss";

//Store
import { createPinia } from "pinia";

const vuetify = createVuetify({
  theme: {
    defaultTheme: "light",
    // themes: {
    //   myCustomLightTheme,
    // },
  },
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi,
    },
  },
  components,
  directives,
});

const pinia = createPinia();

const app = createApp(App);
app.use(vuetify).use(router).use(pinia);

app.mount("#app");
