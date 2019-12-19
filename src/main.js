import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "@babel/polyfill";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "@mdi/font/css/materialdesignicons.css";
import Croppa from 'vue-croppa'

Vue.config.productionTip = false;
Vue.use(Croppa);

let user = window.localStorage.getItem('user');
if(user=='true'){
  store.state.user.loggedIn=true;
}else{
  store.state.user.loggedIn=false;
}

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount("#app");
