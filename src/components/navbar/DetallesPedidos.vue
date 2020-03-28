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
                    :elevation="hover ? 5:0"
                >
                    <v-icon small>delete</v-icon>
                </v-btn>
            </v-hover>

            <v-hover v-slot:default="{hover}" v-else>
                <v-btn @click="resta(detalle,i)" :loading="loading" :disabled="loading" width="40" height="40" tile icon :elevation="hover ? 5:0">
                    <v-icon small>remove</v-icon>
                </v-btn>
            </v-hover>

            <div class="mx-3">{{Number.parseInt(detalle.cantidad)}}</div>

            <v-hover v-slot:default="{hover}">
                <v-btn @click="suma(detalle,i)" :disabled="loading" :loading="loading" width="40" height="40" tile icon :elevation="hover ? 5:0">
                    <v-icon small>add</v-icon>
                </v-btn>
            </v-hover>

            <v-spacer></v-spacer>
            <div class="font-weight-black">Bs {{detalle.precio}}</div>
        </v-toolbar>

        <v-snackbar absolute v-model="snackbar" :color="color" bottom right :timeout="3000">
            <div>
                <v-icon color="#fff" class="mx-2">{{icon}}</v-icon>{{mensaje}}
            </div>
        </v-snackbar>
    </div>
</template>

<script>
import variables from '@/services/variables_globales';
import Pedidos from '@/services/Pedidos';
import Conceptos from '@/services/Conceptos';
import {mapActions} from 'vuex';

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
                snackbar:false,
                loading:false,
                icon:'',
                mensaje:'',
                color:'',
                data:{
                    indexDetalle:-1,
                    indexPedido:-1,
                    cantidad:0
                }
            }
        },
        methods: {
            ...mapActions(['setSnackbar','updatePedidoStore','deleteDetalleStore','updateDetalleStore']),

            alert(color,icon,mensaje){
                this.color=color;
                this.icon=icon;
                this.mensaje=mensaje;
                this.loading=false;
                this.snackbar = true;
            },
            deleteDetalle(detalle,index){
                this.loading = true;
                this.data.indexDetalle=index;
                this.data.indexPedido=this.indexPedido;

                Pedidos().delete(`/${detalle.rest_pedidos_id}/detalles/${detalle.id}`).then((response) => {
                    this.deleteDetalleStore(this.data);
                    this.alert('#388E3C','done','detalle eliminado exitosamente.');
                }).catch(e => {
                    console.log(e);
                    this.alert('#D32F2F','error','Ooops, ocurrio un error.');
                });
            },
            suma(detalle,i){
                this.loading = true;
                let cantidad = Number.parseInt(detalle.cantidad);
                cantidad+=1;
                console.log(cantidad);
                this.getConceptoExistencia(detalle,cantidad,i);
            },
            resta(detalle,i){
                this.loading = true;
                let cantidad = Number.parseInt(detalle.cantidad);
                cantidad -= 1;
                this.getConceptoExistencia(detalle,cantidad,i);
            },
            getConceptoExistencia(detalle,cantidad,i){
                Conceptos().get(`${detalle.adm_conceptos_id}/depositos`).then((response) => {
                    if(!Number.parseInt(detalle.cantidad) > cantidad || response.data.data[0].existencia < cantidad){
                        this.alert('#D32F2F','error','Ooops, agotado '+response.data.data[0].existencia+'.');
                    }else{
                        this.updateDetalle(detalle,cantidad,i);
                    }
                }).catch(e => {
                    console.log(e);
                    this.alert('#D32F2F','error','Ooops, ocurrio un error.');
                });
            },
            updateDetalle(detalle,cantidad,index){
                this.data.indexDetalle=index;
                this.data.indexPedido=this.indexPedido;
                this.data.cantidad = cantidad;

                Pedidos().post(`/${detalle.rest_pedidos_id}/detalles/${detalle.id}`,
                {data:{cantidad:this.data.cantidad}}).then((response) => {
                    this.updateDetalleStore(this.data);
                    this.alert('#388E3C','done','detalle Actualizado exitosamente.');
                }).catch(e => {
                    console.log(e);
                    this.alert('#D32F2F','error','Ooops, ocurrio un error.');
                })
            }
        },
    }
</script>