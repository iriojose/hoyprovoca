<template>
    <v-dialog v-model="dialogs" close-delay width="500" :persistent="loading" transition="dialog-bottom-transition"> 
        <v-card width="100%" height="250" class="px-10 py-5">
            <div class="text-center font-weight-black subtitle-1">
                ¡Oopss!
            </div>
            <div class="text-center font-weight-black body-1 grey--text mt-5">
                ¿estas seguro que quiere eliminar los pedidos del carrito?
            </div>
            <v-card-text>
                <v-row justify="center" align="center">
                    <v-col cols="12" sm="5" md="5">
                        <v-hover v-slot:default="{hover}">
                            <v-btn 
                                :elevation="hover ? 3:1" 
                                :text="hover ? false:true" 
                                :color="hover ? '#005598':null"
                                :dark="hover ? true:false"
                                class="text-capitalize"
                                :disabled="loading"
                                block
                                @click="close()"
                            >
                                No, volver
                            </v-btn>
                        </v-hover>
                    </v-col>
                    <v-col cols="12" sm="5" md="5">
                        <v-hover v-slot:default="{hover}">
                            <v-btn 
                                :elevation="hover ? 3:1" 
                                :text="hover ? false:true" 
                                :color="hover ? '#005598':null"
                                :dark="hover ? true:false"
                                class="text-capitalize"
                                block
                                :loading="loading"
                                @click="adelete()"
                            >
                                Sí, seguro
                            </v-btn>
                        </v-hover>
                    </v-col>
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
            adelete(){
                this.loading = true;
                this.pedidos.filter(a => this.deletePedidos(a.id));
                this.deleteCarrito();
                this.loading = false;
            },
            deletePedidos(id){
                Pedidos().delete(`/${id}`).then((response) => {
                    this.close();
                }).catch(e => {
                    console.log(e);
                });
            }
        },
    }
</script>
