<template>
    <v-card elevation="0" color="#f7f7f7" width="100%">
        <v-card-text>
            <v-card v-if="loading" elevation="0" color="#f7f7f7" width="100%" height="500">
                <LoaderRect />
            </v-card>

            <v-card 
                width="100%" elevation="0" color="#f7f7f7" 
                v-if="!loading && aux.length == 0" 
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

            <v-row 
                v-if="!loading && aux.length > 0" justify="center" 
                :class="$vuetify.breakpoint.smAndDown ? 'margen-movil':'margen-top'"
            >
                <v-toolbar color="#f7f7f7" elevation="0" width="100%" class="mb-4 mx-5" v-if="$vuetify.breakpoint.smAndDown && !loading">
                    <v-btn tile icon class="mx-2" outlined @click="tipo = true" :disabled="tipo">
                        <v-icon dark>mdi-view-grid</v-icon>
                    </v-btn>
                    <v-btn tile icon class="mx-2" outlined @click="tipo = false" :disabled="!tipo">
                        <v-icon dark>mdi-view-agenda</v-icon>
                    </v-btn>
                    <v-spacer></v-spacer>
                </v-toolbar>
                
                <v-col cols="12" md="12" sm="12">
                    <div :class="$vuetify.breakpoint.smAndDown ? 'mb-5':'sombra mb-5'" v-for="(subgrupo,i) in aux" :key="i">
                        <GruposData :subgrupo="subgrupo" :conceptos="conceptos[i]" :tipo="tipo" />
                    </div>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script>
import LoaderRect from '@/components/loaders/LoaderRect';
import GruposData from '@/components/vistaGrupos/GruposData';
import Grupos from '@/services/Grupos';
import SubGrupos from '@/services/SubGrupos';
import {mapState} from 'vuex';

    export default {
        components:{
            LoaderRect,
            GruposData,
        },
        data(){
            return {
                loading:true,
                tipo:true,
                subgrupos:[],
                conceptos:[],
                aux:[]
            }
        },
        mounted(){
            let id = window.localStorage.getItem('grupo');

            if(id){
                this.getGrupos(id);
            }
        },
        watch: {
            agregados(){
                this.revision();
            },
            '$route'(val){
                let id = window.localStorage.getItem('grupo');
                this.conceptos = [];
                this.subgrupos = [];
                this.aux = [];

                if(id){
                    this.loading = true;
                    this.getGrupos(id);
                }
            },
        },
        computed: {
            ...mapState(['agregados']),
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
        methods:{
            async getGrupos(id){
                await Grupos().get(`/${id}/subgrupos/?limit=10`).then((response) => {
                    if(response.data.data){
                        this.subgrupos = response.data.data.sort(function (a, b) {
                            if (a.nombre > b.nombre) {return 1;}
                            if (a.nombre < b.nombre) {return -1;}
                            return 0;
                        });
                        this.subgrupos.filter((a,i) => this.getConceptos(a.id,i));
                    }else{
                        this.loading = false;
                    }
                }).catch(e => {
                    console.log(e);
                });
            },
            async getConceptos(id,i){
                await SubGrupos().get(`/${id}/conceptos/?limit=10`).then((response) => {
                    if(response.data.data){
                        response.data.data.filter(a => a.agregado=false);
                        response.data.data.filter(a => this.agregados.filter(b => a.id == b ? a.agregado=true:null));
                        this.subgrupos.filter(a => a.id == response.data.data[0].adm_subgrupos_id ? a.conceptos = response.data.data:null);
                    }

                    if(this.subgrupos.length - 1 == i){
                        this.subgrupos.filter(a => a.conceptos ? this.aux.push(a):null);
                        this.aux.filter(a => this.conceptos.push(a.conceptos));
                        this.loading = false;
                    }
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

<style lang="scss" scoped>
    .margen-top{
        margin-top:75px;
    }
    .margen-movil{
        margin-top:100px;
    }
    .sombra{
        -webkit-box-shadow: 0px 5px 6px -5px rgba(0,0,0,0.75);
        -moz-box-shadow: 0px 5px 6px -5px rgba(0,0,0,0.75);
        box-shadow: 0px 5px 6px -5px rgba(0,0,0,0.75);
    }
</style>