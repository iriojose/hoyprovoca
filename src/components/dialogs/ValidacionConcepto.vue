<template>
    <v-dialog v-model="validacionConcepto" width="600">
        <v-card>
            <v-card-title>
               <!-- <v-toolbar elevation="0" height="50">
                    
                    <v-img width="70" height="70" contain :src="producto.img" />

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
                </v-toolbar> --> 
            </v-card-title>

            <v-card-text>
                 <div class="title text-center red--text">
                    Este servicio no se encuentra disponible...
                    <v-img src="@/assets/undrawemptymodal.svg" contain width="100%" height="200"></v-img>
                </div>

                <!-- <div v-if="producto.licor" class="text-center">
                    <div class="grey--text darken-2 title">¿Eres mayor de 18 años?</div>
                    <v-divider></v-divider>
                    <v-row class="my-4">
                        <v-col cols="12" md="6" sm="6">
                            <v-btn @click="agregar" width="100" depressed outlined color="#005598" elevation="5">
                                Si
                            </v-btn>
                        </v-col>
                         <v-col cols="12" md="6" sm="6">
                            <v-btn  @click="validacionConcepto = false" width="100" depressed outlined color="#005598" elevation="5">
                               No
                            </v-btn>
                        </v-col>
                    </v-row>
                </div> --> 

                <!-- <div v-if="producto.ropa">
                    <v-row>
                        <v-col cols="12" md="6" sm="12">
                            <div class="text-center grey--text darken-2 title">Talla</div>
                            <v-radio-group v-model="radioGroup">
                                <v-radio
                                    v-for="talla in tallas"
                                    :key="talla.id"
                                    :label="talla.talla"
                                    color="#005598"
                                ></v-radio>
                            </v-radio-group>
                        </v-col>
                        <v-col cols="12" md="6" sm="12">
                            <div class="text-center grey--text darken-2 title">Color</div>
                            <v-select
                                class="my-5"
                                color="#005598"
                                :items="colores"
                                filled
                                item-color="#000"
                                label="Colores"
                                v-model="color"
                            ></v-select>
                        </v-col>
                        
                        <v-col cols="12" md="8" sm="8" offset="2" class="my-3">
                            <v-btn 
                                @click="agregar"  
                                dark 
                                color="#005598" 
                                block elevation="5" 
                                class="caption text-capitalize"
                            >
                                Agregar
                            </v-btn>
                        </v-col>
                    </v-row>
                </div>--> 
            </v-card-text>
        </v-card>
        <v-snackbar v-model="snackbar" right color='green' :timeout="5000">
            Añadido al carro.
            <v-img contain width="50" height="50" :src="producto.img"></v-img>
        </v-snackbar>
    </v-dialog>
</template>

<script>
import {mapState,mapActions} from 'vuex';

    export default {
        data() {
            return {
                loading:false,
                radioGroup: 1,
                snackbar:false,
                color:'',
                tallas:[
                    {id:1,talla:'xs'},
                    {id:2,talla:'sm'},
                    {id:3,talla:'md'},
                    {id:4,talla:'lg'},
                    {id:5,talla:'xl'},
                    {id:6,talla:'sl'},
                ],
                colores:['Azul','amarillo','rojo','verde','rosa','morado']
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
            }
        },
        methods: {
            ...mapActions(['setValidacionConcepto']),

            agregar(){
                this.snackbar=true;
                setTimeout(() => {
                    this.validacionConcepto=false;
                },3000);
            }
        },
    }
</script>
