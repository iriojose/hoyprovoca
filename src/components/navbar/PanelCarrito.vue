<template>
    <v-navigation-drawer
        app
        right
        temporary
        hide-overlay
        v-model="carritos" 
        :width="$vuetify.breakpoint.smAndDonw ? '100%':500"
        :color="theme.sidebar.secondary"
        class="index"
    >
        <v-toolbar width="100%" elevation="1" v-if="user.loggedIn" :color="theme.sidebar.primary">
            <v-toolbar-title>
                <v-img @click="init" contain width="50" height="50" :src="require('@/assets/2.png')"></v-img>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-title class="black--text font-weight-black title">
                Pedidos Abiertos
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon fab depressed @click="change" :elevation="0">
                <v-icon :color="theme.sidebar.font">mdi-close</v-icon>
            </v-btn>
        </v-toolbar>

        <v-divider></v-divider>

        <v-row class="my-12" v-if="pedidos.length == 0" justify="center" align="center">
            <v-img class="mt-10" contain width="80%" height="200" :src="require('@/assets/undrawempty.svg')"></v-img>
            <div class="subtitle-1 font-weight-bold mt-4 black--text">Su carrito esta vacio</div>
        </v-row>

        <v-expansion-panels v-else class="my-1" v-model="panel">
            <v-expansion-panel v-for="(pedido,i) in pedidos" :key="i">

                <v-expansion-panel-header :color="theme.sidebar.card" style="padding-right:0px;padding-left:0px;">
                    <EncabezadoPedido :index="i" :pedido="pedido" :total="totalPedidos[i]" />

                    <template v-slot:actions>
                        <v-icon color="#000">mdi-menu-down</v-icon>
                    </template>
                </v-expansion-panel-header>

                <v-expansion-panel-content :color="theme.sidebar.card">
                    <DetallesPedidos :conceptos="pedido.conceptos" :detalles="pedido.detalles" :indexPedido="i" />
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>
        
        <v-footer absolute width="100%" height="60" :color="theme.sidebar.primary" class="pr-5 pl-5">
            <v-card-actions>
                <v-btn 
                    rounded  :color="theme.buttons.terceary" @click="modal"
                    class="text-capitalize" :style="`color:${theme.buttons.font}`"
                    block :disabled="pedidos.length == 0 ? true:false"
                    :width="$vuetify.breakpoint.smAndDown ? 80:100"

                >
                    Vaciar
                    <v-icon class="mx-2" :color="theme.buttons.font" >mdi-delete</v-icon>
                </v-btn>
                <v-spacer class="mx-1"></v-spacer>
                <v-btn 
                    rounded :color="theme.buttons.terceary" @click="push()"
                    class=" text-capitalize" 
                    :style="`color:${theme.buttons.font}`"
                    block :disabled="pedidos.length == 0 ? true:false"
                    :width="$vuetify.breakpoint.smAndDown ? 80:100"
                >
                    Pagar
                    <v-icon class="mx-2" :color="theme.buttons.font">mdi-cash</v-icon>
                </v-btn>
            </v-card-actions>
        </v-footer>

        <VaciarCarrito />
    </v-navigation-drawer>
</template>

<script>
import {mapActions,mapState} from 'vuex';
import router from '@/router';

    export default {
        components:{
            EncabezadoPedido:() => import('./EncabezadoPedido'),
            DetallesPedidos:() => import('./DetallesPedidos'),
            VaciarCarrito:() => import("@/components/dialogs/VaciarCarrito")
        },
        data(){
            return {
                panel:0
            }
        },
        computed: {
            ...mapState(['pedidos','carrito','user','totalPedidos','theme']),

            carritos:{
                get(){ return this.carrito},
                set(val){ this.setCarrito(val)}
            }
        },
        methods: {
            ...mapActions(['setCarrito','setModalCarrito']),

            change(){
                this.carrito ?  this.setCarrito(false):this.setCarrito(true);
            },
            push(){
                router.push('/checkout');
            },
            init(){
                router.push("/");
            },
            modal(){
                this.setModalCarrito(true);
            },
        },
    }
</script>

<style lang="scss" scope>
    .index{
        z-index:100;
    }
</style>