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
import Clientes from '@/services/Clientes';

Vue.config.productionTip = true;
let token = window.sessionStorage.getItem('token_client');

Vue.use(croppa);

if(token){
    Auth().post("/sesion",{token:token}).then((response) => {
        if(response.data.response.data.bloqueado == 1){
            store.state.bloqueado = true;
        }else{
            store.state.user.data = response.data.response.data;
            store.state.user.loggedIn = true;
            store.state.user.token = token;
            Clientes().get(`/?usuario_id=${store.state.user.data.id}`).then((response) => {
                store.state.user.cliente = response.data.data[0];

                new Vue({
                    store,
                    router,
                    vuetify,
                    head,
                    toasted,
                    render: h => h(App)
                }).$mount("#app");
            }).catch(e => {
                console.log(e);
                
                new Vue({
                    store,
                    router,
                    vuetify,
                    head,
                    toasted,
                    render: h => h(App)
                }).$mount("#app");
            })
        }
    
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
