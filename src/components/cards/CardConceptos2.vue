<template>
    <v-card class="hover scale mx-4 my-2" width="350" elevation="0" @click="modalDetalle" active-class="active">
        <v-card-text>
            <v-row justify="center">
                <v-col cols="12" sm="6"> 
                    <v-img 
                        :src="typeof concepto.imagen === 'undefined'  || concepto.imagen === 'default.png' ? require('@/assets/box.svg') : image + concepto.imagen"
                        contain
                        width="100%"
                        height="150"
                    >
                        <v-row class="mx-2" justify="end" v-if="parseExistencia(concepto) <= 0" style="height:100%">
                            <v-img 
                                contain :width="$vuetify.breakpoint.smAndDown ? 100:135" 
                                :height="$vuetify.breakpoint.smAndDown ? 50:100" 
                                :src="require('@/assets/agotado.png')" class="pb-3"
                                style="position: absolute;top: 50%;left: 50%;transform: translate(-50%,-52%);"
                            />  
                        </v-row>
                    </v-img>
                </v-col>
                <v-col cols="12" sm="6">
                    <div class="text-center subtitle-1 font-weight-black">{{precioDolar}}</div>
                    <div class="text-center font-weight-bold text-capitalize caption">{{concepto.nombre}}</div>
                    <div v-if="parseExistencia(concepto) > 0" class="text-center font-weight-bold text-capitalize green--text">Disponible: {{+concepto.existencias[0].existencia}}</div>

                    <v-row justify="center" align="center" class="mt-5" v-if="!$vuetify.breakpoint.smAndDown">
                        <AgregarButton :concepto="concepto" />
                    </v-row>
                </v-col>
            </v-row>
        </v-card-text>
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
                load:false,
            }
        }, 
        async mounted(){
            await this.preload(this.image + this.concepto.imagen);
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
            },
            check(event){
                let img = new Image();
                img.src = event.target.responseURL;
                return this.load=true;
            },
            preload(data) {
                return new Promise((done) => {
                    try {
                        let load = (url) => {
                            let req = new XMLHttpRequest();
                            req.open("GET", url, true);
                            req.responseType = "blob";
                            req.onload = async (event) => done( this.check(event));
                            req.onerror = (event) => done(this.check(event));
                            req.send();
                        };
                        load(data);
                    } catch (error) {
                        console.log("error :", error);
                    }
                });
            },
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
        transform:scale(1.05);
    }
</style>