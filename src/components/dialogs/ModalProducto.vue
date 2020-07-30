<template>
    <v-dialog v-model="productos" close-delay width="500" transition="dialog-bottom-transition">
        <v-card height="500" class="px-2 border">
            <v-card-title>
                <v-spacer></v-spacer>
                <v-hover v-slot:default="{hover}">
                    <v-btn fab text :elevation="hover ? 0:0" @click="close" small>
                        <v-icon :color="hover ? '#D32F2F':'#232323'">mdi-close</v-icon>
                    </v-btn>
                </v-hover>
            </v-card-title>
            <v-card-text>
                <v-img contain height="250" width="100%"
                :src="typeof producto.imagen === 'undefined'  || producto.imagen === 'default.png' ? require('@/assets/box.svg') : image + producto.imagen"
                >
                    <v-row class="mx-2" justify="end" v-if="parseExistencia(producto) <= 0" style="height:100%">
                        <v-img 
                            contain 
                            :width="$vuetify.breakpoint.smAndDown ? 150:200" 
                            :height="$vuetify.breakpoint.smAndDown ? 100:150" 
                            :src="require('@/assets/agotado.png')"
                            class="pb-3"
                            style="position: absolute;top: 50%;left: 50%;transform: translate(-50%,-52%);width:17em;"
                        />   
                    </v-row>
                </v-img>
                <div class="text-truncate text-center title font-weight-black text-capitalize">{{precioDolar}}</div>
                <div class="text-truncate text-center font-weight-bold text-capitalize">{{producto.nombre}}</div>
                <div class="text-truncate body-2 text-center grey--text text-capitalize">{{producto.descripcion}}</div>
            </v-card-text>
            <v-card-actions class="mx-10">
                <AgregarButton :concepto="producto" />
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import {mapState,mapActions} from 'vuex';
import variables from '@/services/variables_globales';
import accounting from 'accounting';

    export default {  
        components:{
            AgregarButton:() => import('@/components/buttons/AgregarButton')
        },  
        computed:{
            ...mapState(['modalProducto','producto']),

            productos:{
                get(){ return this.modalProducto},
                set(val){ this.setModalProducto(val)},
            }
        },
        data(){
            return {
                ...variables,
                precioDolar:null,
            }
        },
        watch:{
            producto(){
                this.precioDolar = accounting.formatMoney(+this.producto.precio_dolar,{symbol:"$ ",thousand:',',decimal:'.'});
            }
        },
        methods: {
            ...mapActions(['setModalProducto']),

            close(){
                this.setModalProducto(false);
            },
            parseExistencia(concepto){
                return (Array.isArray(concepto.existencias) ? concepto.existencias.length > 0 ? concepto.existencias.map(a => Math.trunc(+a.existencia)).reduce((a, b) => a + b) : 0 : concepto.existencias)
            }
        },
    }
</script>

<style lang="scss" scoped>
    .border{
        border-radius:30px;
    }
</style>