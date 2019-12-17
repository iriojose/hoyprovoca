<template>
    <div>
        <div class="headline ml-12 mt-12 font-weight-black">Productos mas vendidos</div>
        <v-slide-group
            show-arrows
            class="my-5"
        >
            <v-slide-item
                v-for="concepto in  conceptos"
                :key="concepto.id"
                class="mx-4"
                :title="concepto.nombre +' '+concepto.ultimo_costo"
            >
                <v-hover v-slot:default="{hover}">
                    <v-card height="200" width="200" :elevation="hover ? 10:4">
                        <v-img contain height="200" width="200" src="https://www.fourjay.org/myphoto/f/0/3981_laptop-png.png">
                            <div v-if="!hover" class="modif text-center d-inline-block text-truncate">{{concepto.nombre+' '}}{{concepto.ultimo_costo}}</div>
                            <transition class="scale-transition" v-else>
                                <v-overlay
                                    absolute
                                        color="#036358"
                                >
                                    <div class="mb-5 text-center">
                                        <v-btn 
                                            class="text-capitalize caption"
                                            @click="vistarapida(concepto)"
                                        >
                                            Vista ràpida
                                        </v-btn>
                                    </div>
                                    <div>
                                        <v-btn  
                                            class="text-capitalize caption"
                                            @click="agregar(concepto)"
                                        >
                                            Agregar al carrito
                                        </v-btn>
                                    </div>
                                </v-overlay>
                            </transition>
                        </v-img>
                    </v-card>
                </v-hover>
            </v-slide-item>
        </v-slide-group>
    </div>
</template>

<script>
import DialogConceptos from '@/components/dialogs/DialogConceptos';
import ValidacionConcepto from '@/components/dialogs/ValidacionConcepto';
import {mapState,mapActions} from 'vuex';
import router from '@/router';
import Movimiento_deposito from '@/services/Movimiento_deposito'

    export default {
        components:{
            DialogConceptos,
            ValidacionConcepto,
        },
        props:{
            conceptos:{
                type:Array,
                default:() => ([])
            },
            title:{
                type:String,
                default:''
            }
        },
        data() {
            return {
                model:1,
                snackbar:false,
            }
        },
        computed: {
            ...mapState(['dialog','validacionConcep','user','producto']),
        },
        methods: {
            ...mapActions(['setDialog','setProducto','setValidacionConcepto']),

            vistarapida(item){
                this.setProducto(item);
                this.setDialog(true);
            },

            agregar(item){
                if(this.user.loggedIn){
                   // let deposito = this.existencia(item.id);

                    this.setProducto(item);
                    if(item.existencia && !item.licor && !item.ropa && !item.servicio){
                        this.snackbar=true;
                    }else{
                        this.setValidacionConcepto(true);
                    }
                }else{
                    router.push('/login');
                }
            },
            
            getMovimiento_deposito(id){//trae la existencia del concepto
                Movimiento_deposito().get(`/${id}`).then((response) => {
                    return response.data.data;
                }).catch(e => {
                    console.log(e)
                });
            }
        },
    }
</script>

<style scoped>
    .modif{
        width: 100%;
        height: 40px;
        background: rgba(0,0,0,0.5);
        color: #fff;
        padding-top: 10px;
    }
</style>