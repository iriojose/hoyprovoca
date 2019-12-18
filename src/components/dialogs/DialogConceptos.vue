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
                            v-if="!producto.imagen"
                        />
                        <v-img 
                            src="@/assets/noimage.png" 
                            width="100%" 
                            height="300" 
                            contain 
                            class="pt-4"
                            v-else
                        />
                    </v-col>
                    <v-col cols="12" md="6" class="py-3 px-5">
                        <div v-if="producto.marcas_id">
                            <v-subheader v-for="marca in marcas" :key="marca.id" class="headline">{{marca.nombre}}</v-subheader>
                        </div>
                        <div class="headline font-weight-black">
                            {{producto.nombre}}
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
//state global
import {mapState,mapActions} from 'vuex';
//router
import router from '@/router';
//services
import Marcas from '@/services/Marcas';

    export default {
        data() {
            return {
                rating:3.5,
                marcas:[]
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
        watch:{
            producto(){
                this.getMarcas();
            }
        },
        methods: {
            ...mapActions(['setDialog']),

            push(){
                this.setDialog(false);
                router.push(`/producto/${this.producto.id}`);
            },

            getMarcas(){
                if(this.producto.marcas_id){
                    Marcas().get(`/${this.producto.marcas_id}`).then((response) => {
                        console.log(response.data.data);
                        this.marcas= response.data.data;
                    }).catch(e => {
                        console.log(e);
                    });
                }
            }
        },

    }
</script>