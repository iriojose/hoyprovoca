<template>
    <v-card elevation="0" :max-height="'572.5px'" class="orders-container">
        <div class="font-weight-black title pt-8 mb-5" style="padding-top:10px;text-align:center;">
            Últimas Ordenes
        </div>

        <v-card-text>
            <v-container fluid v-if="loading">
                <v-row justify="center" class="fill-height" align="center" style="height:500px;">
                    <Loading />
                </v-row>
            </v-container>

            <v-card elevation="0" color="#fff" width="100%" height="100%" v-else>
                <v-row justify="center" v-if="ultimasOrdenes.length == 0" class="mt-5">
                    <v-img contain width="250" height="250" src="@/assets/empty.svg"></v-img>
                </v-row>
                <div v-if="ultimasOrdenes.length == 0" class="text-center title font-weight-black">No tienes pedidos pendientes.</div>
                
                <v-card v-else elevation="0" color="#fff" width="100%">
                    <v-expansion-panels flat>
                        <v-expansion-panel class="pedido" v-for="(pedido,i) in ultimasOrdenes" :key="pedido.id" flat>
                            <v-expansion-panel-header>
                                <v-card elevation="0" class="internal">
                                    <v-card-title style="position:relative;">
                                        <v-row justify="center">
                                            <v-col cols="3" sm="3" style="text-align:center;">
                                                <span class="c-title subtitle-2">Proveedor</span>
                                                <v-avatar size="60" style="transform:translateY(12px)">
                                                    <v-img :src="image+pedido.imagen"></v-img>
                                                </v-avatar>
                                            </v-col>
                                            <v-col cols="8" sm="3" style="text-align:center;" class="xs-left">
                                                <span class="c-title subtitle-2">Total</span>
                                                <div class="title" style="font-weight:bold;">{{price(totales[i])}}</div>
                                            </v-col>
                                            <v-col cols="6" sm="3" class="d-none d-sm-flex " style="text-align:center!important;">
                                                <span class="c-title subtitle-2">Articulos</span>
                                                <div class="title">{{ pedido.detalles.length }}</div>
                                            </v-col>
                                            <v-col cols="12" sm="3" style="text-align:center;">
                                                <v-chip
                                                    class="ma-1"
                                                    color="green"
                                                    text-color="white"
                                                >
                                                    <div class="font-weight-black overline text-capitalize">{{ getEstado(pedido.rest_estatus_id) }}</div>
                                                </v-chip>
                                            </v-col>
                                        </v-row>
                                        
                                    </v-card-title>
                                </v-card>
                            </v-expansion-panel-header>
                            <v-expansion-panel-content>
                                <v-row justify="start">
                                    <v-col :cols="$vuetify.breakpoint.smAndDown ? 12:12" md="3" v-for="(detalle,e) in pedido.detalles" :key="e">
                                        <v-card class="mx-auto detalle" :max-width="'100%'" elevation="3">
                                            <v-img 
                                                class="align-end" height="150px" contain
                                                :src="typeof detalle.imagen === 'undefined'  || detalle.imagen === 'default.png' ? require('@/assets/box.svg') : image + detalle.imagen"
                                            >
                                            </v-img>
                                            <v-card-text class="text--primary">
                                                <v-card-title class="body-1 font-weight-black">{{typeof pedido.conceptos[e] !== 'undefined' ? pedido.conceptos[e].nombre : ""}}</v-card-title>
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
        components:{
            Loading:() => import("@/components/loaders/Loading")
        },
        data() {
            return {
                aux:[],
                ...variables,
                loading:true,
                estados: [
                    {
                        id: 1,
                        slug: "Nuevo"
                    },
                    {
                        id: 2,
                        slug: "Por Verificar"
                    },
                    {
                        id: 3,
                        slug: "Pagado"
                    },
                    {
                        id: 4,
                        slug: "En Espera"
                    },
                    {
                        id: 5,
                        slug: "En Camino"
                    },
                    {
                        id: 6,
                        slug: "Entregado"
                    },
                    {
                        id: 7,
                        slug: "Completado"
                    },
                    {
                        id: 8,
                        slug: "Pago Rechazado"
                    },
                ]
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
            getEstado(id) {
                return this.estados.find(i => i.id === id).slug || "Error"
            },
            getPedidos(){
                this.loading = true;
                Clientes().get(`/${this.user.cliente.id}/pedidos/?rest_estatus_id > 1`).then((pedidos) => {
                    if(pedidos.data.data){
                        pedidos.data.data.filter(a => a.detalles.filter(b => b.precio_view = accounting.formatMoney(+b.precio,{symbol:"$ ",thousand:',',decimal:'.'})));
                        this.aux = (pedidos.data.data || []).reverse();
                        let count = 0;
                        pedidos.data.data.forEach( (order, i) => {
                            Pedidos().get(`/${order.id}/conceptos`).then((conceptos) => {
                                count++;
                                this.aux[i].conceptos = conceptos.data.data
                                if(count === pedidos.data.data.length - 1) {
                                    this.setUltimasOrdenes(this.aux);
                                    setTimeout(() => this.loading = false, 1000);
                                }
                            }).catch(e => {
                                this.loading = false;
                            });
                        })

                    }else this.loading = false;
                }).catch(e => {
                    this.loading = false;
                });

                this.$forceUpdate();
            },
        }
    }
</script>

<style lang="scss">
    .c-title {
        position: absolute;
        top: 0px;
        font-weight:bold!important;
    }

    .pedido {
        border: 1px solid #eceff1
    }

    .pedido:nth-child(odd) {
        background: #eceff1!important;

        .v-card.internal {
            background: #eceff1!important;
        }
    }

    .pedido:nth-child(even) {
        .v-card.detalle  {
            background: #eceff1!important;
        }
    }

    .orders-container {
        overflow: auto;
    }

    .xs-left {
        @media only screen and (max-width: 500px) {
            transform: translateX(30px);
            div {
                transform: translateY(20px);
            }
        }
    }
</style>