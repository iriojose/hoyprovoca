<template>
    <div>
        <v-tooltip bottom>
            <template v-slot:activator="{ on }">
                <v-hover v-slot:default="{hover}">
                    <v-card v-on="on" tile :height="heightCard" :width="widthCard" :elevation="hover ? 15:5">
                        <v-img 
                            v-if="!concepto.imagen"
                            :height="heightImg" 
                            :width="widthImg" 
                            contain 
                            :src="concepto.imagen"
                            :gradient="hover ? 'to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)':null"
                        >
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
                                Bs. {{concepto.precio_a}}
                            </div>
                            <div v-if="tipo !== 3" class="body display-inline text-truncate font-weight-bold">
                                {{concepto.nombre}}
                            </div>
                            <div v-if="tipo !== 3" class="caption grey--text display-inline text-truncate font-weight-bold">
                                {{concepto.descripcion}}
                            </div>
                        </div>
                    </v-card> 
                </v-hover> 
            </template>
            <span>{{concepto.nombre}}</span>
        </v-tooltip>

        <v-snackbar color="red" v-model="snackbar" right>
            <v-icon dark class="mx-2">
                cancel
            </v-icon>
            Existencia agotada.
        </v-snackbar>
    </div>
</template>

<script>
//state globales
import {mapState,mapActions} from 'vuex';
import router from '@/router';
//services
import Conceptos from '@/services/Conceptos';
import Pedidos from '@/services/Pedidos';
import Usuario from '@/services/Usuario';

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
                snackbar:false,
                id:0,
                data:{
                    rest_mesas_id:1,
                    rest_estatus_id:1,
                    estado:'Activo',
                    cant_personas:1,
                    usuario_id:0,
                    empresa_id:0,
                },
                data1:[
                    {
                        conceptos_id:0,
                        cantidad:1,
                        precio:0,
                        rest_estatus_id:1,
                        estado:'Disponible',
                    }
                ]
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
                    this.revisionDeExistencia(this.existencia);
                }).catch(e => {
                    console.log(e);
                    this.loading=false;
                });
            },

            revisionDeExistencia(existencia){
                if(existencia !== undefined){
                    if(Number.parseInt(existencia.existencia) > 0){
                        if(this.producto.tipos_conceptos_id == 5){
                            this.loading=false;
                            this.setValidacionConcepto(true);
                            return;
                        }else{
                            if(this.pedidos.length == 0){
                                this.getUsuario();
                            }else{
                                this.validacionSiExistePedidos();
                            }
                        }
                    }else{
                        this.snackbar=true;
                    }
                }else{
                    this.loading=false;
                    this.snackbar=true;
                }
            },
            //posts de la Api
            postPedidos(){//crea un pedido y su primer detalle
                let data=this.data;
                data.usuario_id=this.id;
                data.empresa_id=this.producto.empresa_id;

                let data1=this.data1;
                data1[0].conceptos_id =this.producto.id;
                data1[0].precio = this.producto.precio_a;

                Pedidos().post("/",{data,data1}).then((response) => {
                    console.log(response.data.data);
                    let pedido= response.data.data;
                    let detalle = response.data.data.detalles[0];
                    console.log(detalle);
                    this.setPedidos(pedido);//local
                    this.setDetallePedidos(detalle);//local
                    this.loading=false;
                }).catch(e =>{
                    console.log(e);
                    this.loading=false;
                });
            },

            validacionSiExistePedidos(){//si existe un pedido a la empresa que pertenece ese concepto
                
                let valor = this.pedidos.filter(a => {
                    if(a.empresa_id == this.producto.empresa_id){
                        return a;
                    }
                    return null;
                });
                
                console.log(valor);

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
                    this.getUsuario();
                }
            },
            
            postPedidosDetalle(id){//agrega un detalle a un pedido
                let data = this.data1[0];
                data.conceptos_id=this.producto.id;
                data.precio=this.producto.precio_a;
                data.rest_pedidos_id=id;

                Pedidos().post(`/${id}/detalles`,{data}).then((response) => {
                    console.log(response);
                    let data2 = response.data.data;
                    this.setDetallePedidos(data2);//metodo local
                    this.loading=false;
                }).catch(e => {
                    console.log(e);
                    this.loading=false;
                })
            },

            getUsuario(){//metodo get para el usuario logeado
                Usuario().post("/validate", {user_token:this.user.token}).then((response) => {
                    this.id=response.data.data.id;
                    this.loading=false;
                    this.postPedidos();
                }).catch(e => {
                    console.log(e);
                    this.loading=false;
                });
            },
        },
    }
</script>

<style lang="css" scope>
    .modif{
        width: 100%;
        height: 40px;
        background: rgba(0,0,0,0.5);
        color: #fff;
        padding-top: 10px;
    }
</style>