<template>
    <v-dialog v-model="dialogChange" width="800">
        <v-card  :height="$vuetify.breakpoint.smAndDown ? null:500" width="100%">
            <v-card-title>
                <v-toolbar elevation="0">
                    <v-spacer></v-spacer>
                        <v-toolbar-items>
                            <v-btn fab  icon @click="dialogChange = false">
                                <v-icon color="#000" >
                                    close
                                </v-icon>
                            </v-btn>
                        </v-toolbar-items>
                </v-toolbar>
            </v-card-title>
            <v-card-text>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-img 
                            :src="producto.img" 
                            width="100%" 
                            height="300" 
                            contain 
                            class="pt-4"
                        />
                    </v-col>
                    <v-col cols="12" md="6" class="py-3 px-5">
                        <v-subheader class="headline">Samsung</v-subheader>
                        <div class="headline font-weight-black">
                            Tarjeta de memoria con adaptador de 32&nbsp;GB microSDHC EVO...
                        </div>
                        <v-row align="baseline">
                            <v-col cols="12" md="6" sm="6">
                                <v-rating
                                    class="my-3"
                                    v-model="rating"
                                    background-color="orange lighten-3"
                                    color="orange"
                                    dense
                                    readonly
                                />
                            </v-col>
                            <v-col cols="12" md="6" sm="3">
                                <span class="black--text text--lighten-2 caption mr-2">
                                    ({{ rating }})
                                </span>
                            </v-col>
                            <v-col cols="12" md="12">
                                <span class="title font-weight-black">US$ 20.00</span>
                            </v-col>
                            <v-col cols="12" sm="12" md="8" :offset="$vuetify.breakpoint.smAndDown ? null:2">
                                <v-btn @click="push" color="#005598" dark block class="caption text-capitalize" elevation="5">
                                    Ver detalles del producto
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>

            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import {mapState,mapActions} from 'vuex';
import router from '@/router';

    export default {
        data() {
            return {
                rating:3.5
            }
        },
        computed: {
            ...mapState(['dialog','producto']),

            dialogChange:{
                get(){
                    return this.dialog;
                },
                set(val){
                    this.setDialog(val);
                }
            }
        },
        methods: {
            ...mapActions(['setDialog']),

            push(){
                this.setDialog(false);
                router.push('/producto/detalle');
            }
        },

    }
</script>