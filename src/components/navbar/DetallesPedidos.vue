<template>
    <div>
        <!--v-card elevation="0" height="60" width="100%" v-for="(detalle,i) in detalles" :key="i" color="#fff">
            <v-row justify="space-around">
                <v-col cols="12" sm="1">
                    <v-avatar class="elevation-2" size="50">
                        <v-img width="50" height="50" contain :src="image+detalle.imagen" />
                    </v-avatar>
                </v-col>

                <v-col cols="12" sm="4" class="mt-3">
                    <div class="mx-2 body-1 font-weight-black black--text text-center">{{conceptos[i].nombre}}</div>
                </v-col>

                <v-col cols="12" sm="4" class="mt-3">
                    <div class="font-weight-black black--text text-center">{{sales[i]}}</div>
                </v-col>

                <v-col cols="12" sm="1">
                    <v-btn 
                        v-if="detalle.cantidad == 1" x-small fab
                        :loading="loading" :disabled="detalles.length == 1 ? true:false"
                        @click="deleteDetalle(detalle,i)" title="eliminar"
                    >
                        <v-icon color="#232323">mdi-delete</v-icon>
                    </v-btn>
                    <v-btn 
                        v-else title="reducir" @click="resta(detalle,i)" :loading="loading"
                        :disabled="loading" fab x-small
                    >
                        <v-icon color="#232323">mdi-remove</v-icon>
                    </v-btn>
                </v-col>

                <v-col cols="12" sm="1" class="mt-2">
                    <div class="font-weight-black body-1 black--text text-center ml-3">{{Number.parseInt(detalle.cantidad)}}</div>
                </v-col>

                <v-col cols="12" sm="1">
                     <v-btn 
                        title="agregar" @click="suma(detalle,i)" :loading="loading"
                        :disabled="loading" fab x-small
                    >
                        <v-icon color="#232323">mdi-add</v-icon>
                    </v-btn>
                </v-col>
            </v-row>
        </v-card-->
        <v-toolbar elevation="0" height="60" v-for="(detalle,i) in detalles" :key="i" color="#fff">
            <v-avatar class="elevation-2" size="50">
                <v-img width="50" height="50" contain :src="image+detalle.imagen" />
            </v-avatar>
            <v-spacer></v-spacer>
            <div class="mx-2 caption font-weight-black black--text">{{conceptos[i].nombre}}</div>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <div class="font-weight-black black--text caption">{{sales[i]}}</div>
            <v-spacer></v-spacer>
            
            <v-btn 
                :loading="loading" :disabled="detalles.length == 1 ? true:false" 
                width="40" height="40" tile icon
                @click="deleteDetalle(detalle,i)" light
                :elevation="0" title="eliminar"
                v-if="detalle.cantidad == 1"
            >
                <v-icon small color="#232323">mdi-delete</v-icon>
            </v-btn>
            
            <v-btn 
                title="reducir" light @click="resta(detalle,i)" 
                :loading="loading" :disabled="loading" width="40" height="40" 
                tile icon :elevation="0" v-if="detalle.cantidad > 1"
            >
                <v-icon small color="#232323">mdi-menu-left</v-icon>
            </v-btn>
           
            <div class="mx-1 black--text font-weight-black">{{Number.parseInt(detalle.cantidad)}}</div>
        
            <v-btn title="agregar" light @click="suma(detalle,i)" :disabled="loading" :loading="loading" width="40" height="40" tile icon :elevation="0">
                <v-icon small color="#000">mdi-plus</v-icon>
            </v-btn>
        </v-toolbar>
    </div>
</template>

<script>
import variables from '@/services/variables_globales';
import Pedidos from '@/services/Pedidos';
import {mapActions} from 'vuex';
import accounting from 'accounting';

    export default {
        props:{
            detalles:{
                type:Array,
                default:()=> ([])
            },
            conceptos:{
                type:Array,
                default:()=> ([])
            },
            indexPedido:{
                Type:Number,
                default:-1
            }
        },
        data(){
            return {
                ...variables,
                loading:false,
                data:{
                    indexDetalle:-1,
                    indexPedido:-1,
                    cantidad:0
                },
                sales:[]
            }
        },
        watch: {
            detalles(){
                this.detalles.filter(a => this.sales.push(accounting.formatMoney(+a.precio,{symbol:"Bs ",thousand:'.',decimal:','})));
            }
        },
        mounted() {
            this.detalles.filter(a => this.sales.push(accounting.formatMoney(+a.precio,{symbol:"Bs ",thousand:'.',decimal:','})));
        },
        methods: {
            ...mapActions(['setSnackbar','updatePedidoStore','deleteDetalleStore','updateDetalleStore']),
            success(mensaje){
                this.$toasted.success(mensaje, { 
                    theme: "toasted-primary", 
                    position: "top-right", 
                    duration : 2000,
                    //icon : "done",
                });
                this.loading = false;
            },
            error(mensaje){
                this.$toasted.error(mensaje, { 
                    theme: "toasted-primary", 
                    position: "top-right", 
                    duration : 2000,
                    //con : "error",
                });
                this.loading = false;
            },
            deleteDetalle(detalle,index){
                this.loading = true;
                this.data.indexDetalle=index;
                this.data.indexPedido=this.indexPedido;
                Pedidos().delete(`/${detalle.rest_pedidos_id}/detalles/${detalle.id}`).then((response) => {
                    this.deleteDetalleStore(this.data);
                    this.success('detalle eliminado exitosamente.');
                }).catch(e => {
                    console.log(e);
                    this.error('Ooops, ocurrio un error.');
                });
            },
            suma(detalle,i){
                this.loading = true;
                let cantidad = Number.parseInt(detalle.cantidad);
                cantidad+=1;
                this.updateDetalle(detalle,cantidad,i);
            },
            resta(detalle,i){
                this.loading = true;
                let cantidad = Number.parseInt(detalle.cantidad);
                cantidad -= 1;
                this.updateDetalle(detalle,cantidad,i);
            },
            updateDetalle(detalle,cantidad,index){
                this.data.indexDetalle=index;
                this.data.indexPedido=this.indexPedido;
                this.data.cantidad = cantidad;
                Pedidos().post(`/${detalle.rest_pedidos_id}/detalles/${detalle.id}`,
                {data:{cantidad:this.data.cantidad}}).then((response) => {
                    this.updateDetalleStore(this.data);
                    this.success('Detalle Actualizado exitosamente.');
                }).catch(e => {
                    console.log(e);
                    this.error('Ooops, ocurrio un error.');
                });
            }
        },
    }
</script>

<style lang="scss" scope>
    .custom-loader {
        animation: loader 1s infinite;
        display: flex;
    }
    @-moz-keyframes loader {
        from {
        transform: rotate(0);
        }
        to {
        transform: rotate(360deg);
        }
    }
    @-webkit-keyframes loader {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }
    @-o-keyframes loader {
        from {
            transform: rotate(0);
            }
        to {
            transform: rotate(360deg);
            }
        }
    @keyframes loader {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }
</style>