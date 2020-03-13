<template>
    <div v-if="user.loggedIn">
        <v-menu
            :transition="transition()"
            bottom
            open-on-hover 
            offset-y
        >
            <template v-slot:activator="{ on }">
                <v-avatar color="#f5f5f5" size="40" class="mx-2 elevation-3">
                    <v-btn icon v-on="on">
                        <v-icon>person</v-icon>
                    </v-btn>
                </v-avatar>
            </template>
            <!-- lista de opciones-->
            <v-card id="#cono">
                <v-list width="300" elevation="0">
                    <v-list-item class="border">
                        <v-list-item-avatar>
                            <v-img :src="ruta+perfil.fotografia"></v-img>
                        </v-list-item-avatar>
                        <v-list-item-content>
                            <v-list-item-title class="color" v-text="perfil.nombre+' '+perfil.apellido"></v-list-item-title>
                            <v-list-item-subtitle>Cliente</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
                <v-divider></v-divider>
                <v-list dense>
                    <v-hover v-slot:default="{hover}">
                        <v-list-item to="/account/profile">   
                            <v-list-item-icon>
                                <v-icon :color="hover ? '#005598':null">settings</v-icon>
                            </v-list-item-icon>
                            <v-list-item-title>
                                Ajustes
                            </v-list-item-title>        
                        </v-list-item>
                    </v-hover>
                    <v-hover v-slot:default="{hover}">
                        <v-list-item @click="logOut()">   
                            <v-list-item-icon>
                                <v-icon :color="hover ? '#005598':null">exit_to_app</v-icon>
                            </v-list-item-icon>
                            <v-list-item-title>
                                Cerrar sesíon
                            </v-list-item-title>        
                        </v-list-item>
                    </v-hover>
                </v-list>
            </v-card>
        </v-menu>
    </div>
</template>

<script>
//vuex
import {mapGetters,mapActions} from 'vuex';
import store from '@/store';
//services
import Auth from '@/services/Auth';
//router
import router from '@/router';
import url from '@/services/ruta';

    export default {
        data(){
            return{
                ruta:null,
                perfil:{},
            }
        },
        computed: {
            ...mapGetters(['user']),
        },
        methods: {
            ...mapActions(['logout']),

            transition(){//transition del menu
                return "slide-y-transition"
            },
            getUsuario(){//metodo get para el usuario logeado
                Auth().post("/sesion", {token:this.user.token}).then((response) => {
                    this.perfil=response.data.data;
                }).catch(e => {
                    console.log(e);
                    this.logOut();
                });
            },
            logOut(){
                this.logout();
                store.state.pedidos=[];
                router.push('/login');
            },
        },
        mounted(){
            this.ruta=url;

            if(this.user.loggedIn){
                this.getUsuario();
            }else{
                this.logout();
            }
        }
    }
</script>

<style scope>
    .color{
        color:#005598;
    }

    .border {
        border-left: 4px solid #005598;
    }

    #cono:before {
            border-bottom: 12px solid rgba(0, 0, 0, 0.1);
            border-right: 12px solid rgba(0, 0, 0, 0);
            border-top: 12px solid rgba(0, 0, 0, 0);
            content: "";
            display: inline-block;
            position: absolute;
            top: -24px;
        }
    #cono:after {
        border-bottom: 12px solid #fff;
        border-right: 12px solid rgba(0, 0, 0, 0);
        border-top: 12px solid rgba(0, 0, 0, 0);
        content: "";
        display: inline-block;
        position: absolute;
        top: -22px;
    }

    #cono:before,
    #cono:after {
        content: ' ';
        height: 0;
        position: absolute;
        width: 0;
        border: 11px solid transparent;
        /* arrow size */
        left: 50%;
        transform: translateX(50%);
    }
</style>
