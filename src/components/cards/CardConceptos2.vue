<template>
    <div>
        <v-tooltip bottom>
            <template v-slot:activator="{ on }">
                <v-hover v-slot:default="{hover}">
                    <v-card v-on="on" tile :height="heightCard" :width="widthCard" :elevation="hover ? 15:0">
                        <v-img
                            :height="heightImg" 
                            :width="widthImg" 
                            contain 
                            :src="ruta+concepto.imagen"
                            :gradient="hover ? 'to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)':null"
                        >
                            <v-row v-if="hover" align="center" justify="center" class="fill-height">
                                <v-scale-transition>
                                    <v-btn  
                                        :loading="loading"
                                        color="#005598"
                                        dark
                                        width="50%"
                                        class="text-capitalize body font-weight-bold"
                                        @click="add(concepto)"
                                        v-if="!concepto.agregado"
                                    >
                                        Agregar
                                    </v-btn>
                                    <div v-else class="red--text title">
                                        Agregado
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

        <v-snackbar color="red" v-model="snackbar" right bottom>
            <div>
                <v-icon dark class="mx-2">
                    cancel
                </v-icon>
                Existencia agotada.
            </div>
        </v-snackbar>
    </div>
</template>

<script>
import {mapState,mapActions} from 'vuex';
import router from '@/router';
import Conceptos from '@/services/Conceptos';
import Pedidos from '@/services/Pedidos';
import Auth from '@/services/Auth';
import url from '@/services/ruta';

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
                ruta:null,
                exito:null,
                error:null,
                loading:false,
                snackbar:false,
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
        created(){
            this.ruta=url;
        },
        computed: {
            ...mapState(['validacionConcep','user','producto','pedidos']),
        },
        methods:{
            ...mapActions(['setProducto','setValidacionConcepto','setPedidos','setDetallePedidos']),

            add(concepto){
                this.loading = true;
                if(this.user.loggedIn){
                    this.setProducto(concepto);
                    this.getConceptoExistencia(concepto);
                }else{
                    this.loading=false;
                    router.push('/login');
                }
            },
            validaExistencia(existencia){
                if(Number.parseInt(existencia.existencia) > 0){
                    /*if(this.producto.tipos_conceptos_id == 5){
                        this.loading=false;
                        this.setValidacionConcepto(true);
                        return;
                    }else{*/
                        this.pedidos.filter(a=> a.empresa_id == this.producto.empresa_id ? this.postPedidosDetalle(a.id):this.getUsuario());
                    //}
                }else{
                    this.loading=false;
                    this.snackbar=true;
                }
            },

            //llamadas a la API
            getUsuario(){//trae la informacion del usaurio
                Auth().post("/sesion",{token:this.user.token}).then((response) => {
                    this.postPedidos(response.data.data);
                }).catch(e => {
                    console.log(e);
                    this.loading=false;
                });
            },
            postPedidos(user){//crea el pedido
                let data=this.data;
                data.usuario_id=user.id;
                data.empresa_id=this.producto.empresa_id;

                let data1=this.data1;
                data1[0].conceptos_id =this.producto.id;
                data1[0].precio = this.producto.precio_a;

                Pedidos().post("/",{data:data,data1:data1}).then((response) => {
                    let pedido=response.data.data;
                    let detalle = pedido.detalles[0];
                    pedido.detalles=[];
                    this.setPedidos(pedido);//local
                    this.setDetallePedidos(detalle);//local
                    this.loading=false;
                }).catch(e => {
                    console.log(e);
                    this.loading=false;
                });
            },
            postPedidosDetalle(id){//agrega un detalle a un pedido
                let data = this.data1[0];
                data.conceptos_id=this.producto.id;
                data.precio=this.producto.precio_a;
                data.rest_pedidos_id=id;

                Pedidos().post(`/${id}/detalles`,{data:data}).then((response) => {
                    let data2 = response.data.data;
                    this.setDetallePedidos(data2);
                    this.loading=false;
                }).catch(e => {
                    console.log(e);
                    this.loading=false;
                });
            },
            getConceptoExistencia(concepto){//trae la existencia del concepto solicitado
                Conceptos().get(`/${concepto.id}/depositos`).then((response) => {
                    if(response.data == 'This entity is empty'){
                        this.loading=false;
                        this.snackbar=true;
                    }else{ 
                        this.validaExistencia(response.data.data[0]);
                    }
                }).catch(e => {
                    console.log(e);
                    this.loading=false;
                });
            }
        }
    }
</script>