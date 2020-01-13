<template>
    <div>
        <v-hover v-slot:default="{hover}">
            <v-card :title="concepto.nombre" tile :height="heightCard" :width="widthCard" :elevation="hover ? 15:5">
                <v-img 
                    v-if="!concepto.imagen"
                    :height="heightImg" 
                    :width="widthImg" 
                    contain 
                    :src="concepto.imagen"
                    :gradient="hover ? 'to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)':null"
                >
                    <!-- <div class="ribbon" v-if="concepto.agotado">
                        <v-icon color="#fff">schedule</v-icon>
                    </div>-->
                    <v-row
                        v-if="hover"
                        class="fill-height"
                        align="center"
                        justify="center"
                    >
                        <v-scale-transition>
                            <v-btn  
                                :loading="loading"
                                color="#005598"
                                dark
                                width="50%"
                                class="text-capitalize body font-weight-bold"
                                @click="agregarConceptos(concepto)"
                                v-if="!concepto.agregado"
                            >
                                Agregar
                            </v-btn>
                            <div v-else class="white--text title">
                                agregado
                            </div>
                        </v-scale-transition>
                    </v-row>
                </v-img>
                <!--cuando no tiene imagen -->
                <v-img  
                    v-else
                    :height="heightImg" 
                    :width="widthImg" 
                    contain 
                    src="@/assets/noimage.png"
                    :gradient="hover ? 'to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)':null"
                >
                    <!-- <div class="ribbon" v-if="concepto.agotado">
                        <v-icon color="#fff">schedule</v-icon>
                    </div>-->
                    <v-row
                        v-if="hover"
                        class="fill-height"
                        align="center"
                        justify="center"
                    >
                        <v-scale-transition>
                            <v-btn  
                                :loading="loading"
                                color="#005598"
                                dark
                                width="50%"
                                class="text-capitalize body font-weight-bold"
                                @click="agregarConceptos(concepto)"
                                v-if="!concepto.agregado"
                            >
                                Agregar
                            </v-btn>
                            <div v-else class="white--text title">
                                agregado
                            </div>
                        </v-scale-transition>
                    </v-row>
                </v-img>
                <v-divider></v-divider>
                <div class="text-center mt-2">
                    <div class="body display-inline text-truncate font-weight-black">
                        BsS. {{concepto.precio_a}}
                    </div>
                    <div class="body display-inline text-truncate font-weight-bold">
                        {{concepto.nombre}}
                    </div>
                    <div class="caption grey--text display-inline text-truncate font-weight-bold">
                        {{concepto.descripcion}}
                    </div>
                </div>
            </v-card>  
        </v-hover>

        <v-snackbar color="red" v-model="snackbar" right>
            No hay mas existencia.
        </v-snackbar>
    </div>
</template>

<script>
//state globales
import {mapState,mapActions} from 'vuex';
//services
import Conceptos from '@/services/Conceptos';
import Pedidos from '@/services/Pedidos';

    export default {
        props:{
            concepto:{
                type:Object,
                default: () => {}
            },
            rows:{
                type:Boolean,
                default:false
            },
            widthCard:{
                type:Number,
                default:200
            },
            heightCard:{
                type:Number,
                default:300
            },
            widthImg:{
                type:Number,
                default:200
            },
            heightImg:{
                type:Number,
                default:220
            },
            margen_x:{
                type:String,
                default:""
            },
            margen_y:{
                type:String,
                default:""
            },
            margen_top:{
                type:String,
                default:""
            },
            margen_bottom:{
                type:String,
                default:""
            },
            margen_left:{
                type:String,
                default:""
            },
            margen_right:{
                type:String,
                default:""
            },
            tipo:{//define el tipo de card de conceptos
                type:Number,
                default:1
            }
        },
        data() {
            return {
                loading:false,
                existencia:null,
                snackbar:false
            }
        },
        computed: {
            ...mapState(['validacionConcep','user','producto','pedidos']),
        },
        methods: {
            ...mapActions(['setProducto','setValidacionConcepto','setPedidos','setDetallePedidos']),

            agregarConceptos(item){
                this.loading=true;

                if(this.user.loggedIn){
                    this.setProducto(item);
                    this.getConceptosExistencia(item.id);
                }else{
                    router.push('/login');
                }
            },

            getConceptosExistencia(id){//trae la existencia del concepto del deposito de la web
                Conceptos().get(`/${id}/depositos`).then((response) => {
                    this.existencia = response.data.data[0];   

                    if(Number.parseInt(this.existencia.existencia) > 0){
                        if(this.producto.tipos_conceptos_id == 5){
                            this.setValidacionConcepto(true);
                            this.loading=false;
                            return;
                        }else{
                            if(this.pedidos.length == 0){
                                this.postPedidos();
                            }else{
                                this.validacionSiExistePedidos();
                            }
                        }
                    }else{
                        this.snackbar=true;//OJO
                    }
                }).catch(e => {
                    console.log(e);
                    this.loading=false;
                });
            },

            //posts de la Api
            postPedidos(){//crea un pedido y su primer detalle

                let data = {
                    rest_mesas_id:1,
                    rest_estatus_id:1,
                    estado:'ACTIVO',
                    cant_personas:1,
                    usuario_id:16,
                    empresa_id:this.producto.empresa_id,
                }

                let data1 = [
                    {
                        conceptos_id:this.producto.id,
                        cantidad:1,
                        precio:this.producto.precio_a,
                        rest_estatus_id:1,
                        estado:'Disponible',
                    }
                ]

                Pedidos().post("/",{data,data1}).then((response) => {
                    console.log(response.data.data);

                    let data3 = {
                        id:response.data.data.id,
                        rest_mesas_id:1,
                        rest_estatus_id:1,
                        estado:'ACTIVO',
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
                            rest_estatus_id:1,
                            estado:'Disponible',
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

<style lang="css" scope>
    .ribbon {
        width: 0px;
        height: 80px;
        border-left: 50px solid #d9534f;
        border-right: 50px solid #d9534f;
        border-bottom: 35px solid transparent;
    }
    .modif{
        width: 100%;
        height: 40px;
        background: rgba(0,0,0,0.5);
        color: #fff;
        padding-top: 10px;
    }
</style>