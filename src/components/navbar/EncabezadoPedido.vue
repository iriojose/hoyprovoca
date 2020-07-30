<template>
    <v-toolbar elevation="0" height="50" color="#fff">
        <v-btn  
            :loading="loading" :disabled="loading" light
            @click.stop.prevent="deletePedido(pedido.id)" 
            icon title="Borrar" text :elevation="0"
        >
            <v-icon color="#232323">mdi-delete</v-icon>
        </v-btn>

        <v-spacer></v-spacer>

        <v-avatar class="elevation-2" color="#eee" size="50">
            <v-img :src="image+pedido.imagen"></v-img>
        </v-avatar>

        <v-spacer></v-spacer>

        <div class="font-weight-black black--text">{{sale}}</div>
    </v-toolbar>
</template>

<script>
import variables from '@/services/variables_globales';
import Pedidos from '@/services/Pedidos';
import {mapActions} from 'vuex';
import accounting from 'accounting';

    export default {
        props:{
            pedido:{
                type:Object,
                default:() => ({})
            },
            total:{
                type:Number,
                default:0
            },
            index:{
                type:Number,
                default:-1,
            }
        },
        data(){
            return {
                ...variables,
                loading:false,
                sale:'',
            }
        },
        watch: {
            total(){
                this.sale = accounting.formatMoney(+this.total,{symbol:"$ ",thousand:',',decimal:'.'});
            }
        },
        mounted() {
            this.sale = accounting.formatMoney(+this.total,{symbol:"$ ",thousand:',',decimal:'.'});
        },
        methods:{
            ...mapActions(['deletePedidoStore']),
            
            success(mensaje){
                this.$toasted.success(mensaje, { 
                    theme: "toasted-primary", 
                    position: "top-right", 
                    duration : 2000,
                    //icon : "mdi-check",
                });
                this.loading = false;
            },
            error(mensaje){
                this.$toasted.error(mensaje, { 
                    theme: "toasted-primary", 
                    position: "top-right", 
                    duration : 2000,
                    //icon : "mdi-error",
                });
                this.loading = false;
            },
            deletePedido(id){
                this.loading=true;
                Pedidos().delete(`/${id}`).then((response) => {
                    this.success('Pedido eliminado exitosamente.');
                    this.deletePedidoStore(this.index);
                }).catch(() => {
                    this.error('Error al eliminar el pedido.');
                });
            }
        }
    }
</script>