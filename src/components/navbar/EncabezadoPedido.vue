<template>
    <v-toolbar elevation="0" height="50" :color="theme.sidebar.card">
        <v-btn  
            :loading="loading" :disabled="loading" light
            @click.stop.prevent="deletePedido(pedido.id)" 
            icon title="Borrar" text :elevation="0"
        >
            <v-icon :color="theme.sidebar.font">mdi-delete</v-icon>
        </v-btn>

        <v-spacer></v-spacer>

        <v-avatar class="elevation-2 mx-2" color="#eee" size="50">
            <v-img :src="image+empresa.imagen"></v-img>
        </v-avatar>

        <v-spacer></v-spacer>

        <div class="text-truncate col-5 black--text font-weight-bold">
            {{empresa.nombre_comercial}}
        </div>

        <v-spacer></v-spacer>

        <div :style="`color:${theme.sidebar.font}`" class="font-weight-black ">{{sale}}</div>
    </v-toolbar>
</template>

<script>
import variables from '@/services/variables_globales';
import Pedidos from '@/services/Pedidos';
import {mapActions, mapState} from 'vuex';
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
                empresa:{
                    imagen:"default.png",
                    nombre_comercial:""
                }
            }
        },
        watch: {
            total(){
                this.sale = accounting.formatMoney(+this.total,{symbol:"$ ",thousand:',',decimal:'.'});
            }
        },
        mounted() {
            this.empresas.filter(a => a.id == this.pedido.adm_empresa_id ? this.empresa=a:null);
            this.sale = accounting.formatMoney(+this.total,{symbol:"$ ",thousand:',',decimal:'.'});
        },
        computed:{
          ...mapState(["theme","empresas"])
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