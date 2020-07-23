import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import head from "./plugins/head";
import vuetify from './plugins/vuetify';
import toasted from './plugins/toasted';
import "@babel/polyfill";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "@mdi/font/css/materialdesignicons.css";
import 'leaflet/dist/leaflet.css';

Vue.config.productionTip = true;


new Vue({
    store,
    router,
    vuetify,
    head,
    toasted,
    render: h => h(App)
}).$mount("#app");
    
    
