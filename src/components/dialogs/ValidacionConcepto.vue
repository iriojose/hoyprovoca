<template>
    <v-dialog v-model="validacionConcepto" width="600">
        <v-card>
            <div>
                <v-card-title>
                    <v-toolbar elevation="0" height="50">
                        <v-toolbar-title>
                            {{producto.nombre}}
                        </v-toolbar-title>
                        <v-spacer></v-spacer>
                            <v-toolbar-items>
                                <v-btn fab  icon @click="validacionConcepto = false">
                                    <v-icon color="#000" >
                                        close
                                    </v-icon>
                                </v-btn>
                            </v-toolbar-items>
                    </v-toolbar> 
                </v-card-title>

                <v-divider class="my-2"></v-divider>
                
                <v-card-text>
                    <v-row >
                        <v-col cols="12" md="6" sm="12">
                            <v-img width="300" height="100" contain src="@/assets/noimage.png" />
                            <div class="text-center mt-5">
                                BsS.{{producto.precio_a}}
                            </div>
                        </v-col>
                        <v-col cols="12" md="6" sm="12">
                            <v-textarea
                                filled
                                label="Acotación"
                                color="#005598"
                                clearable
                                auto-grow
                            >
                            </v-textarea>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-divider class="my-2"></v-divider>
                <v-card-actions>
                    <v-btn color="#005598" class="mx-2" tile icon>
                        <v-icon dark>exposure_neg_1</v-icon>
                    </v-btn>

                    <div class="mx-2 font-weight-black subtitle-1">1</div>

                    <v-btn color="#005598"  class="mx-2" tile icon>
                        <v-icon dark>plus_one</v-icon>
                    </v-btn> 

                    <v-spacer></v-spacer>

                     <v-btn :disabled="disabled" @click="push" class="text-capitalize white--text" color="#005598">
                        Dte Producto
                    </v-btn>
                    <v-btn :disabled="disabled" class="text-capitalize white--text" color="#005598">
                        Agregar
                    </v-btn>
                </v-card-actions>
            </div>
                 
        </v-card>
        <v-snackbar v-model="snackbar" right :timeout="5000">
            Añadido al carro.
            <v-img contain width="50" height="50" src="@/assets/noimage.png"></v-img>
        </v-snackbar>
    </v-dialog>
</template>

<script>
import {mapState,mapActions} from 'vuex';
import router from '@/router';

    export default {
        data() {
            return {
                loading:false,
                snackbar:false,
                disabled:true,
            }
        },

        computed: {
            ...mapState(['validacionConcep','producto']),

            validacionConcepto:{
                get(){
                    return this.validacionConcep;
                },
                set(val){
                    this.setValidacionConcepto(val);
                }
            }, 

        },
        methods: {
            ...mapActions(['setValidacionConcepto']),

            push(){//lleva al detalle del concepto
                this.setValidacionConcepto(false);
                router.push(`/producto/${this.producto.id}`);
            },

            

           
        },
    }
</script>
