<template>
    <div>
        <v-divider></v-divider>
        <v-toolbar elevation="0" height="60" v-for="(detalle,i) in detalles" :key="i">
            <v-avatar class="elevation-2" size="50">
                <v-img width="50" height="50" contain :src="image+detalle.imagen" />
            </v-avatar>
            <v-spacer></v-spacer>

            <v-hover v-slot:default="{hover}" v-if="detalle.cantidad == 1">
                <v-btn 
                    :loading="loading" :disabled="detalles.length == 1 ? true:false" 
                    width="40" height="40" tile icon
                    @click="deleteDetalle(detalle,i)" 
                    :elevation="hover ? 3:0" title="eliminar"
                >
                    <v-icon small>delete</v-icon>
                </v-btn>
            </v-hover>

            <v-hover v-slot:default="{hover}" v-else>
                <v-btn title="reducir" @click="resta(detalle,i)" :loading="loading" :disabled="loading" width="40" height="40" tile icon :elevation="hover ? 3:0">
                    <v-icon small>remove</v-icon>
                </v-btn>
            </v-hover>

            <div class="mx-3">{{Number.parseInt(detalle.cantidad)}}</div>

            <v-hover v-slot:default="{hover}">
                <v-btn title="agregar" @click="suma(detalle,i)" :disabled="loading" :loading="loading" width="40" height="40" tile icon :elevation="hover ? 3:0">
                    <v-icon small>add</v-icon>
                </v-btn>
            </v-hover>

            <v-spacer></v-spacer>
            <div class="font-weight-black">{{sales[i]}}</div>
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
                    icon : "done",
                });
                this.loading = false;
            },
            error(mensaje){
                this.$toasted.error(mensaje, { 
                    theme: "toasted-primary", 
                    position: "top-right", 
                    duration : 2000,
                    icon : "error",
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