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
                                BsS.{{producto.precio_a * cant}}
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
                    <v-btn class="mx-2" icon :disabled="cant==1 ? true:false" @click="restar">
                        <v-icon dark>exposure_neg_1</v-icon>
                    </v-btn>

                    <div class="mx-2 font-weight-black subtitle-1">{{cant}}</div>

                    <v-hover v-slot:default="{hover}">
                        <v-btn class="mx-2" icon @click="sumar" :color="hover ? '#005598':null">
                            <v-icon dark>plus_one</v-icon>
                        </v-btn> 
                    </v-hover>

                    <v-spacer></v-spacer>

                     <v-btn :disabled="disabled" @click="push" class="text-capitalize white--text" color="#005598">
                        Dte Producto
                    </v-btn>
                    <v-btn class="text-capitalize white--text" color="#005598" @click="agregarConcepto">
                        Agregar
                    </v-btn>
                </v-card-actions>
            </div>
                 
        </v-card>
        <v-snackbar v-model="snackbar" right :color="error? 'red':null">
            <div v-if="!error">
                <v-img contain width="50" height="50" src="@/assets/noimage.png"></v-img>
            </div>
            <div v-else>
                No hay existencia.
            </div>
        </v-snackbar>
    </v-dialog>
</template>

<script>
import {mapState,mapActions} from 'vuex';
import router from '@/router';
//services
import Conceptos from '@/services/Conceptos';
import Pedidos from '@/services/Pedidos';

    export default {
        data() {
            return {
                loading:false,
                snackbar:false,
                disabled:true,
                cant:1,
                error:false
            }
        },
        watch: {
            validacionConcep(){//reinicia el contador
                this.cant=1;
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
        methods:{
            ...mapActions(['setValidacionConcepto']),

            push(){//lleva al detalle del concepto
                this.setValidacionConcepto(false);
                router.push(`/producto/${this.producto.id}`);
            },
            restar(){
                this.cant=this.cant-1;
            },
            sumar(){
                this.cant=this.cant+1;
            },

            agregarConcepto(){
               this.getConceptoExistencia();
            },

            getConceptoExistencia(){//trae la existencia del cocnepto y verifica si se puede agregar
                Conceptos().get(`/${this.producto.id}/depositos`).then((response) =>{
                    let existencia = response.data.data[0].existencia;
                    if(Number.parseInt(existencia) > this.cant){
                        this.snackbar=true;
                    }else{
                        this.snackbar=true;
                        this.error=true;
                    }
                }).catch(e =>{
                    this.error=true;
                    console.log(e);
                })
           }
        },
    }
</script>
