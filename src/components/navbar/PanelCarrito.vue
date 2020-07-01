<template>
    <v-navigation-drawer
        app
        right
        temporary
        hide-overlay
        v-model="carritos" 
        :width="$vuetify.breakpoint.smAndDonw ? 400:500"
        color="#f5f5f5"
        class="index"
    >
        <v-toolbar width="100%" elevation="1" v-if="user.loggedIn">
            <v-toolbar-title>
                <v-img contain width="150" height="80" :src="require('@/assets/logo2.png')"></v-img>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-hover v-slot:default="{hover}">
                <v-btn icon fab depressed @click="change" :elevation="0">
                    <v-icon :color="hover ? '#232323':null">close</v-icon>
                </v-btn>
            </v-hover>
        </v-toolbar>

        <v-divider></v-divider>

        <v-row class="my-12" v-if="pedidos.length == 0" justify="center" align="center">
            <v-img class="mt-10" contain width="80%" height="200" :src="require('@/assets/undrawempty.svg')"></v-img>
            <div class="subtitle-1 font-weight-bold mt-4">Su carrito esta vacio</div>
        </v-row>

        <v-expansion-panels v-else class="my-1">
            <v-expansion-panel v-for="(pedido,i) in pedidos" :key="i">

                <v-expansion-panel-header>
                    <EncabezadoPedido :index="i" :pedido="pedido" :total="totalPedidos[i]" />
                </v-expansion-panel-header>

                <v-expansion-panel-content>
                    <DetallesPedidos :detalles="pedido.detalles" :indexPedido="i" />
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>
        
        <v-footer absolute width="100%" height="60" color="#fff" class="px-12">
            <v-card-actions>
                <v-btn 
                    rounded color="#232323" @click="modal"
                    class="white--text text-capitalize" 
                    :block="$vuetify.breakpoint.smAndDown ? false:true"
                    :disabled="pedidos.length == 0 ? true:false"
                >
                    Vaciar
                    <v-icon class="mx-2" color="#fff">mdi-delete</v-icon>
                </v-btn>
                <v-spacer class="mx-1"></v-spacer>
                <v-btn 
                    rounded color="#232323" @click="push()"
                    class="white--text text-capitalize" 
                    :block="$vuetify.breakpoint.smAndDown ? false:true"
                    :disabled="pedidos.length == 0 ? true:false"
                >
                    Checkout
                    <v-icon class="mx-2" color="#fff">mdi-cash</v-icon>
                </v-btn>
            </v-card-actions>
        </v-footer>

        <VaciarCarrito />
    </v-navigation-drawer>
</template>

<script>
import {mapActions,mapState} from 'vuex';
import VaciarCarrito from '@/components/dialogs/VaciarCarrito';
import EncabezadoPedido from './EncabezadoPedido';
import DetallesPedidos from './DetallesPedidos';
import Usuario from '@/services/Usuario';
import router from '@/router';

    export default {
        components:{
            EncabezadoPedido,
            DetallesPedidos,
            VaciarCarrito
        },
        computed: {
            ...mapState(['pedidos','carrito','user','totalPedidos']),

            carritos:{
                get(){ return this.carrito},
                set(val){ this.setCarrito(val)}
            }
        },
        watch: {
            user(){
                this.getPedidosUsuario();
            }
        },
        mounted() {
            if(this.user.loggedIn){
                this.getPedidosUsuario();
            }
        },
        methods: {
            ...mapActions(['setCarrito','setPedidos','setModalCarrito']),

            change(){
                this.carrito ?  this.setCarrito(false):this.setCarrito(true);
            },
            push(){
                router.push('/checkout');
            },
            modal(){
                this.setModalCarrito(true);
            },
            getPedidosUsuario(){
                Usuario().get(`/${this.user.data.id}/pedidos/?rest_estatus_id=1`).then((response) => {
                    if(response.data.data){
                        this.setPedidos(response.data.data);
                    }
                }).catch(e => {
                    console.log(e);
                });
            },
        },
    }
</script>

<style lang="scss" scope>
    .index{
        z-index:100;
    }
</style>