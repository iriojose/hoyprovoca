<template>
    <div>
        <v-card elevation="0" color="#fff" width="100%" height="100%">
            <v-card-title class="title font-weight-black" v-if="!loadingSubgrupos">
                <v-row justify="center" align="center">
                    <v-avatar size="80" class="mx-2">
                        <v-img :src="image+grupo.imagen"></v-img>
                    </v-avatar>
                    {{grupo.nombre}}
                </v-row>
            </v-card-title>

            <v-card-text v-if="subgrupos.length!==0 && !loadingSubgrupos">
                <div class="text-center font-weight-black title my-2">Sub categorías</div>
                <v-row justify="center">
                    <v-slide-group multiple :show-arrows="$vuetify.breakpoint.smAndDown ? false:true">
                            <v-slide-item v-for="(subgrupo,i) in subgrupos" :key="i" class="mx-4 cursor" @click="push(subgrupo)">
                                <div @click="push(subgrupo)">
                                    <v-row justify="center">
                                        <v-avatar size="50">
                                            <v-img :src="image+subgrupo.imagen"></v-img>
                                        </v-avatar>
                                    </v-row>
                                    <div class="text-center font-weight-black text-truncate">
                                        {{subgrupo.nombre}}
                                    </div>
                                </div>
                            </v-slide-item>
                    </v-slide-group>
                </v-row>
            </v-card-text>

            <v-card-text v-if="conceptos.length!==0 && !loadingConceptos">
                <!--div class="headline font-weight-black text-center mt-8">Todas las Categorías</div-->
                <v-row justify="center">
                    <v-col cols="12" sm="12" md="9">
                        <v-toolbar color="#fff" elevation="0" width="100%" class="pb-4 px-5">
                            <v-btn tile icon class="mx-2" outlined @click="tipo = true" :disabled="tipo">
                                <v-icon dark>mdi-view-grid</v-icon>
                            </v-btn>
                            <v-btn tile icon class="mx-2" outlined @click="tipo = false" :disabled="!tipo">
                                <v-icon dark>mdi-view-agenda</v-icon>
                            </v-btn>
                            <v-spacer></v-spacer>
                        </v-toolbar>
                    </v-col>
                </v-row>

                <v-row justify="center" v-if="tipo">
                    <CardConceptos :concepto="concepto" v-for="(concepto,i) in conceptos" :key="i"/>
                </v-row>

                <v-row justify="center" v-else>
                    <CardConceptos2 :concepto="concepto" v-for="(concepto,i) in conceptos" :key="i"/>
                </v-row>

                <v-row justify="center" class="my-10">
                    <v-btn 
                        color="#232323" tile dark
                        :loading="loading2" @click="paginar(grupo.id)"
                        :disabled="conceptos.length !== paginador ? true:false"
                    >Ver más
                    </v-btn>
                </v-row>
            </v-card-text>

            <v-container fluid v-if="loadingConceptos || loadingSubgrupos">
                <v-row justify="center" class="fill-height" align="center" style="height:500px;">
                    <Loading />
                </v-row>
            </v-container>

            <v-card-text v-if="!loadingConceptos && conceptos.length==0">
                <div class="text-center font-weight-black headline mt-8">No se encontraron resultados.</div>
                <v-row justify="center">
                    <v-img width="500" height="500" contain :src="require('@/assets/cancel.svg')"></v-img>
                </v-row>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
import Grupos from '@/services/Grupos';
import variables from '@/services/variables_globales';
import {mapState} from 'vuex';
import router from '@/router';

    export default {
        components:{
            CardConceptos: () => import("@/components/cards/CardConceptos"),
            CardConceptos2:() => import("@/components/cards/CardConceptos2"),
            Loading: () => import('@/components/loaders/Loading')
        },
        data() {
            return {
                ...variables,
                loadingConceptos:true,
                loadingSubgrupos:true,
                loading2:false,
                tipo:true,
                subgrupos:[],
                conceptos:[],
                after:0,
                total:0,
                paginador:20,
                grupo:null,

            }
        },
        head:{
            title(){
                return {
                    inner:'Hoyprovoca',
                    separator:'|',
                    complement: 'Categorías'
                }
            }
        },
        computed:{
            ...mapState(['agregados'])
        },
        watch: {
            agregados(){
                this.revision();
            },
            '$route'(val){
                this.grupo = JSON.parse(window.localStorage.getItem('grupo'));
                this.loadingConceptos = true;
                this.conceptos = [];
                this.subgrupos = [];
                if(this.grupo){
                    this.getSubgrupos(this.grupo.id);
                    this.getConceptos(this.grupo.id);
                }
            },
        },
        mounted() {
            this.grupo = JSON.parse(window.localStorage.getItem('grupo'));
            this.getConceptos(this.grupo.id);
            this.getSubgrupos(this.grupo.id);
        },
        methods:{
            getSubgrupos(id){
                this.loadingSubgrupos = true;
                Grupos().get(`/${id}/subgrupos`).then((response) => {
                    if(response.data.data){
                        this.subgrupos = response.data.data.sort(function (a, b) {
                            if (a.nombre > b.nombre) {return 1;}
                            if (a.nombre < b.nombre) {return -1;}
                            return 0;
                        });
                        this.subgrupos = response.data.data;
                        this.loadingSubgrupos = false;
                    }else this.loadingSubgrupos = false;
                }).catch(e => {
                    this.loadingSubgrupos = false;
                });
            },
            paginar(id){
                this.paginador+=20;
                this.getConceptos(id);
            },
            getConceptos(id){
                this.loading2 = true;
                Grupos().get(`/${id}/conceptos/?limit=20&offset=${this.after}`).then((response)=> {
                    if(response.data.data.length == 20) {
                        this.validacion(response.data.data);
                        this.after +=20;
                        this.total = response.data.totalCount;
                        if(this.conceptos.length !== this.paginador) this.getConceptos(id);
                    }else if(response.data.data.length !== 20){
                        this.validacion(response.data.data);
                        this.after +=20;
                        this.total = response.data.totalCount;
                        this.loadingConceptos = false;
                        this.loading2 = false;
                    }else{
                        this.loadingConceptos = false;
                        this.loading2 = false;
                    }
                }).catch(e => {
                    this.loadingConceptos = false;
                    this.loading2 = false;
                });
            },
            validacion(conceptos){
                conceptos.filter(a => a.agregado=false);
                conceptos.filter(a => this.agregados.filter(b => a.id == b ? a.agregado=true:null));
                conceptos = [...conceptos].filter((a) => this.parseExistencia(a) > 0);
                conceptos.filter(a => this.conceptos.push(a));
            },
            revision(){
                this.conceptos.filter(a => a.agregado=false);
                this.conceptos.filter(a => this.agregados.filter(b => a.id == b ? a.agregado=true:null));
            },
            push(item){
                window.localStorage.setItem('subgrupo',JSON.stringify(item));
                let nombre = item.nombre.toLowerCase(); 
                router.push({name:'subgrupoDetalle', params:{text:nombre}});
            },
            parseExistencia(concepto){
                return (Array.isArray(concepto.existencias) ? concepto.existencias.length > 0 ? concepto.existencias.map(a => Math.trunc(+a.existencia)).reduce((a, b) => a + b) : 0 : concepto.existencias)
            }
        }
    }
</script>

<style lang="scss" scope>
    .cursor{
        cursor:pointer;
    }
</style>