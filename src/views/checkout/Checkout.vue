<template>
    <div>
        <v-toolbar elevation="2" color="#005598">
            <v-toolbar-title>
                <v-img contain height="150" width="100" src="@/assets/logoaftim.png"></v-img>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-hover v-slot:default="{hover}">
                <v-btn :elevation="hover ? 2:0" color="#fff"
                    class="text-capitalize body-2 font-weight-bold" to="/"
                >
                    Seguir comprando
                </v-btn>
            </v-hover>
        </v-toolbar>
        <v-divider></v-divider>

        <v-row justify="center" class="mx-10">
            <v-col cols="12" md="12" sm="12">
                <div class="headline font-weight-black mt-5 mx-10">Checkout</div>
                <div v-if="pedido == {}" class="mx-10">
                    no hay pedido
                </div>
            </v-col>

            <v-col cols="12" md="6" sm="12">
                <v-card width="100%" height="400" elevation="0" class="px-5">
                    <v-list>
                        <v-list-item v-for="(detalle,i) in pedido.detalles" :key="i">
                            <v-list-item-avatar>
                                <v-img :src="image+detalle.imagen"></v-img>
                            </v-list-item-avatar>

                            <v-list-item-content class="mx-4">
                                Cantidad: {{Number.parseInt(detalle.cantidad)}}
                            </v-list-item-content>

                            <v-list-item-content>
                                {{sales[i]}}
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-card>
            </v-col>
            <v-col cols="12" md="4" sm="12">
                <v-card width="100%" height="200" elevation="0" class="pa-5">
                    <v-list>
                        <v-list-item>
                            <v-list-item-content>Subtotal:</v-list-item-content>
                            <v-list-item-content>asas</v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import accounting from 'accounting';
import {mapState} from 'vuex';
import variables from '@/services/variables_globales';
import Empresa from '@/services/Empresa';
import Usuario from '@/services/Usuario';
import Pedidos from '@/services/Pedidos';

    export default {
        data() {
            return {
                ...variables,
                pedido:{},
                empresa:{},
                sales:[],
            }
        },
        mounted() {
            if(this.$route.params.text){
                this.getEmpresa(this.$route.params.text);
            }
        },
        head:{
            title(){
                return {
                    inner:'Checkout',
                    separator:' ',
                    complement: ' '
                }
            }
        },
        computed: {
            ...mapState(['user'])
        },
        methods:{
            getEmpresa(text){
                Empresa().get(`/?nombre_comercial=${text}`).then((response) => {
                    this.empresa = response.data.data[0];
                    this.getPedidos(this.empresa.id);
                }).catch(e => {
                    console.log(e);
                });
            },
            getPedidos(){
                Usuario().get(`/${this.user.data.id}/pedidos`).then((response) => {
                    response.data.data.filter(a => this.empresa.id == a.adm_empresa_id ? this.pedido=a:null);
                    this.pedido.detalles.filter(a => this.sales.push(accounting.formatMoney(+a.precio,{symbol:"Bs ",thousand:'.',decimal:','})));
                }).catch(e => {
                    console.log(e);
                });
            },

        }
    }
</script>

<style lang="css" scope>
    .margen-top{
        margin-top:75px;
    }
    .margen-movil{
        margin-top:120px;
    }
    .shadow{
        box-shadow: 0px 6px 5px -4px rgba(35,35,35,0.4);
    }
</style>