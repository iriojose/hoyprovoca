<template>
    <v-card elevation="0">
        <div class="font-weight-black title mb-5" style="padding-top:10px;text-align:center;">
            Últimas Ordenes
        </div>

        <v-card-text>
            <v-card elevation="0" color="#fff" width="100%" height="100%" v-if="loading">
                <v-card-text>
                    <v-row justify="center" class="fill-height" align="center">
                        <v-img width="250" height="250" contain :src="require('@/assets/loader.gif')"></v-img>
                    </v-row>
                </v-card-text>
            </v-card>

            <v-card elevation="0" color="#fff" width="100%" height="100%" v-else>
                <v-row justify="center" v-if="!pedidos" class="mt-5">
                    <v-img contain width="250" height="250" src="@/assets/empty.svg"></v-img>
                </v-row>
                <div v-if="!pedidos" class="text-center title font-weight-black">No tienes pedidos pendientes.</div>
                <v-card v-else elevation="0" color="#fff" width="100%">
                    <v-expansion-panels>
                        <v-expansion-panel v-for="(pedido,i) in pedidos" :key="i">
                            <v-expansion-panel-header>Item</v-expansion-panel-header>
                            <v-expansion-panel-content>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-expansion-panels>
                </v-card>
            </v-card>
        </v-card-text>
    </v-card>
</template>

<script>
import Clientes from '@/services/Clientes';
import Pedidos from '@/services/Pedidos';
import {mapState,mapActions} from 'vuex';
import variables from '@/services/variables_globales';

    export default {
        data() {
            return {
                pedidos:[],
                aux:[],
                ...variables,
                loading:true,
            }
        },
        computed: {
            ...mapState(['user'])
        },
        watch: {
            user(){
                let ordenes = JSON.parse(window.localStorage.getItem("ultimasOrdenes"));
                if(ordenes) {
                    this.pedidos = ordenes;
                    this.setUltimasOrdenes(ordenes);
                }else this.getPedidos();
            }
        },
        head: {
            title() {
                return {
                    inner: "Hoyprovoca",
                    separator:'|',
                    complement:'Pedidos'
                };
            }
        },
        mounted() {
            let ordenes = JSON.parse(window.localStorage.getItem("ultimasOrdenes"));
            if(ordenes) {
                this.pedidos = ordenes;
                this.setUltimasOrdenes(ordenes);
            }else if(this.user.data.cliente) this.getPedidos();
        },
        methods:{
            ...mapActions(['setUltimasOrdenes']),

            getPedidos(){
                Clientes().get(`/${this.user.cliente.id}/pedidos/?rest_estatus_id > 1`).then((response) => {
                    if(response.data.data){
                        this.aux = response.data.data;
                        response.data.data.filter((a,i) => this.getConceptos(a,i));
                    }else this.loading = false;
                }).catch(e => {
                    console.log(e);
                    this.loading = false;
                });
            },
            getConceptos(data,i){//trae los conceptos de un pedido
                Pedidos().get(`/${data.id}/conceptos`).then((response) => {
                    this.aux[i].conceptos = response.data.data;
                    if(i == this.aux.length - 1) {
                        this.loading = false;
                        this.pedidos = this.aux;
                        this.setUltimasOrdenes(this.pedidos);
                        window.localStorage.setItem("ultimasOrdenes",JSON.stringify(this.pedidos));
                    }
                }).catch(e => {
                    console.log(e);
                    this.loading = false;
                });
            },
        }
    }
</script>