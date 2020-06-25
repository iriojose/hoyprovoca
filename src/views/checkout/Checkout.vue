<template>
    <v-card elevation="0" color="#f7f7f7">
        <v-toolbar elevation="2" color="#0f2441">
            <v-toolbar-title>
                <v-img contain height="100" width="150" src="@/assets/logo 6.png" />
            </v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn
                elevation="2" color="#fff" to="/"
                class="text-capitalize body-2 font-weight-bold black--text"
            >
                Seguir comprando
            </v-btn>
        </v-toolbar>

        <v-card-text>
            <v-row justify="center" v-if="loading">
                <v-progress-circular
                    indeterminate size="100" class="margen-movil"
                    color="#0f2441" :width="4"
                ></v-progress-circular>
            </v-row>

            <div v-else>
                <div class="text-center my-5 display-1 font-weight-bold">
                    Checkout
                </div>

                <v-slide-group show-arrows :class="$vuetify.breakpoint.smAndDown ? 'mx-2': 'mx-10'">
                    <v-slide-item v-for="(pedido, i) in pedidos" :key="i">
                        <v-btn
                            :disabled="pedido.id == pedidoSelect.id" class="mx-2"
                            depressed rounded height="50" 
                            @click="seleccionarPedido(pedido)"
                        >
                            <v-avatar size="40" class="mx-2">
                                <v-img :src="image+pedido.imagen"></v-img>
                            </v-avatar>
                            {{pedido.empresa.nombre_comercial}}
                        </v-btn>
                    </v-slide-item>
                </v-slide-group>

                
                <v-row justify="center" class="mx-12 my-5">
                    <v-card class="pa-5" width="100%">
                        <v-col cols="12" md="8" sm="12">

                        </v-col>
                        <v-col cols="12" md="4" sm="12">

                        </v-col>
                    </v-card>
                </v-row>
            </div>
        </v-card-text>
    </v-card>
</template>

<script>
//adm_tipo_pago_id = 1 (Banesco panama)
//adm_tipo_pago_id = 2 (Zelle)
//adm_tipo_pago_id = 3 (Bancos nacionales)
import Usuario from '@/services/Usuario';
import Empresa from '@/services/Empresa';
import variables from '@/services/variables_globales';
import accounting from 'accounting';
import {mapState} from 'vuex';

    export default {
        data() {
            return {
                ...variables,
                loading:false,
                pedidos:[],
                pedidoSelect:{},
                total:0,
            }
        },
        computed: {
            ...mapState(['user'])
        },
        head: {
            title() {
                return {
                    inner: "Checkout",
                    separator: " ",
                    complement: " ",
                };
            },
        },
        mounted() {
            this.getPedidosUsuario();
        },
        methods: {
            getPedidosUsuario(){
                this.loading = true;
                Usuario().get(`/${this.user.data.id}/pedidos/?rest_estatus_id=1`).then((response) => {
                    this.pedidos = response.data.data;
                    this.pedidos.filter((a,i) => this.getEmpresas(a.adm_empresa_id,i)); 
                }).catch(e => {
                    console.log(e);
                });
            },
            getEmpresas(id,i){
                Empresa().get(`/${id}/?fields=nombre_comercial,imagen,id`).then((response) => {
                    this.pedidos[i].empresa = response.data.data;
                    if(this.pedidos.length -1 == i){
                        this.loading = false;
                        this.pedidoSelect = this.pedidos[0];
                        this.pedidos.filter(a => a.detalles.filter(b => b.precio = accounting.formatMoney(+b.precio,{symbol:"Bs ",thousand:'.',decimal:','})));
                        this.calcularTotal(this.pedidos[0].detalles);
                    }
                }).catch(e => {
                    console.log(e);
                });
            },
            calcularTotal(detalles){
                let suma = 0;
                detalles.filter(a => suma+= +a.precio * a.cantidad);
                this.total = accounting.formatMoney(+suma,{symbol:"Bs ",thousand:'.',decimal:','});
            },
            seleccionarPedido(evt){
                this.pedidoSelect = evt;
                this.calcularTotal(evt.detalles);
            }
        },
    }
</script>

<style lang="scss" scoped>
    .margen-top{
        margin-top:75px;
    }
    .margen-movil{
        margin-top:100px;
    }
</style>