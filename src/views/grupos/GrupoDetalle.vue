<template>
    <div>
        <v-card v-if="loading" elevation="0" color="#f7f7f7" width="100%" height="500">
            <LoaderRect />
        </v-card>

        <div class="text-center font-weight-bold headline" v-if="error || subgrupos.length == 0" :class="$vuetify.breakpoint.smAndDown ? 'margen-movil':'margen-top'">
            No se encontraron resultados
        </div>
        <v-row justify="center" v-if="error || subgrupos.length == 0">
            <v-img src="@/assets/nodata.svg" contain width="500" height="500" />
        </v-row>

        <v-card width="100%" elevation="0" color="#f7f7f7" :class="$vuetify.breakpoint.smAndDown ? 'margen-movil':'margen-top'">
            <v-slide-x-transition>
                <v-row justify="center" :class="$vuetify.breakpoint.smAndDown ? null:'mx-10'" v-show="!loading">
                    <v-col cols="12" md="12" sm="12">
                        <GruposData :subgrupos="subgrupos" :conceptos="conceptos" />
                    </v-col>
                </v-row>
            </v-slide-x-transition>
        </v-card>

        <Footer />
    </div>
</template>

<script>
import Footer from "@/components/footer/Footer";
import GruposData from '@/components/vistaGrupos/GruposData';
import LoaderRect from '@/components/loaders/LoaderRect';
import {mapState} from 'vuex';
import Grupos from '@/services/Grupos';
import SubGrupos from '@/services/SubGrupos';

    export default {
        components:{
            Footer,
            GruposData,
            LoaderRect
        },
        data(){
            return {
                subgrupos:[],
                conceptos:[],
                loading:true,
                error:false,
                //bandera:false,
            }
        },
        computed: {
            ...mapState(['agregados'])
        },
        watch: {
            agregados(){
                //this.bandera ?  this.revision():this.bandera=true;
                this.revision();
            },
            '$route'(){
                let id = window.localStorage.getItem('grupo');
               
               if(id){
                    this.loading = true;
                    this.error=false;
                    this.getGruposSubGrupos(id); 
                }else{
                    this.error=true;
                    this.loading = false;
                }
            },
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
        mounted(){
            let id = window.localStorage.getItem('grupo');
            if(id){
                this.getGruposSubGrupos(id);
            }else{
                this.loading = false;
                this.error=true;
            }
        },
        methods:{
            getGruposSubGrupos(id){
                this.subgrupos = [];
                this.conceptos = [];
                Grupos().get(`/${id}/subgrupos`).then((response) => {
                    if(response.data.data !== undefined){
                        this.subgrupos = response.data.data.sort(function (a, b) {
                            if (a.nombre > b.nombre) {return 1;}
                            if (a.nombre < b.nombre) {return -1;}
                            return 0;
                        });
                        console.log(this.subgrupos);
                        this.subgrupos.filter((a,i)=> this.getSubgruposConceptos(a.id,this.subgrupos.length,i));
                    }else{
                        this.error = true;
                        this.loading = false;
                    }
                }).catch(e => {
                    console.log(e);
                    this.loading = false;
                    this.error = true;
                });
            },
            getSubgruposConceptos(id,leng,i){
                SubGrupos().get(`/${id}/conceptos/?limit=10`).then((response) => {
                    if(response.data.data !== undefined){
                        response.data.data.filter(a => a.agregado=false);
                        response.data.data.filter(a => this.agregados.filter(b => a.id == b ? a.agregado=true:null));
                        this.subgrupos.filter(a => a.id == response.data.data[0].adm_subgrupos_id ? a.conceptos=response.data.data:null);
                    }
                    if(leng-1 == i){
                        for (let i = 0; i < this.subgrupos.length; i++) {
                            if(this.subgrupos[i].conceptos == undefined){
                                this.subgrupos.splice(i,1);
                            }
                        }
                        this.subgrupos.filter(a => this.conceptos.push(a.conceptos));
                        this.loading = false;
                    }
                }).catch(e => {
                    this.error=true;
                    this.loading = false;
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
</style>