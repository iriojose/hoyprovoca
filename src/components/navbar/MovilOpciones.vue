<template>
    <v-menu left bottom>
        <template v-slot:activator="{ on }">
            <v-btn 
                icon fab small 
                v-on="on" 
                color="#fff"
                class="mx-2"
                v-if="user.loggedIn && $vuetify.breakpoint.smAndDown"
            >
                <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
        </template>

        <v-list dense flat>
            <v-list-item v-for="(item,i) in items" :key="i" @click="item.to">
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
                    {text:'Pedidos',icon:'mdi-basket',to:() => this.change()},
                    {text:'Notificaciones',icon:'mdi-bell',to:() => this.notificaciones()},
                    {text:'Perfil',icon:'mdi-account-circle',to:() => this.perfil()},
                    {text:'Cerrar sesión',icon:'mdi-exit-to-app',to:() => this.cerrar()},
                ]
            }
        },
        computed:{
            ...mapState(['user','carrito'])
        },
        methods: {
            ...mapActions(['setCarrito','logout']),

            change(){
                this.carrito ?  this.setCarrito(false):this.setCarrito(true);
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