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
                class="mx-4 mb-8"
                :title="concepto.nombre +' '+concepto.ultimo_costo"
            >
                <v-hover v-slot:default="{hover}">
                    <v-card height="200" width="200" :elevation="hover ? 10:4">
                        <v-img 
                            contain 
                            height="200" 
                            width="200" 
                            src="https://www.fourjay.org/myphoto/f/0/3981_laptop-png.png"
                            v-if="!concepto.imagen"
                        >
                            <div v-if="!hover" class="modif px-4 text-center d-inline-block text-truncate">{{concepto.nombre+' '}}{{concepto.ultimo_costo}}</div>
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
                        <!-- en caso de no tener imagen-->
                         <v-img 
                            contain 
                            height="200" 
                            width="200" 
                            src="@/assets/noimage.png"
                            v-else
                        >
                            <div v-if="!hover" class="modif px-4 text-center d-inline-block text-truncate">{{concepto.nombre+' '}}{{concepto.ultimo_costo}}</div>
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

        <!--Modales-->
        <DialogConceptos />
        <ValidacionConcepto :existencia="existencia"/>
    </div>
</template>

<script>
//modales
import DialogConceptos from '@/components/dialogs/DialogConceptos';
import ValidacionConcepto from '@/components/dialogs/ValidacionConcepto';
//state globales
import {mapState,mapActions} from 'vuex';
//router
import router from '@/router';
//services
import Conceptos from '@/services/Conceptos'

    export default {
        components:{
            DialogConceptos,
            ValidacionConcepto,
        },
        props:{
            conceptos:{
                type:Array,
                default:() => []
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
                existencia:{},
                prueba:{
                    id:1,
                    nombre:"empresa 1",
                    empresa_id:1,
                    usuario_id:1,
                    detalles:[]
                }
            }
        },
        computed: {
            ...mapState(['dialog','validacionConcep','user','producto','pedidos']),
        },
        methods: {
            ...mapActions(['setDialog','setProducto','setValidacionConcepto','setPedidos','setDetallePedidos']),

            vistarapida(item){
                this.setProducto(item);
                this.setDialog(true);
                this.getConceptos(this.producto.id);
            },

            agregar(item){
                if(this.user.loggedIn){
                    this.setProducto(item);
                    //this.setValidacionConcepto(true);
                    this.getConceptos(this.producto.id);
                }else{
                    router.push('/login');
                }
            },
            
            getConceptos(id){//trae la existencia del concepto
                Conceptos().get(`/${id}/depositos`).then((response) => {
                    let data = response.data.response.data;
                    for(let i=0; i< data.length; i++) {
                        if(data[i].depositos_id == 1){
                            this.existencia=data[i];
                        }
                    }
                    console.log(this.existencia);

                    if(this.existencia.existencia >= 0){
                        if(this.pedidos.length == 0){
                            this.setPedidos(this.prueba);
                            this.setDetallePedidos(this.producto);
                        }else{   
                            this.setDetallePedidos(this.producto);
                        }
                    }
                }).catch(e => {
                    console.log(e);
                });
            },


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