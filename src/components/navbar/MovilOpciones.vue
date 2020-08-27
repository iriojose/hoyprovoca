<template>
    <v-menu left bottom>
        <template v-slot:activator="{ on }">
            <v-btn 
                icon fab small 
                v-on="on" 
                v-if="$vuetify.breakpoint.smAndDown"
            >
                <v-icon :color="theme.background.font">mdi-dots-vertical</v-icon>
            </v-btn>
        </template>

        
        <v-list dense flat v-if="user.loggedIn">
            <v-list-item v-for="(item,i) in items" :key="i" @click="item.to">
                <v-list-item-icon>
                    <v-icon>{{item.icon}}</v-icon>
                </v-list-item-icon>
                <v-list-item-title>{{item.text}}</v-list-item-title>
            </v-list-item>
        </v-list>

        <v-list dense flat v-else>
            <v-list-item v-for="(item,i) in items2" :key="i" :to="item.to">
                <v-list-item-icon>
                    <v-icon>{{item.icon}}</v-icon>
                </v-list-item-icon>
                <v-list-item-title>{{item.text}}</v-list-item-title>
            </v-list-item>
        </v-list>
    </v-menu>
</template>

<script>
import {mapState,mapActions} from 'vuex';
import router from '@/router';
    export default {
        data() {
            return {
                items:[
                    {text:'Pedidos',icon:'mdi-basket',to:() => this.modalCarrtio()},
                    //{text:'Dirección',icon:'gps_fixed',to:() => this.modalDireccion()},
                    {text:'Notificaciones',icon:'mdi-bell',to:() => this.notificaciones()},
                    {text:'Perfil',icon:'mdi-account-circle',to:() => this.perfil()},
                    {text:'Cerrar sesión',icon:'mdi-exit-to-app',to:() => this.cerrar()},
                ],
                items2:[
                    {text:'Iniciar sesón',icon:'mdi-account-box',to:'/login'},
                    {text:'Registrate',icon:'mdi-account-details',to:'/register'},
                ]
            }
        },
        computed:{
            ...mapState(['user','carrito','modalUbicacion'])
        },
        methods: {
            ...mapActions(['setCarrito','logout','setModalUbicacion']),
            modalCarrtio(){
                this.carrito ?  this.setCarrito(false):this.setCarrito(true);
            },
            modalDireccion(){
                this.modalUbicacion ?  this.setModalUbicacion(false):this.setModalUbicacion(true);
            },
            notificaciones(){
                router.push('/account/notificaciones');
            },
            perfil(){
                router.push('/account/profile');
            },
            cerrar(){
                this.logout();
                router.push('/login');
            }
        },
    }
</script>