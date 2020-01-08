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
                                            @click="agregarConceptos(concepto)"
                                            :disabled="loading"
                                            :loading="loading"
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
                                            @click="agregarConceptos(concepto)"
                                            :disabled="loading"
                                            :loading="loading"
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
import Conceptos from '@/services/Conceptos';
import Pedidos from '@/services/Pedidos';

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
                loading:false,
                usuario:null
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

            agregarConceptos(item){//
                this.loading=true;

                if(this.user.loggedIn){
                    this.setProducto(item);
                    //this.setValidacionConcepto(true);
                    this.getConceptosExistencia(item.id);
                }else{
                    router.push('/login');
                }
            },

            getConceptosExistencia(id){//trae la existencia del concepto del deposito de la web
                Conceptos().get(`/${id}/depositos`).then((response) => {
                    this.existencia = response.data.data[0];   

                    if(Number.parseInt(this.existencia.existencia) >= 0){
                        if(this.pedidos.length == 0){
                            this.postPedidos();
                        }else{
                            this.validacionSiExistePedidos();
                        }
                    }else{
                        console.log('no tiene existencia');
                    }
                }).catch(e => {
                    console.log(e);
                    this.loading=false;
                });
            },

            validacionSiExistePedidos(){//si existe un pedido a la empresa que pertenece ese concepto
                let bandera = false;
                let id=null;

                for (let i = 0; i < this.pedidos.length; i++){
                    if(this.pedidos[i].empresa_id == this.producto.empresa_id){
                        bandera=true;
                        id=this.pedidos[i].id;
                    }
                }
            
                if(bandera){
                    this.postPedidosDetalle(id);
                }else{
                    this.postPedidos();
                }
            },

            //posts de la Api
            postPedidos(){//crea un pedido y su primer detalle

                let data = {
                    rest_mesas_id:1,
                    rest_estatus_id:3,
                    estado:'para vender',
                    cant_personas:1,
                    usuario_id:16,
                    empresa_id:this.producto.empresa_id,
                }

                let data1 = [
                    {
                        conceptos_id:this.producto.id,
                        cantidad:1,
                        precio:this.producto.precio_a,
                        rest_estatus_id:7,
                        estado:'vendible',
                    }
                ]

                Pedidos().post("/",{data,data1}).then((response) => {
                    console.log(response.data.data);

                    let data3 = {
                        id:response.data.data.id,
                        rest_mesas_id:1,
                        rest_estatus_id:3,
                        estado:'para vender',
                        cant_personas:1,
                        usuario_id:16,
                        empresa_id:this.producto.empresa_id,
                        detalles:[]
                    }

                    let data2 = [
                        {
                            id:response.data.data.detalles[0].id,
                            conceptos_id:this.producto.id,
                            cantidad:1,
                            precio:this.producto.precio_a,
                            rest_estatus_id:7,
                            estado:'vendible',
                            rest_pedidos_id:response.data.data.id
                        }
                    ]

                    this.setPedidos(data3);//local
                    this.setDetallePedidos(data2[0]);//local
                    this.loading=false;
                }).catch(e =>{
                    console.log(e);
                    this.loading=false;
                });
            },

            postPedidosDetalle(id){//agrega un detalle a un pedido
                let data = {//api
                        rest_pedidos_id:id,
                        conceptos_id:this.producto.id,
                        cantidad:1,
                        precio:this.producto.precio_a,
                        rest_estatus_id:7,
                        estado:'vendible',
                    }

                Pedidos().post(`/${id}/detalles`,{data}).then((response) => {
                    let data2 = {//local
                        id:response.data.data.id,
                        rest_pedidos_id:id,
                        conceptos_id:this.producto.id,
                        cantidad:1,
                        precio:this.producto.precio_a,
                        rest_estatus_id:7,
                        estado:'vendible',
                    }

                    this.setDetallePedidos(data2);//metodo local
                    this.loading=false;
                }).catch(e => {
                    console.log(e);
                    this.loading=false;
                })
            },

            getUsuario(){//metodo get para el usuario logeado
                Usuario().post("/validate", {user_token:this.user.token}).then((response) => {
                    this.usuario=response.data.data.id;
                    this.loading=false;
                }).catch(e => {
                    console.log(e);
                    this.loading=false;
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