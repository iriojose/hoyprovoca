import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "@babel/polyfill";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "@mdi/font/css/materialdesignicons.css";
import firebase from "firebase";
import Croppa from 'vue-croppa'

Vue.config.productionTip = false;
Vue.use(Croppa);
var setting = { timestampsInSnapshots: true };

var firebaseConfig = {
  apiKey: "AIzaSyB431ZONa59Qxgn_te9cjFWXI8HvHy8b4k",
  authDomain: "aftim-3aab3.firebaseapp.com",
  databaseURL: "https//aftim-3aab3.firebaseio.com",
  projectId: "aftim-3aab3",
  storageBucket: "aftim-3aab3.appspot.com",
  messagingSenderId: "485521486790",
  appId: "1:485521486790",
  measurementId: "G-F90210K1MY"
};

firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged(user => {
    store.dispatch("fetchUser", user);
});

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount("#app");

