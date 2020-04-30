<template>
    <div >
        <v-card v-if="loading" elevation="0" color="#f7f7f7" width="100%" height="500">
            <LoaderRect />
        </v-card>

        <v-row justify="center" v-if="error || conceptos.length == 0" :class="$vuetify.breakpoint.smAndDown ? 'margen-movil':'margen-top'">
            <v-img src="@/assets/nodata.svg" contain width="500" height="500" />
        </v-row>
         <div class="text-center font-weight-bold headline" v-if="error || conceptos.length == 0">
            No se encontraron resultados
        </div>

        <v-card width="100%" elevation="0" color="#f7f7f7" :class="$vuetify.breakpoint.smAndDown ? 'margen-movil':'margen-top'">
            <v-slide-x-transition>
                <v-row justify="center" :class="$vuetify.breakpoint.smAndDown ? null:'mx-10'" v-show="!loading && subgrupos">
                    <v-col cols="12" md="12" sm="12">
                        <GruposData :subgrupos="aux" :conceptos="conceptos" />
                    </v-col>
                </v-row>
            </v-slide-x-transition>
        </v-card>

        <Footer />
    </div>
</template>

<script>
import Grupos from '@/services/Grupos';
import SubGrupos from '@/services/SubGrupos';
import {mapState} from 'vuex';
import LoaderRect from '@/components/loaders/LoaderRect';
import GruposData from '@/components/vistaGrupos/GruposData';
import Footer from "@/components/footer/Footer";

    export default {
        components:{
            LoaderRect,
            GruposData,
            Footer,
        },
        data(){
            return {
                aux:[],
                subgrupos:[],
                conceptos:[],
                loading:false,
                error:false,
            }
        },
        head:{
            title(){
                return {
                    inner:'HoyProvoca',
                    separator:'|',
                    complement: 'Categorías'
                }
            }
        },
        computed: {
            ...mapState(['agregados'])
        },
        mounted(){
            let id = window.localStorage.getItem('grupo');

            if(id){
                this.getSubgrupos(id);
            }else{
                this.error = true;
                this.loading = false;
            }
        },
        watch: {
            agregados(){
                this.revision();
            },
            '$route'(){
                let id = window.localStorage.getItem('grupo');
                this.subgrupos = [];
                this.conceptos = [];
                this.aux = [];

                if(id){
                    this.error=false;
                    this.getSubgrupos(id); 
                }else{
                    this.error = true;
                    this.loading = false;
                }
            },
        },
        methods:{
            async getSubgrupos(id){
                this.loading = true;
                await Grupos().get(`/${id}/subgrupos`).then((response) => {
                    if(response.data.data){
                        this.subgrupos = response.data.data.sort(function (a, b) {
                            if (a.nombre > b.nombre) {return 1;}
                            if (a.nombre < b.nombre) {return -1;}
                            return 0;
                        });
                        this.subgrupos.filter((a,i) => this.getConceptos(a.id,i));
                    }else{ 
                        this.error = true; 
                        this.loading = false
                    }
                }).catch(e => {
                    console.log(e);
                    this.error = true;
                    this.loading = false;
                });
            },
            async getConceptos(id,i){
                await SubGrupos().get(`/${id}/conceptos/?limit=10`).then((response) =>{
                    if(response.data.data){
                        response.data.data.filter(a => a.agregado=false);
                        response.data.data.filter(a => this.agregados.filter(b => a.id == b ? a.agregado=true:null));
                        this.subgrupos.filter(a => a.id == response.data.data[0].adm_subgrupos_id ? a.conceptos = response.data.data:null);
                    }

                    if(this.subgrupos.length - 1 == i){
                        for (let i = 0; i < this.subgrupos.length; i++) {
                            if(this.subgrupos[i].conceptos){
                                this.aux.push(this.subgrupos[i]);
                            }
                        }
                        for (let i = 0; i < this.aux.length; i++) {
                            this.conceptos.push(this.aux[i].conceptos);
                        }
                        console.log(this.aux);
                        this.loading = false;
                    }
                }).catch(e => {
                    console.log(e);
                    this.error = true;
                    this.loading = false;
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
        margin-top:80px;
    }
    .sombra{
        -webkit-box-shadow: 0px 5px 6px -5px rgba(0,0,0,0.75);
        -moz-box-shadow: 0px 5px 6px -5px rgba(0,0,0,0.75);
        box-shadow: 0px 5px 6px -5px rgba(0,0,0,0.75);
    }
</style>