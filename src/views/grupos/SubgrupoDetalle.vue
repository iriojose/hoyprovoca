<template>
    <div>
        <v-container fluid v-if="loading">
            <v-row justify="center" class="fill-height" align="center" style="height:500px;">
                <Loading />
            </v-row>
        </v-container>

        <v-card elevation="0" color="#fff" width="100%" height="100%" v-else>
            <v-card-title class="title font-weight-black">
                <v-row justify="center" align="center">
                    <v-avatar size="80" class="mx-2">
                        <v-img :src="image+subgrupo.imagen"></v-img>
                    </v-avatar>
                    {{subgrupo.nombre}}
                </v-row>
            </v-card-title>

            <v-card-text v-if="conceptos">
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
                        :loading="loading2" @click="paginar(subgrupo.id)"
                        :disabled="conceptos.length !== paginador ? true:false"
                    >Ver más
                    </v-btn>
                </v-row>
            </v-card-text>

            <v-card-text v-else>
                <div class="text-center font-weight-black headline mt-8">No se encontraron resultados.</div>
                <v-row justify="center">
                    <v-img width="500" height="500" contain :src="require('@/assets/cancel.svg')"></v-img>
                </v-row>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
import SubGrupos from '@/services/SubGrupos';
import variables from '@/services/variables_globales';
import {mapState} from 'vuex';

    export default {
        components:{
            CardConceptos: () => import("@/components/cards/CardConceptos"),
            CardConceptos2:() => import("@/components/cards/CardConceptos2"),
            Loading: () => import('@/components/loaders/Loading')
        },
        data() {
            return {
                ...variables,
                loading:true,
                loading2:false,
                tipo:true,
                conceptos:[],
                total:0,
                after:0,
                paginador:20,
                subgrupo:{imagen:"default.png"}
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
                this.subgrupo = JSON.parse(window.localStorage.getItem('subgrupo'));
                this.conceptos = [];
                if(this.subgrupo){
                    this.getSubgrupos(this.subgrupo.id);
                    this.getConceptos(this.subgrupo.id);
                }
            },
        },
        mounted() {
            this.subgrupo = JSON.parse(window.localStorage.getItem('subgrupo'));
            this.getConceptos(this.subgrupo.id);
        },
        methods:{
            paginar(id){
                this.paginador+=20;
                this.getConceptos(id);
            },
            getConceptos(id){
                this.loading2 = true; 
                SubGrupos().get(`/${id}/conceptos/?limit=20&offset=${this.after}`).then((response) => {
                    if(response.data.data.length == 20) {
                        this.validacion(response.data.data);
                        this.after +=20;
                        this.total = response.data.totalCount;
                        if(this.conceptos.length !== this.paginador) this.getConceptos(id);
                    }else if(response.data.data.length !== 20){
                        this.validacion(response.data.data);
                        this.after +=20;
                        this.total = response.data.totalCount;
                        this.loading = false;
                        this.loading2 = false;
                    }else{
                        this.loading = false;
                        this.loading2 = false;
                    }
                }).catch(e => {
                    this.loading = false;
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
            parseExistencia(concepto){
                return (Array.isArray(concepto.existencias) ? concepto.existencias.length > 0 ? concepto.existencias.map(a => Math.trunc(+a.existencia)).reduce((a, b) => a + b) : 0 : concepto.existencias)
            }
        }
    }
</script>