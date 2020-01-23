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
            <v-card width="300">
                <v-list >
                    <v-list-item>
                        <v-list-item-avatar color="grey" dark size="70">
                            <img :src="imagen">
                        </v-list-item-avatar>

                        <v-list-item-content>
                            <v-list-item-title>{{perfil.nombre+' '+perfil.apellido}}</v-list-item-title>
                        </v-list-item-content>

                    </v-list-item>
                </v-list>

                <v-divider></v-divider>

                <v-list>
                    <v-list-item v-for="item in link" :key="item.text" :to="item.path">   
                        <v-list-item-icon>
                            <v-icon color="">{{item.icon}}</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>
                            {{item.text}}
                        </v-list-item-title>
                                
                    </v-list-item>

                    <v-divider/>
                    <v-hover v-slot:default="{hover}">
                        <v-list-item @click="logOut()">
                            <v-list-item-icon>
                                <v-icon :color="hover ? '#005598':null">
                                    power_settings_new
                                </v-icon>
                            </v-list-item-icon>
                            <v-list-item-title>
                                Cerrar sesión
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
import Usuario from '@/services/Usuario';
//router
import router from '@/router';

    export default {
        data(){
            return{
                imagen:'https://us.123rf.com/450wm/thesomeday123/thesomeday1231712/thesomeday123171200009/91087331-icono-de-perfil-de-avatar-predeterminado-para-hombre-marcador-de-posici%C3%B3n-de-foto-gris-vector-de-ilustr.jpg?ver=6',
                perfil:{},
                link:[
                    {text:'Ajustes de cuentas',path:'/account/profile',icon:'build'},
                    {text:'Agregar metodo de pago',path:'/account/metodo-de-pago',icon:'credit_card'},
                    {text:'Centro de ayuda',path:'/account/ayuda',icon:'help'},
                ],
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
                Usuario().post("/validate", {
                    user_token:this.user.token
                }).then((response) => {
                    this.perfil=response.data.data;
                }).catch(e => {
                    console.log(e);
                });
            },

            logOut(){
                this.logout();
                store.state.pedidos=[];
                router.push('/login');
            },
        },
        
        mounted(){//se trae el cliente
            this.getUsuario();
        }
    }
</script>
