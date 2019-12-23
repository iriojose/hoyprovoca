<template>
    <v-dialog v-model="validacionConcepto" width="600">
        <v-card>
            <div class="title text-center red--text mt-3" v-if="existencia.existencia <= 0.00">
                Este servicio no se encuentra disponible...
                <v-img src="@/assets/undrawemptymodal.svg" contain width="100%" height="200"></v-img>
            </div>

            <div v-else>
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
                    <v-btn @click="restar" color="#005598" :disabled="disabled || disabledResta" class="mx-2" tile icon>
                        <v-icon dark>delete</v-icon>
                    </v-btn>

                    <div class="mx-2 font-weight-black subtitle-1">{{count}}</div>

                    <v-btn @click="sumar" color="#005598" :disabled="disabled || disabledSuma" class="mx-2" tile icon>
                        <v-icon dark>plus_one</v-icon>
                    </v-btn> 

                    <v-spacer></v-spacer>

                     <v-btn :disabled="disabled" @click="push" class="text-capitalize white--text" color="#005598">
                        Dte Producto
                    </v-btn>
                    <v-btn :disabled="disabled" @click="agregar" class="text-capitalize white--text" color="#005598">
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
        props:{
            existencia:{
                type:Object,
                default: () => {}
            }
        },
        data() {
            return {
                loading:false,
                snackbar:false,
                disabled:false,
                count:1,
                disabledSuma:false,
                disabledResta:true,
            }
        },

        watch:{
            existencia(){
                this.count=1;
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

            agregar(){//lo agrega al pedido
                this.disabled=true;
                this.snackbar=true;
                setTimeout(() => {
                    this.validacionConcepto=false;
                    this.disabled=false;
                },3000);
            },

           sumar(){//aumenta la cantidad del producto a pedir
                if(this.count >= 1){
                    this.disabledResta=false;
                }

                if(this.count >= this.existencia.existencia - 1){
                    this.count++
                    this.disabledSuma=true;
                }else{
                    this.count++
                    this.disabledSuma=false;
                }
           },

           restar(){//resta el numero que quieres a pedir
                if(this.count <= this.existencia.existencia){
                    this.disabledSuma = false;
                }

                if(this.count == 2){
                    this.count--;
                    this.disabledResta = true;
                }else{
                    this.count--;
                    this.disabledResta = false;
                }
           }
        },
    }
</script>
