<template>
    <v-toolbar elevation="0" height="50">
        <v-hover v-slot:default="{hover}">
            <v-btn  
                :loading="loading" 
                :disabled="loading"
                @click.stop.prevent="deletePedido(pedido.id)" 
                icon
                title="ir a pagar"
                text
                :elevation="0"
            >
                <v-icon :color="hover ? '#232323':null">mdi-delete</v-icon>
            </v-btn>
        </v-hover>

        <v-spacer></v-spacer>

        <v-avatar class="elevation-2" color="#eee" size="50">
            <v-img :src="image+pedido.imagen"></v-img>
        </v-avatar>

        <v-spacer></v-spacer>

        <v-hover v-slot:default="{hover}">
            <v-btn  
                icon
                text
                :elevation="0"
                class="mx-4"
                title="ir a pagar"
                @click.stop.prevent="push(pedido)"
            >
                <v-icon :color="hover ? '#232323':null">attach_money</v-icon>
            </v-btn>
        </v-hover>

        <div class="font-weight-black">{{sale}}</div>
    </v-toolbar>
</template>

<script>
import variables from '@/services/variables_globales';
import Pedidos from '@/services/Pedidos';
import {mapActions} from 'vuex';
import accounting from 'accounting';
import router from '@/router';

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
                this.sale = accounting.formatMoney(+this.total,{symbol:"Bs ",thousand:'.',decimal:','});
            }
        },
        mounted() {
            this.sale = accounting.formatMoney(+this.total,{symbol:"Bs ",thousand:'.',decimal:','});
        },
        methods:{
            ...mapActions(['deletePedidoStore']),
            
            push(pedido){
                router.push('/checkout');
            },
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
            deletePedido(id){
                this.loading=true;
                Pedidos().delete(`/${id}`).then((response) => {
                    this.success('Pedido eliminado exitosamente.');
                    this.deletePedidoStore(this.index);
                }).catch(() => {
                    this.error('Ooops, ocurrio un error.');
                });
            }
        }
    }
</script>