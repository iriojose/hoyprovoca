import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import head from './plugins/head';
import toasted from './plugins/toasted';
import "@mdi/font/css/materialdesignicons.css";

new Vue({
    head,
    router,
    store,
	vuetify,
    toasted,
    render: h => h(App)
}).$mount('#app')
