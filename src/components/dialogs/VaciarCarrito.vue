<template>
    <v-dialog v-model="dialogs" close-delay width="500" :persistent="loading" transition="dialog-bottom-transition">
        <v-card width="100%" class="pa-5">
            <v-card-title class="title font-weight-black">
                <v-spacer></v-spacer>
                    ¡Oopss!
                <v-spacer></v-spacer>
            </v-card-title>

            <v-card-text>
                <div class="text-center font-weight-black subtitle-1 grey--text my-5">
                    ¿estas seguro que quiere eliminar los pedidos del carrito?
                </div>

                <v-row justify="space-around">
                    <v-btn 
                        class="text-capitalize font-weight-bold" 
                        :disabled="loading" @click="close()"
                    >
                        No, Volver
                    </v-btn>

                    <v-btn 
                        :loading="loading" color="#0f2441" @click="deleteAll()"
                        class="white--text text-capitalize font-weight-bold"
                    >
                        Sí, seguro
                    </v-btn>
                </v-row>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import {mapActions,mapState} from 'vuex';
import Pedidos from '@/services/Pedidos';

    export default {
        data() {
            return {
                loading:false,
            }
        },
        computed: {
            ...mapState(['modalcarrito','pedidos']),
            dialogs:{
                get(){ return this.modalcarrito },
                set(val){ this.setModalCarrito(val) }
            }
        },
        methods: {
            ...mapActions(['deleteCarrito','setModalCarrito']),

            close(){
                this.setModalCarrito(false);
            },
            deleteAll(){
                this.loading = true;
                this.pedidos.filter((a,i) => this.deletePedidos(a.id,i));
            },
            deletePedidos(id,i){
                Pedidos().delete(`/${id}`).then(() => {
                    if(this.pedidos.length -1 == i){
                        this.deleteCarrito();
                        this.loading = false;
                        window.localStorage.setItem("pedidos","");
                        this.close();
                    }
                }).catch(e => {
                    console.log(e);
                });
            }
        },
    }
</script>