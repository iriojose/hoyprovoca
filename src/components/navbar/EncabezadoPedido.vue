<template>
    <v-toolbar elevation="0" height="50">
        <v-hover v-slot:default="{hover}">
            <v-btn  
                :loading="loading" 
                :disabled="loading"
                @click="deletePedido(pedido.id)" 
                icon
                text
                :elevation="hover ? 5:0"
            >
                <v-icon>delete</v-icon>
            </v-btn>
        </v-hover>

        <v-hover v-slot:default="{hover}">
            <v-btn  
                icon
                text
                :elevation="hover ? 5:0"
                class="mx-4"
                title="ir a pagar"
                @click="push(pedido)"
            >
                <v-icon>attach_money</v-icon>
            </v-btn>
        </v-hover>

        <v-spacer></v-spacer>

        <v-avatar class="elevation-10" color="#eee" size="50">
            <v-img :src="image+pedido.imagen"></v-img>
        </v-avatar>

        <v-spacer></v-spacer>

        <div class="font-weight-black">{{sale}}</div>

        <v-snackbar v-model="snackbar" :color="color" bottom right :timeout="3000">
            <div>
                <v-icon color="#fff" class="mx-2">{{icon}}</v-icon>{{mensaje}}
            </div>
        </v-snackbar>
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
                mensaje:'',
                color:'',
                icon:'',
                loading:false,
                snackbar:false,
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
            mensajeSnackbar(color,icon,mensaje){
                this.color=color;
                this.icon=icon;
                this.mensaje=mensaje;
                this.loading=false;
                this.snackbar=true;
            },
            deletePedido(id){
                this.loading=true;
                Pedidos().delete(`/${id}`).then((response) => {
                    console.log(response);
                    this.mensajeSnackbar('#388E3C','done','Pedido eliminado exitosamente.');
                    this.deletePedidoStore(this.index);
                }).catch(e => {
                    console.log(e);
                    this.mensajeSnackbar('#D32F2F','error','Ooops, ocurrio un error.');
                });
            }
        }
    }
</script>