<template>
    <v-card width="350" height="300" elevation="0" @click="modalDetalle">
        <v-card-text>
            <v-row justify="center">
                <v-col cols="12" sm="6"> 
                    <v-img 
                        :src="typeof concepto.imagen === 'undefined'  || concepto.imagen === 'default.png' ? require('@/assets/box.svg') : image + concepto.imagen"
                        contain
                        width="100%"
                        height="150"
                    >
<<<<<<< HEAD
                        <v-row class="mx-2" justify="end" v-if="parseExistencia(concepto) <= 0">
                            <v-img 
                                contain 
                                :width="$vuetify.breakpoint.smAndDown ? 150:200" 
                                :height="$vuetify.breakpoint.smAndDown ? 100:150" 
                                :src="require('@/assets/agotado.png')"
                                class="pb-3"
                            />  
=======
                        <v-row class="mx-2 fill-height" justify="center" align="center" v-if="concepto.existencias[0].existencia <= 0">
                            <v-card width="120" height="30" class="white--text" color="#0f2441">
                                <v-row justify="center" align="center" class="fill-height">
                                    <div class="body-1">Agotado</div>
                                </v-row>
                            </v-card>
>>>>>>> 62535622dad52e2a7d1758e17db004e70797199e
                        </v-row>
                    </v-img>
                </v-col>
                <v-col cols="12" sm="6">
                    <div class="text-truncate body-1 font-weight-black">{{precioDolar}}</div>
                    <div class="text-truncate body-1 font-weight-black">{{precio}}</div>
                    <div class="text-truncate font-weight-medium text-capitalize">{{concepto.nombre}}</div>
                    <div class="text-truncate body-2 grey--text text-capitalize">{{concepto.descripcion}}</div>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script>
import variables from '@/services/variables_globales';
import accounting from 'accounting';
import {mapState,mapActions} from 'vuex';

    export default {
        props:{
            concepto:{
                type:Object,
                default:() => ({})
            }
        },
        data(){
            return {
                ...variables,
                precio:'',
                precioDolar:'',
            }
        },
        mounted(){
            this.precioDolar = accounting.formatMoney(+this.concepto.precio_dolar,{symbol:"$ ",thousand:',',decimal:'.'});
            this.precio = accounting.formatMoney(+this.concepto.precio_a,{symbol:"Bs ",thousand:'.',decimal:','});
        },
        computed:{
            ...mapState(['user'])
        },
        methods:{
            ...mapActions(['setModalSesion','setModalProducto','setProducto']),

            modalDetalle(){
                this.setProducto(this.concepto);
                this.setModalProducto(true);
            },
            parseExistencia(concepto){
                return (Array.isArray(concepto.existencias) ? concepto.existencias.length > 0 ? concepto.existencias.map(a => Math.trunc(+a.existencia)).reduce((a, b) => a + b) : 0 : concepto.existencias)
            }
        }   
    }
</script>
