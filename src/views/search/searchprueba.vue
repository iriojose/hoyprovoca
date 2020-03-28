<template>
    <div>
        <AppBar />
        
        <v-row justify="center"  :class="$vuetify.breakpoint.smAndDown ? 'mt-12 mx-5':'mt-5'">
            <v-col cols="12" md="3" sm="12">
                <v-card width="100%" height="320" elevation="0" class="mt-3 pa-5">
                    <v-btn color="#828282" to="" outlined block rounded elevation="0" active-class="" class="mb-4 text-capitalize overline font-weight-bold">
                        Tiendas / Mercados
                    </v-btn>

                    <v-btn color="#828282" to="" outlined block rounded elevation="0" active-class="" class="mb-4 text-capitalize overline font-weight-bold">
                        Restaurantes
                    </v-btn>

                    <v-divider class="mb-4"></v-divider>

                    <div class="title font-weight-black mb-2">Ordenar Por</div>

                    <v-btn color="#828282" block rounded outlined class="overline font-weight-bold text-capitalize mb-2">
                        Menor precio
                    </v-btn>
                    <v-btn color="#828282" block rounded outlined class="overline font-weight-bold text-capitalize mb-2">
                        Mayor precio
                    </v-btn>
                    <v-btn color="#828282" block rounded outlined class="overline font-weight-bold text-capitalize mb-2">
                        Orden Alfabético
                    </v-btn>
                </v-card>
            </v-col>
            <v-col cols="12" md="8" sm="12">
                <v-row justify="center">
                    <v-col cols="12" md="12" sm="12"> 
                        <v-card width="100%" height="200" elevation="0" class="pa-5">
                            <div class="title font-weight-black">Resultados en:</div>
                            <v-slide-group show-arrows class="my-5">
                                <v-slide-item v-for="(empresa,i) in empresas" :key="i" class="ma-3">
                                    <v-btn fab @click="push(empresa)" elevation="0">
                                        <v-avatar size="60" class="elevation-5">
                                            <v-img :src="ruta+empresa.logo"></v-img>
                                        </v-avatar> 
                                    </v-btn> 
                                </v-slide-item>
                            </v-slide-group>
                        </v-card>
                    </v-col>
                    <v-col cols="12" md="12" sm="12" v-for="(empresa,i) in empresas" :key="i" class="ma-3"> 
                        <v-card width="100%" height="400" elevation="0" class="pa-4">
                            <v-card-title >
                                <v-btn fab @click="push(empresa)" elevation="0">
                                    <v-avatar size="50" class="elevation-5">
                                        <v-img :src="ruta+empresa.logo"></v-img>
                                    </v-avatar> 
                                </v-btn> 
                                <div style="cursor: pointer" @click="push(empresa)" class="mx-2 font-weight-black subtitle-2 underline">{{empresa.nombre_comercial}}</div>
                            </v-card-title>
                            <v-card-text>
                                <v-slide-group show-arrows class="my-2">
                                    <v-slide-item v-for="i in 10" :key="i" class="mx-3">
                                        <v-hover v-slot:default="{hover}">
                                            <v-card width="200" height="250" class="ma-2" elevation="0">
                                                <v-img contain width="200" height="150" :src="ruta+'default.png'"></v-img>
                                                <div class="text-truncate font-weight-medium text-capitalize">Triple hamburgusa con queso y mayonesa</div>
                                                <div class="text-truncate body-2 grey--text text-capitalize">Triple hamburgusa con queso y mayonesa</div>
                                                <div class="text-truncate  font-weight-black text-capitalize">Bs 75.000,00</div>
                                                <v-fade-transition>
                                                    <v-btn block color="#005598" v-show="hover" class="white--text text-capitalize">
                                                        Agregar
                                                    </v-btn>
                                                </v-fade-transition>
                                            </v-card>
                                        </v-hover>
                                    </v-slide-item>
                                </v-slide-group>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
        <Footer />
    </div>
</template>

<script>
import AppBar from '@/components/navbar/AppBar';
import Footer from '@/components/footer/Footer';
import Empresa from '@/services/Empresa';
import url from '@/services/ruta';
import router from '@/router';
import Conceptos from '@/services/Conceptos';

    export default {
        components:{
            AppBar,Footer
        },
        data() {
            return {
                empresas:[],
                conceptos:[],
                ruta:null
            }
        },
        head:{
            title(){
                return {
                    inner:'HoyProvoca',
                    separator:'|',
                    complement: 'Buscador'
                }
            }
        },
        mounted(){
            this.ruta = url;
            this.getConceptos();
            this.getEmpresas();
        },
        methods:{
            getEmpresas(){
                Empresa().get("/").then((response) => {
                    this.empresas = response.data.data;
                }).catch(e => {
                    console.log(e);
                });
            },
            getConceptos(){
                Conceptos().get("/").then((response) => {
                    this.conceptos = response.data.data;
                }).catch(e => {
                    console.log(e);
                });
            },
            push(item){
                var re = / /gi; 
                const nombre = item.nombre_comercial.replace(re,'-');
                router.push({name:'aliadoEspecifico', params:{text:nombre,id:item.id}});
            },
        }
    }
</script>

<style lang="scss" scoped>

    .color{
        color:#232323 !important;
    }

    $thetransition: all .5s cubic-bezier(1,.25,0,.75) 0s;

    .underline{
        text-decoration: none;
        position: relative;

        /*
        webkit-transition: all 0.15s ease-out;
        -moz-transition: all 0.15s ease-out;
        -o-transition: all 0.15s ease-out;
        -ms-transition: all 0.15s ease-out;
        transition: all 0.15s ease-out;
        */

        &:before {s
            content: "";
            position: absolute;
            width: 100%;
            height: 1px;
            bottom: 0;
            left: 0;
            background-color: #232323;
            visibility: hidden;
            -webkit-transform: scaleX(0);
            transform: scaleX(0);
            -webkit-transition: $thetransition;
            transition: $thetransition;
        }
        &:hover:before {
            visibility: visible;
            -webkit-transform: scaleX(1);
            transform: scaleX(1);
        }
    }
</style>