<template>
    <v-dialog v-model="dialogPedido" width="500">

    </v-dialog>
</template>

<script>
import {mapState,mapActions} from 'vuex';

    export default {
        props:{
            id:{
                type:Number,
                default:0
            }
        },
        data(){
            return {
                pedido:{}
            }
        },
        computed: {
            ...mapState(['pedidos']),

            dialogPedido:{
                get(){
                    return this.dialogpedido;
                },
                set(val){
                    this.setDialogPedido(val);
                }
            }
        },
        methods:{
            ...mapActions(['setDialogPedido']),
            
            buscarPedido(){
                for (let i = 0; i < this.pedidos.length; i++) {
                    if(this.id == this.pedidos[i].id){
                        this.pedido=this.pedidos[i];
                    }
                }
            }
        }
    }
</script>
