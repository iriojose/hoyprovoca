<template>
    <v-navigation-drawer
        app
        right
        temporary
        hide-overlay
        v-model="carritos" 
        :width="$vuetify.breakpoint.smAndDonw ? 450:500"
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
                    <DetallesPedidos :conceptos="pedido.conceptos" :detalles="pedido.detalles" :indexPedido="i" />
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>
        
        <v-footer absolute width="100%" height="60" color="#fff" class="pr-5 pl-5">
            <v-card-actions>
                <v-btn 
                    rounded color="#232323" @click="modal"
                    class="white--text text-capitalize" 
                    block :disabled="pedidos.length == 0 ? true:false"
                    :width="$vuetify.breakpoint.smAndDown ? 80:100"
                >
                    Vaciar
                    <v-icon class="mx-2" color="#fff">mdi-delete</v-icon>
                </v-btn>
                <v-spacer class="mx-1"></v-spacer>
                <v-btn 
                    rounded color="#232323" @click="push()"
                    class="white--text text-capitalize" 
                    block :disabled="pedidos.length == 0 ? true:false"
                    :width="$vuetify.breakpoint.smAndDown ? 80:100"
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
import Clientes from '@/services/Clientes';
import Pedidos from '@/services/Pedidos';
import router from '@/router';

    export default {
        components:{
            EncabezadoPedido,
            DetallesPedidos,
            VaciarCarrito
        },
        data() {
            return {
                aux:null,
            }
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
                this.getPedidosCliente();
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
            getPedidosCliente(){
                Clientes().get(`/${this.user.cliente.id}/pedidos/?rest_estatus_id=1`).then((response) => {
                    if(response.data.data){
                        //this.setPedidos(response.data.data);
                       this.aux = response.data.data;
                        response.data.data.filter((a,i) => this.getConceptos(a,i));
                    }
                }).catch(e => {
                    console.log(e);
                });
            },
            getConceptos(data,i){
                Pedidos().get(`/${data.id}/conceptos`).then((response) => {
                    this.aux[i].conceptos = response.data.data;
                    if(i == this.aux.length - 1) this.setPedidos(this.aux);
                }).catch(e => {
                    console.log(e);
                });
            }
        },
    }
</script>

<style lang="scss" scope>
    .index{
        z-index:100;
    }
</style>