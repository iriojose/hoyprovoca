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
                                            color="#005598"
                                            dark
                                            width="50%"
                                            class="text-capitalize body font-weight-bold"
                                            @click="agregar(concepto)"
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
                                            color="#005598"
                                            dark
                                            width="50%"
                                            class="text-capitalize body font-weight-bold"
                                            @click="agregar(concepto)"
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
            }
        },
        data() {
            return {
                model:1,
                loading:true,
                existencia:{}
            }
        },
        computed: {
            ...mapState(['validacionConcep','user','producto']),
        },
        methods: {
            ...mapActions(['setProducto','setValidacionConcepto']),

            agregar(item){
                if(this.user.loggedIn){
                    this.setProducto(item);
                    this.setValidacionConcepto(true);
                    this.getConceptos(item.id);
                }else{
                    router.push('/login');
                }
            },

            getConceptos(id){//trae la existencia del concepto
                Conceptos().get(`/${id}/depositos`).then((response) => {
                    let data = response.data.response.data;
                    let data2={};
                    for(let i=0; i< data.length; i++) {
                        if(data[i].depositos_id == 1){
                            this.existencia=data[i];
                        }
                    }
                    console.log(this.existencia);
                }).catch(e => {
                    console.log(e);
                });
            },

            getPedidos(){
                Pedidos().get().then((response) =>{

                }).catch(e =>{
                    console.log(e);
                });
            }

        },
    }
</script>
