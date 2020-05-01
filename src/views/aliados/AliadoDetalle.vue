<template>
    <v-card width="100%" elevation="0" color="#f7f7f7">
        <v-card-text>
            <v-card v-if="loading" elevation="0" color="#f7f7f7" width="100%" height="500">
                <LoaderRect />
            </v-card>

            <v-card 
                width="100%" elevation="0" color="#f7f7f7" 
                v-if="!loading && grupos.length == 0" 
                :class="$vuetify.breakpoint.smAndDown ? 'margen-movil':'margen-top'"
            >
                <v-card-text>
                    <v-row justify="center">
                        <v-img src="@/assets/nodata.svg" contain width="500" height="500" />
                        <div class="text-center font-weight-bold headline">
                            No se encontraron resultados
                        </div>
                    </v-row>
                </v-card-text>
            </v-card>
            
            <v-row v-if="!loading && grupos.length > 0" justify="center" :class="$vuetify.breakpoint.smAndDown ? 'margen-movil':'margen-top'">
                <v-col cols="12" md="4" sm="12" :class="$vuetify.breakpoint.smAndDown ? 'px-5':'px-10'">
                    <PanelCategorias :grupos="grupos" :empresa="empresa" />
                </v-col>

                <v-col cols="12" md="8" sm="12" v-if="!this.$route.params.text2">
                    <v-toolbar color="#f7f7f7" elevation="0" width="100%" class="mb-4 mx-5" v-if="$vuetify.breakpoint.smAndDown && !loading">
                        <v-btn tile icon class="mx-2" outlined @click="tipo = true" :disabled="tipo">
                            <v-icon dark>mdi-view-grid</v-icon>
                        </v-btn>
                        <v-btn tile icon class="mx-2" outlined @click="tipo = false" :disabled="!tipo">
                            <v-icon dark>mdi-view-agenda</v-icon>
                        </v-btn>
                        <v-spacer></v-spacer>
                    </v-toolbar>

                    <div :class="$vuetify.breakpoint.smAndDown ? 'mb-5':'sombra mb-5'" v-for="(grupo,i) in grupos" :key="i">
                        <DataAliados :grupo="grupo" :conceptos="conceptos[i]" :tipo="tipo"/>
                    </div>
                </v-col>

                <v-col cols="12" md="8" sm="12" v-if="this.$route.params.text2">
                    <v-card v-if="loading2 && empresa" elevation="0" color="#f7f7f7" width="100%" height="500">
                        <LoaderRect />
                    </v-card>

                    <v-toolbar color="#f7f7f7" elevation="0" width="100%" class="mb-4 mx-5" v-if="$vuetify.breakpoint.smAndDown && !loading2">
                        <v-btn tile icon class="mx-2" outlined @click="tipo = true" :disabled="tipo">
                            <v-icon dark>mdi-view-grid</v-icon>
                        </v-btn>
                        <v-btn tile icon class="mx-2" outlined @click="tipo = false" :disabled="!tipo">
                            <v-icon dark>mdi-view-agenda</v-icon>
                        </v-btn>
                        <v-spacer></v-spacer>
                    </v-toolbar>

                    <transition name="slide-fade" v-if="!loading2">
                        <v-card width="100%" elevation="0" color="#f7f7f7" v-show="!loading">
                            <v-row justify="center" v-if="tipo">
                                <CardConceptos :concepto="concepto" v-for="(concepto,i) in conceptos" :key="i"/>
                            </v-row>
                            <v-row justify="center" v-else>
                                <CardConceptos2 :concepto="concepto" v-for="(concepto,i) in conceptos" :key="i"/>
                            </v-row>
                            <v-toolbar elevation="0" class="mx-10" color="#f7f7f7">
                                <!--v-btn 
                                    color="#232323" 
                                    elevation="0"
                                    class="text-capitalize font-weigth-bold body-1"
                                    dark
                                    :disabled="after == 0 ? true:false"
                                    @click="getConceptosGruposMenos(conceptos[0].adm_grupos_id)"
                                >
                                    Ver menos
                                </v-btn-->
                                <v-spacer></v-spacer>
                                <v-btn 
                                    color="#232323" 
                                    elevation="0"
                                    class="text-capitalize font-weigth-bold body-1"
                                    dark
                                    :disabled="conceptos.length == 12 ? false:true"
                                    @click="getConceptosGrupos(conceptos[0].adm_grupos_id)"
                                >
                                    Ver más
                                </v-btn>
                                <v-spacer></v-spacer>
                            </v-toolbar>
                        </v-card>
                    </transition>
                </v-col>
            </v-row>

            <Footer />
        </v-card-text>
    </v-card>
</template>

<script>
import Empresa from '@/services/Empresa';
import Grupos from '@/services/Grupos';
import variables from '@/services/variables_globales';
import LoaderRect from '@/components/loaders/LoaderRect';
import PanelCategorias from '@/components/vistaAliados/PanelCategorias';
import CardConceptos from '@/components/cards/CardConceptos2';
import CardConceptos2 from '@/components/cards/CardConceptos3';
import DataAliados from '@/components/vistaAliados/DataAliados';
import Footer from '@/components/footer/Footer';
import {mapState} from 'vuex';

    export default {
        components:{
            LoaderRect,
            PanelCategorias,
            CardConceptos,
            CardConceptos2,
            Footer,
            DataAliados,
        },
        data(){
            return {
                ...variables,
                empresa:{
                    imagen:'default.png'
                },
                grupos:[],
                conceptos:[],
                tipo:true,
                grupo:{},
                loading:true,
                loading2:false,
                after:0,
            }
        },
        mounted() {
            let id = window.localStorage.getItem('aliado');

            if(id){
                this.after=0;
                this.loading = true;
                this.getEmpresa(id);
            }else{
                this.loading = false;
            }
        },
        computed: {
            ...mapState(['agregados']),
        },
        watch: {
            agregados(){
                this.revision();
            },
            '$route'(val){
                let id = window.localStorage.getItem('aliado');
                this.conceptos = [];

                if(id){
                    this.after=0;
                    this.loading = true;
                    this.getEmpresa(id);
                }else{
                    this.loading = false;
                }
            },
        },
        head:{
            title(){
                return {
                    inner:'HoyProvoca',
                    separator:'|',
                    complement: 'Aliados'
                }
            }
        },
        methods:{
            async getEmpresa(id){
                await Empresa().get(`/${id}`).then((response) => {
                    this.empresa = response.data.data;
                    this.getGrupos(id);
                }).catch(e => {
                    console.log(e);
                    this.loading = false;
                });
            },
            async getGrupos(id){
                await Empresa().get(`/${id}/grupos`).then((response) => {
                    this.grupos = response.data.data.sort(function (a, b) {
                        if (a.nombre > b.nombre) {return 1;}
                        if (a.nombre < b.nombre) {return -1;}
                        return 0;
                    });

                    if(!this.$route.params.text2){
                        this.grupos.filter((a,i) => this.getConceptos(a.id,i));
                    }else{
                        let id = window.localStorage.getItem('detalle');
                        this.getGrupo(id);
                    }
                }).catch(e => {
                    console.log(e);
                    this.loading = false;
                });
            },
            async getConceptos(id,i){
                await Grupos().get(`/${id}/conceptos/?limit=10`).then((response) => {
                    response.data.data.filter(a => a.agregado=false);
                    response.data.data.filter(a => this.agregados.filter(b => a.id == b ? a.agregado=true:null));
                    this.grupos.filter(a => a.id == response.data.data[0].adm_grupos_id ? a.conceptos = response.data.data:null);

                    if(this.grupos.length - 1 == i){
                        this.grupos.filter(a => this.conceptos.push(a.conceptos));
                        this.loading = false;
                    }
                }).catch(e => {
                    console.log(e);
                    this.loading = false;
                });
            },
            async getGrupo(id){
                await Grupos().get(`/${id}`).then((response) => {
                    this.grupo = response.data.data;
                    this.getConceptosGrupos(this.grupo.id);
                }).catch(e => {
                    console.log(e);
                });
            },
            async getConceptosGrupos(id){
                this.loading2 = true;
                await Grupos().get(`/${id}/conceptos/?limit=12&offset=${this.after}`).then((response) => {
                    this.conceptos = response.data.data;
                    this.revision2();
                    this.loading = false;
                    this.loading2 = false;
                    this.after+=12;
                }).catch(e => {
                    console.log(e);
                });
            },
            async getConceptosGruposMenos(id){
                this.after-=12;
                this.loading2 = true;
                await Grupos().get(`/${id}/conceptos/?limit=12&offset=${this.after}`).then((response) => {
                    this.conceptos = response.data.data;
                    this.revision2();
                    this.loading2 = false;
                }).catch(e => {
                    console.log(e);
                });
            },
            revision(){
                this.conceptos.filter(a => a.filter(b => b.agregado=false));
                this.conceptos.filter(a => a.filter(b => this.agregados.filter(c => b.id == c ? b.agregado=true:null)));
            },
            revision2(){
                this.conceptos.filter(a => a.agregado = false);
                this.conceptos.filter(a => this.agregados.filter(b => a.id == b ? a.agregado=true:null));
            }
        }
    }
</script>

<style lang="scss" scoped>
    .sombra{
        -webkit-box-shadow: 0px 5px 6px -5px rgba(0,0,0,0.75);
        -moz-box-shadow: 0px 5px 6px -5px rgba(0,0,0,0.75);
        box-shadow: 0px 5px 6px -5px rgba(0,0,0,0.75);
    }
    .margen-top{
        margin-top:75px;
    }
    .margen-movil{
        margin-top:100px;
    }
    .slide-fade-enter-active {
        transition: all .3s ease;
    }
    .slide-fade-leave-active {
        transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-to
        /* .slide-fade-leave-active for <2.1.8 */ {
        transform: translateX(10px);
        opacity: 0;
    }
</style>