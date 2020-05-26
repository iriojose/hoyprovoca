import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import head from "./plugins/head";
import vuetify from './plugins/vuetify';
import toasted from './plugins/toasted';
import croppa from "vue-croppa"
import "@babel/polyfill";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "@mdi/font/css/materialdesignicons.css";
import 'leaflet/dist/leaflet.css';
import Auth from '@/services/Auth';

Vue.config.productionTip = true;
let token = window.sessionStorage.getItem('token_client');

Vue.use(croppa);

if(token){
    Auth().post("/sesion",{token:token}).then((response) => {
        if(response.data.data.perfil_id == 4){
            store.state.bloqueado = true;
        }else{
            store.state.user.data = response.data.data;
            store.state.user.loggedIn = true;
            store.state.user.token = token;
        }
        
        new Vue({
            store,
            router,
            vuetify,
            head,
            toasted,
            render: h => h(App)
        }).$mount("#app");
    
    }).catch(() => {
        new Vue({
            store,
            router,
            vuetify,
            head,
            toasted,
            render: h => h(App)
        }).$mount("#app");
    });
}else{
    new Vue({
        store,
        router,
        vuetify,
        head,
        toasted,
        render: h => h(App)
    }).$mount("#app");
}
