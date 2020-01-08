<template>
    <div :class="$vuetify.breakpoint.smAndDown ? 'mx-2 pt-10':'mx-10'">
        <!--componente de espera -->
        <SkeletonCategorias v-if="loading"/>
        
        <!-- subgrupos -->
        <div v-for="(subgrupo,i) in subgrupos" :key="subgrupo.id" v-else>
            <div class="headline ml-12 mt-12 font-weight-black">{{subgrupo.nombre}}</div>
            <v-slide-group
                show-arrows
                class="my-5"
            >
            <!--conceptos de subgrupos -->
                <div v-if="!conceptos[i]">
                   No se encontraron resultados...
                </div>
                <v-slide-item
                    v-else
                    v-for="concepto in conceptos[i]"
                    :key="concepto.id"
                    class="mx-2 mb-10 mt-5"
                >
                    <v-hover v-slot:default="{hover}">
                        <v-card :title="concepto.nombre" tile height="300" width="200" :elevation="hover ? 15:5">
                            <v-img 
                                v-if="!concepto.imagen"
                                height="220" 
                                width="200" 
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
                                            :loading="loading2"
                                            color="#005598"
                                            dark
                                            width="50%"
                                            class="text-capitalize body font-weight-bold"
                                            @click="agregarConceptos(concepto)"
                                        >
                                            Agregar
                                        </v-btn>
                                    </v-scale-transition>
                                </v-row>
                            </v-img>
                            <!--cuando no tiene imagen -->
                            <v-img  
                                v-else
                                height="220" 
                                width="200" 
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
                                            :loading="loading2"
                                            color="#005598"
                                            dark
                                            width="50%"
                                            class="text-capitalize body font-weight-bold"
                                            @click="agregarConceptos(concepto)"
                                        >
                                            Agregar
                                        </v-btn>
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
                </v-slide-item>
            </v-slide-group>  
        </div> 
        <ValidacionConcepto :existencia="existencia" />
    </div>
</template>

<script>
//components
import ValidacionConcepto from '@/components/dialogs/ValidacionConcepto';
import SkeletonCategorias from '@/components/layouts/SkeletonCategorias';
//state globales
import {mapState,mapActions} from 'vuex';
//services
import Conceptos from '@/services/Conceptos';
import Pedidos from '@/services/Pedidos';

    export default {
        components:{
            ValidacionConcepto,
            SkeletonCategorias
        },
        props:{//props
            subgrupos:{
                type:Array,
                default: () => ([])
            },
            conceptos:{
                type:Array,
                default: () => ([])
            }
        },
        watch:{
            subgrupos(){//cuando la variable cambie se renderiza
                this.loading=false;
            },
        },
        data() {
            return {
                model:1,
                loading:true,
                existencia:{},
                loading2:false
            }
        },
        computed: {
            ...mapState(['dialog','validacionConcep','user','producto','pedidos']),
        },
        methods: {
            ...mapActions(['setDialog','setProducto','setValidacionConcepto','setPedidos','setDetallePedidos']),

            agregarConceptos(item){//
                this.loading2=true;

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
                        this.loading2=false;
                    }
                }).catch(e => {
                    console.log(e);
                    this.loading2=false;
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
                    console.log(response.data);

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
                            conceptos_id:this.producto.id,
                            cantidad:1,
                            precio:this.producto.precio_a,
                            rest_estatus_id:7,
                            estado:'vendible',
                            rest_pedidos_id:response.data.data.detalles[0].id
                        }
                    ]

                    this.setPedidos(data3);//local
                    this.setDetallePedidos(data2[0],response.data.data.id);//local
                    this.loading2=false;
                }).catch(e =>{
                    console.log(e);
                    this.loading2=false;
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

                    this.loading2=false;
                    this.setDetallePedidos(data2);//metodo local
                }).catch(e => {
                    console.log(e);
                    this.loading2=false;
                })
            },

            getUsuario(){//metodo get para el usuario logeado
                Usuario().post("/validate", {user_token:this.user.token}).then((response) => {
                    this.usuario=response.data.data.id;
                }).catch(e => {
                    console.log(e);
                });
            },

        },
    }
</script>
