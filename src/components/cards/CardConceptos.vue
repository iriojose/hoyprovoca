<template>
    <v-card
        :width="$vuetify.breakpoint.smAndDown ? 150:200" 
        :height="$vuetify.breakpoint.smAndDown ? 150:230"
        :class="$vuetify.breakpoint.smAndDown ? 'hover scale mx-2 mb-10':'hover scale mx-2 my-4'" 
        elevation="0" @click="modalDetalle" active-class="active"
    >
        <v-img 
            contain :width="$vuetify.breakpoint.smAndDown ? 150:200" 
            :height="$vuetify.breakpoint.smAndDown ? 100:150" 
            :src="typeof concepto.imagen === 'undefined'  || concepto.imagen === 'default.png' ? require('@/assets/box.svg') : image + concepto.imagen"
        >
            <v-row class="mx-2" justify="end" v-if="parseExistencia(concepto) <= 0">
                <v-img 
                    contain 
                    :width="$vuetify.breakpoint.smAndDown ? 50:135" 
                    :height="$vuetify.breakpoint.smAndDown ? 50:100" 
                    :src="require('@/assets/agotado.png')"
                    class="pb-3"
                    style="position: absolute;top: 50%;left: 50%;transform: translate(-50%,-52%);"
                />   
            </v-row>
            <v-row justify="center" align="end" class="fill-height px-5">
                <AgregarButton :concepto="concepto" />
            </v-row>
        </v-img>
        <div class="text-center font-weight-black text-capitalize body-1">{{precioDolar}}</div>
        <div class="text-center font-weight-bold text-capitalize caption">{{concepto.nombre}}</div>
        <div v-if="parseExistencia(concepto) > 0" class="text-center font-weight-bold text-capitalize green--text">Disponible: {{+concepto.existencias[0].existencia}}</div>
    </v-card>
</template>

<script>
import variables from '@/services/variables_globales';
import {mapActions} from 'vuex';
import accounting from 'accounting';

    export default {
        components:{
            AgregarButton:() => import('@/components/buttons/AgregarButton')
        },
        props:{
            concepto:{
                type:Object,
                default:() => ({})
            }
        },
        data(){
            return {
                ...variables,
            }
        }, 
        computed:{
            precioDolar(){
                return accounting.formatMoney(+this.concepto.precio_dolar,{symbol:"$ ",thousand:',',decimal:'.'});
            }
        },
        methods:{
            ...mapActions(['setModalProducto','setProducto']),

            modalDetalle(){//abre un modal con los detalles del producto
                this.setProducto(this.concepto);
                this.setModalProducto(true);
            },
            parseExistencia(concepto){
                return (Array.isArray(concepto.existencias) ? concepto.existencias.length > 0 ? concepto.existencias.map(a => Math.trunc(+a.existencia)).reduce((a, b) => a + b) : 0 : concepto.existencias)
            }
        }       
    }
</script>

<style lang="scss">
    .active,.hover:hover{
        background: #ECEFF1 !important;
    }
    .scale{
        transition:all 0.3s;
    }
    .scale:hover{
        transition:all 0.3s;
        transform:scale(1.1);
    }
</style>