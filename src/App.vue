<template>
    <v-app style="background-color:#f7f7f7;">

        <v-card elevation="0" color="#fff" width="100%" height="100%" v-if="loading">
            <v-row justify="center" class="fill-height" align="center">
                <v-img width="500" height="500" contain :src="require('@/assets/loader.gif')"></v-img>
            </v-row>
        </v-card>

        <AppBar v-if="ruta() && !loading" />
        
        <transition name="fade" v-if="!loading">
            <router-view />
        </transition> 

        <ModalBloqueado /> 
        <ModalProducto />
        <ModalSesion />
        <ModalImagen />

        <Footer v-if="ruta() && !loading" class="margen" />
    </v-app>
</template>

<script>
//services
import Auth from '@/services/Auth';
import Clientes from '@/services/Clientes';
import store from "./store";
import AppBar from '@/components/navbar/AppBar';
import ModalBloqueado from '@/components/dialogs/ModalBloqueado';
import ModalImagen from '@/components/dialogs/ModalImagen';
import ModalProducto from '@/components/dialogs/ModalProducto';
import ModalSesion from '@/components/dialogs/ModalSesion';
import Footer from '@/components/footer/Footer';

    export default {
        name: 'App',
        components:{
            AppBar,
            ModalBloqueado,
            ModalProducto,
            ModalSesion,
            ModalImagen,
            Footer,
        },
        data(){
            return {
                loading:true,
            }
        },
        mounted(){
            let token = window.sessionStorage.getItem('token_client');
            if(token) this.sesion(token);
            else this.loading = false;
        },
        methods:{
            sesion(token){
                Auth().post("/sesion",{token:token}).then((response) => {
                    if(response.data.response.data.bloqueado == 1){
                        store.state.bloqueado = true;
                        this.loading = false;
                    }else{
                        store.state.user.data = response.data.response.data;
                        store.state.user.loggedIn = true;
                        store.state.user.token = token;
                        Clientes().get(`/?usuario_id=${store.state.user.data.id}`).then((response) => {
                            store.state.user.cliente = response.data.data[0];
                            this.loading = false;
                        }).catch(e => {this.loading = false;})
                    }
                }).catch(e => {
                    console.log(e);
                    this.loading = false;
                });
            },
            ruta(){
                if(
                    this.$route.name == 'login' || 
                    this.$route.name == 'forgot' ||
                    this.$route.name == 'register' ||
                    this.$route.name == 'notauthorized' ||
                    this.$route.name == 'notfound' ||
                    this.$route.name == 'checkout' ||
                    this.$route.name == 'prueba' ||
                    this.$route.name == 'comopagar' || 
                    this.$route.name == 'terminosycondiciones' ||
                    this.$route.name == 'privacidad' ||
                    this.$route.name == 'reset' ||
                    this.$route.name == 'verify'
                ){
                    return false;
                }else{
                    return true;
                }
            },
        }
    }
</script>

<style>
    html {
        scroll-behavior: smooth;
    }
    .margen{
        margin-top:150px;
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to{
        opacity: 0;
    }
    ::-webkit-scrollbar {
        width: 8px;     
        height: 8px;   
    }
    ::-webkit-scrollbar-thumb {
        background: #ccc;
        border-radius: 12px;
    }
    ::-webkit-scrollbar-thumb:hover {
        background: #b3b3b3;
        box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.2);
    }
    ::-webkit-scrollbar-thumb:active {
        background-color: #999999;
    }
    ::-webkit-scrollbar-track {
        background: #fff;
        border-radius: 12px;
    }
    ::-webkit-scrollbar-track:hover,
    ::-webkit-scrollbar-track:active {
        background: #fff;
    }
    
</style>