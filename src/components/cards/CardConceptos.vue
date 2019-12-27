<template>
    <div>
        <v-hover v-slot:default="{hover}">
            <v-card 
                :title="concepto.nombre" 
                tile 
                height="300" 
                width="200" 
                :elevation="hover ? 15:5"
            >
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
                                @click="agregar"
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
                                @click="agregar"
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

        <ValidacionConcepto :existencia="existencia" />
    </div>
</template>

<script>
//dialog 
import ValidacionConcepto from '@/components/dialogs/ValidacionConcepto';
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
            }
        },
        data() {
            return {
                existencia:{}
            }
        },
        components:{
            ValidacionConcepto
        },
        computed: {
            ...mapState(['validacionConcep','user','producto']),
        },
        methods: {
            ...mapActions(['setProducto','setValidacionConcepto']),

            agregar(){
                if(this.user.loggedIn){
                    this.setProducto(this.concepto);
                    this.setValidacionConcepto(true);
                    this.getConceptos(this.concepto.id);
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

<style lang="css" scope>
    .ribbon {
        width: 0px;
        height: 80px;
        border-left: 50px solid #d9534f;
        border-right: 50px solid #d9534f;
        border-bottom: 35px solid transparent;
    }
</style>