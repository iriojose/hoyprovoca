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
                <v-row justify="center" v-if="!ultimasOrdenes" class="mt-5">
                    <v-img contain width="250" height="250" src="@/assets/empty.svg"></v-img>
                </v-row>
                <div v-if="!ultimasOrdenes" class="text-center title font-weight-black">No tienes pedidos pendientes.</div>
                
                <v-card v-else elevation="0" color="#fff" width="100%">
                    <v-expansion-panels flat>
                        <v-expansion-panel v-for="(pedido,i) in ultimasOrdenes" :key="i" flat>
                            <v-expansion-panel-header>
                                <v-card elevation="0">
                                    <v-card-title>
                                        <v-avatar size="50">
                                            <v-img :src="image+pedido.imagen"></v-img>
                                        </v-avatar>
                                        <v-spacer></v-spacer>
                                        <div class="font-weight-black">{{price(totales[i])}}</div>
                                        <v-spacer></v-spacer>
                                        <v-chip
                                            class="ma-1"
                                            color="green"
                                            text-color="white"
                                        >
                                            <div class="font-weight-black overline text-capitalize" v-if="pedido.rest_estatus_id == 2">Por verificar</div>
                                            <div class="font-weight-black overline text-capitalize" v-if="pedido.rest_estatus_id == 3">Verificado</div>
                                            <div class="font-weight-black overline text-capitalize" v-if="pedido.rest_estatus_id == 4">Por entregar</div>
                                            <div class="font-weight-black overline text-capitalize" v-if="pedido.rest_estatus_id == 5">En camino</div>
                                            <div class="font-weight-black overline text-capitalize" v-if="pedido.rest_estatus_id == 6">Completado</div>
                                        </v-chip>
                                        
                                    </v-card-title>
                                </v-card>
                            </v-expansion-panel-header>
                            <v-expansion-panel-content>
                                <v-row justify="start">
                                    <v-col :cols="$vuetify.breakpoint.smAndDown ? 6:12" md="3" v-for="(detalle,e) in pedido.detalles" :key="e">
                                        <v-card class="mx-auto" :max-width="'100%'">
                                            <v-img 
                                                class="align-end" height="150px" contain
                                                :src="typeof detalle.imagen === 'undefined'  || detalle.imagen === 'default.png' ? require('@/assets/box.svg') : image + detalle.imagen"
                                            >
                                            </v-img>
                                            <v-card-text class="text--primary">
                                                <v-card-title class="body-1 font-weight-black">{{pedido.conceptos[e].nombre}}</v-card-title>
                                                <div class="caption font-weight-black">Precio:{{detalle.precio_view}}</div>
                                                <div class="caption font-weight-black">Cantidad:{{+detalle.cantidad}}</div>
                                            </v-card-text>
                                        </v-card>
                                    </v-col>
                                </v-row>
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
import accounting from 'accounting';

    export default {
        data() {
            return {
                aux:[],
                ...variables,
                loading:true,
            }
        },
        computed: {
            ...mapState(['user','ultimasOrdenes','totales'])
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
            this.getPedidos();
        },
        methods:{
            ...mapActions(['setUltimasOrdenes']),

            price(precio){
                return accounting.formatMoney(+precio,{symbol:"$ ",thousand:',',decimal:'.'});
            },
            getPedidos(){
                this.loading = true;
                Clientes().get(`/${this.user.cliente.id}/pedidos/?rest_estatus_id > 1`).then((response) => {
                    if(response.data.data){
                        response.data.data.filter(a => a.detalles.filter(b => b.precio_view = accounting.formatMoney(+b.precio,{symbol:"$ ",thousand:',',decimal:'.'})));
                        this.aux = response.data.data;
                        response.data.data.filter((a,i) => this.getConceptos(a,i));
                    }else this.loading = false;
                }).catch(e => {
                    this.loading = false;
                });
            },
            getConceptos(data,i){//trae los conceptos de un pedido
                Pedidos().get(`/${data.id}/conceptos`).then((response) => {
                    this.aux[i].conceptos = response.data.data;
                    if(i == this.aux.length - 1) {
                        this.loading = false;
                        this.setUltimasOrdenes(this.aux);
                    }
                }).catch(e => {
                    this.loading = false;
                });
            },
        }
    }
</script>