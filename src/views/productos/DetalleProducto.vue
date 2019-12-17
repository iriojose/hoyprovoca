<template>
    <div>
        <!--Navbar -->
        <v-toolbar width="100%" height="50" color="#005598">
           <v-btn text to="/" disabled>
               <v-img width="120" height="120" src="@/assets/logo2.png" contain></v-img>
           </v-btn>
           <v-spacer></v-spacer>
           <v-btn to="/" text elevation="0" dark class="caption text-capitalize">
               Seguir Comprando
           </v-btn>
        </v-toolbar>

        <!--404 en caso de error-->
        <n404 v-if="error"/>
        <!--se muestra el detalle del producto -->
        <v-row class="mt-5 px-5" v-else>
            <v-col cols="12" md="5">
                <v-card height="400" elevation="10" class="py-5">
                    <v-img contain src="https://www.fourjay.org/myphoto/f/0/3981_laptop-png.png"></v-img>
                </v-card>
            </v-col>
            <v-col cols="12" md="5">
                <v-card color="#eee" elevation="0">
                    <v-card-title>
                        <div class="black--text title">
                            {{concepto.nombre}}.
                        </div>
                    </v-card-title>
                    <v-card-text>
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
                                <strong class="black--text title">Bss.{{concepto.costo_promedio}}</strong>
                            </v-col>
                            <v-col cols="12" md="12" sm="12">
                                <strong class="green--text title" v-if="concepto==1">Disponible.</strong>
                                <strong class="red--text title" v-else>No disponible.</strong>
                            </v-col>
                            <v-col cols="12" md="12">
                                <p class="black--text darken-1 subtitle-1">
                                    {{concepto.descripcion}}.
                                </p>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>

            <v-col cols="12" md="2">
                <v-card elevation="0" class="cuadro px-2 py-5">
                    <v-card-text>
                        <v-tooltip left>
                            <template v-slot:activator="{ on }">
                                <div v-on="complete ? on:null">
                                    <v-btn :disabled="complete" color="#005598" class="white--text text-capitalize caption">
                                        <v-icon color="#fff">shopping_cart</v-icon>
                                        Agregar al carrito
                                    </v-btn>
                                </div> 
                            </template>
                            <span>le falta algo más</span>
                        </v-tooltip>
                    </v-card-text>

                    <v-card-actions class="display-inline">
                        <v-tooltip left>
                            <template v-slot:activator="{ on }">
                                <div v-on="restar ? on:null">
                                    <v-btn :disabled="restar" icon @click="resta()">
                                        <v-icon>delete</v-icon>
                                    </v-btn>
                                </div> 
                            </template>
                            <span>Minimo para agregar</span>
                        </v-tooltip>

                        <div class="mx-10">{{cant}}</div>

                        <v-tooltip left>
                            <template v-slot:activator="{ on }">
                                <div v-on="suma ? on:null">
                                    <v-btn :disabled="suma" icon @click="sumar()">
                                        <v-icon>exposure_plus_1</v-icon>
                                    </v-btn>
                                </div> 
                            </template>
                            <span>Maximo alcanzado</span>
                        </v-tooltip>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
        <!--mensaje en caso de agregar producto -->
        <!--<v-snackbar right :color="errorMsj ? 'red':'green'" :timeout="3000">
            {{msj}}
        </v-snackbar>-->
    </div>
</template>

<script>
//services
import Conceptos from '@/services/Conceptos';
import Movimiento_deposito from '@/services/Movimiento_deposito';
import Empresa from '@/services/Empresa';
//componentes
import n404 from '@/views/NotFound';

    export default {
        data(){
            return{
                //dinamicos
                id:'',
                concepto:{},
                movimiento:{},
                empresa:{},
                error:false,
                cant:1,
                suma:false,
                restar:true,
                erroMsj:false,
                snackbar:false,
                msj:'',
                //los que estan default
                complete:true,
                rating:2.5,
            }
        },
        components:{
            n404
        },
        mounted(){
            if(this.$route.params.id){
                this.id=this.$route.params.id;
                //se trae el concepto
                this.getConcepto();
            }else{
                this.error=true;
            }
        },
        methods:{
            //trae el concepto segun id de ruta*
            //se hace asi para evitar que el usuario coloque el id del producto
            //directamente en la ruta y de error
            //*si alguna de las llamadas falla mandara 404
            getConcepto(){
                Conceptos().get(`/${this.id}`).then((response) => {
                    this.concepto = response.data.data[0];
                    console.log(this.concepto);

                    //metodos necesarios
                    this.getEmpresa();
                    this.movimiento_deposito();
                }).catch(e => {
                    this.error=true;
                    console.log(e);
                });
            },

            movimiento_deposito(){//trae existencia del concepto
                Movimiento_deposito().get(`/?conceptos_id=${this.id}`).then((response) => {
                    this.movimiento = response.data.data[0];
                    console.log(this.movimiento);
                }).catch(e => {
                    this.error =true;
                    console.log(e);
                });
            },

            getEmpresa(){//la empresa a la cual pertenece el producto
                Empresa().get(`/${this.concepto.empresa_id}`).then((response) => {
                    console.log(response.data.data[0]);
                    this.empresa=response.data.data[0];
                }).catch(e => {
                    this.error=true;
                    console.log(e);
                });
            },

            //metodo para agregar al pedido del usuario
            //PD:falta restar la existencia al deposito
            /*async Pedidos().post('/id').then((response) => {
                    //agregar
                    this.errorMsj=false;
                    this.msj='Se ha agregado correctamente';
                    this.snakbar=true;
                }).catch(e=> {
                    console.log(e);
                    this.errorMsj=true;
                    this.msj='No se pudo agregar';
                    this.snakbar=true;
                });
            */

            //botones para agregar y disminuir la cantidad requerida por usuario
            resta(){
                if(this.cant <= this.movimiento.existencia){
                    this.suma=false;
                }

                if(this.cant == 2){
                    this.cant= this.cant - 1;
                    this.restar=true;
                }else{
                    this.cant=this.cant-1;
                    this.restar=false;
                }
            },
            sumar(){
                //evaluacion inicial ya que esta por defecto desabilitada
                //si sumas se habilita el boton de restar
                if(this.cant >= 1){
                    this.restar=false;
                }

                if(this.cant >= this.movimiento.existencia - 1){
                    this.cant=this.cant+1;
                    this.suma=true;
                }else{
                    this.cant=this.cant+1;
                    this.suma=false;
                }
            },
        }
    }
</script>
