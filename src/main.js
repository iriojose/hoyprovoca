import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "@babel/polyfill";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "@mdi/font/css/materialdesignicons.css";
import Croppa from 'vue-croppa'
import VueHead from 'vue-head'

Vue.use(VueHead);
Vue.use(Croppa);
Vue.config.productionTip = false;

let token = window.localStorage.getItem('token');

if(token){
    store.state.user.loggedIn=true;
    store.state.user.token=token;
}else{
    store.state.user.loggedIn=false;
    store.state.user.token="";
}

new Vue({
    store,
    router,
    vuetify,
    render: h => h(App)
}).$mount("#app");
