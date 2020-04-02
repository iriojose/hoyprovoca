<template>
    <div>
        <!--v-card v-if="loading" elevation="0" color="#eee" width="100%" height="500">
            <LoaderRect />
        </v-card -->

        <v-row justify="center" :class="$vuetify.breakpoint.smAndDown ? 'margen-movil mx-10':'margen-top mx-10'">
            <v-col cols="12" sm="12" md="3">
                <div class="shadow">
                    <v-card width="100%" height="400" elevation="0" class="pa-5">
                        <v-hover v-slot:default="{hover}">
                            <v-btn color="#828282" to="" outlined block rounded 
                                :elevation="hover ? 2:0" class="text-capitalize overline font-weight-bold mb-4"
                            >
                                Tiendas / Mercados
                            </v-btn>
                        </v-hover>

                        <v-hover v-slot:default="{hover}">
                            <v-btn color="#828282" to="" outlined block rounded 
                                :elevation="hover ? 2:0" class="text-capitalize overline font-weight-bold mb-4"
                            >
                                Restaurantes
                            </v-btn>
                        </v-hover>

                        <v-divider class="my-4"></v-divider>

                        <div class="title font-weight-black my-4">Ordenar Por</div>

                        <v-hover v-slot:default="{hover}">
                            <v-btn color="#828282" to="" outlined block rounded 
                                :elevation="hover ? 2:0" class="mb-4 text-capitalize overline font-weight-bold"
                            >
                                Menor Precio
                            </v-btn>
                        </v-hover>

                        <v-hover v-slot:default="{hover}">
                            <v-btn color="#828282" to="" outlined block rounded 
                                :elevation="hover ? 2:0" class="mb-4 text-capitalize overline font-weight-bold"
                            >
                                Mayor Precio
                            </v-btn>
                        </v-hover>

                        <v-hover v-slot:default="{hover}">
                            <v-btn color="#828282" to="" outlined block rounded 
                                :elevation="hover ? 2:0" class="text-capitalize overline font-weight-bold"
                            >
                                Orden Alfabético
                            </v-btn>
                        </v-hover>
                    </v-card>
                </div>
            </v-col>

            <v-col cols="12" md="9" sm="12">
                <div class="shadow">
                    <v-card width="100%" height="150" elevation="0" class="px-5 pt-3">
                        <div class="title font-weight-black">Resultados en:</div>
                        <v-slide-group show-arrows class="my-5">
                            <v-slide-item v-for="(empresa,i) in empresas" :key="i" class="ma-3">
                                <v-btn fab @click="push(empresa)" elevation="0">
                                    <v-avatar size="60" class="elevation-5">
                                            <v-img :src="image+empresa.logo"></v-img>
                                    </v-avatar> 
                                </v-btn> 
                            </v-slide-item>
                        </v-slide-group>
                    </v-card>
                </div>

                <div class="shadow mt-5" v-for="(empresa,i) in empresas" :key="i">
                    <v-card width="100%" height="400" elevation="0" class="px-5 pt-3" v-if="conceptos[i].length > 0">
                        <v-card-title >
                            <v-btn fab @click="push(empresa)" elevation="0">
                                <v-avatar size="50" class="elevation-5">
                                    <v-img :src="image+empresa.logo"></v-img>
                                </v-avatar> 
                            </v-btn> 
                            <div style="cursor: pointer" @click="push(empresa)" class="mx-2 font-weight-black subtitle-2 underline">{{empresa.nombre_comercial}}</div>
                        </v-card-title>
                        <v-card-text>
                            <v-slide-group show-arrows class="my-2">
                                <v-slide-item v-for="(concepto,e) in conceptos[i]" :key="e" class="mx-3">
                                    <CardConceptos :concepto="concepto" />
                                </v-slide-item>
                            </v-slide-group>
                        </v-card-text>
                    </v-card>
                </div>
            </v-col>
        </v-row>

        <Footer class="margen" />
    </div>
</template>

<script>
import Footer from "@/components/footer/Footer";
import LoaderRect from '@/components/loaders/LoaderRect';
import {mapState} from 'vuex';
import Empresa from '@/services/Empresa';
import CardConceptos from '@/components/cards/CardConceptos';
import variables from '@/services/variables_globales';
import router from '@/router';

    export default {
        components:{
            Footer,
            LoaderRect,
            CardConceptos
        },
        data() {
            return {
                loading:true,
                bandera:false,
                empresas:[],
                conceptos:[],
                ...variables
            }
        },
        head:{
            title(){
                return {
                    inner:'HoyProvoca',
                    separator:'|',
                    complement: 'Buscar'
                }
            }
        },
        mounted() {
            this.getEmpresas();
        },
        computed: {
            ...mapState(['agregados'])
        },
        watch: {
            agregados(){
                this.bandera ?  this.revision():this.bandera=true;
            }
        },
        methods:{
            push(item){
                //var re = / /gi; 
                //const nombre = item.nombre_comercial.replace(re,'-');
                router.push({name:'aliadoDetalle', params:{text:item.nombre_comercial}});
            },
            getEmpresas(){
                Empresa().get("/").then((response) => {
                    this.empresas = response.data.data;
                    response.data.data.filter((a,i)=> this.getConceptos(a.id));
                }).catch(e => {
                    console.log(e);
                });
            },
            async getConceptos(id){
                await Empresa().get(`/${id}/conceptos/?limit=10`).then((response) => {
                    if(response.data !== "This entity is empty"){
                        response.data.data.filter(a => a.agregado=false);
                        response.data.data.filter(a => this.agregados.filter(b => a.id == b ? a.agregado=true:null));
                        this.conceptos.push(response.data.data);
                    }else{
                        this.conceptos.push([]);
                    }
                    console.log(this.conceptos);
                }).catch(e => {
                    console.log(e);
                });
            },
            revision(){
                this.conceptos.filter(a => a.filter(b => b.agregado=false));
                this.conceptos.filter(a => a.filter(b => this.agregados.filter(c => b.id == c ? b.agregado=true:null)));
            }
        }
    }
</script>

<style lang="scss" scope>
    .margen{
        margin-top:200px;
    }
    .margen-top{
        margin-top:75px;
    }
    .margen-movil{
        margin-top:120px;
    }
    .shadow{
        box-shadow: 0px 6px 5px -4px rgba(35,35,35,0.4);
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
        &:before {
            content: "";
            position: absolute;
            width: 100%;
            height: 1px;
            bottom: 0;
            left: 0;
            background-color: #005598;
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