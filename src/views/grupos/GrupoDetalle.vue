<template>
    <div>
        <!--div v-if="error">
            <AppBar />
            <div :class="$vuetify.breakpoint.smAndDown ? 'text-center margen':'text-center mt-10'">
                <strong class="grey--text">No se encontraron resultados...</strong>
                <v-row justify="center" align="center" class="fill-height">
                    <v-img src="@/assets/nodata.svg" contain width="500" height="500" />
                </v-row>
            </div>
            <Footer />
        </div-->
        <AppBar />

        <v-card v-if="loading" elevation="0" color="#eee" width="100%" height="500">
            <LoaderRect />
        </v-card>
    
        <v-slide-x-transition>
            <v-row justify="center" :class="$vuetify.breakpoint.smAndDown ? 'mt-12 mx-5':'mt-12'" v-show="!loading">
                <v-col cols="12" md="11" sm="12">
                    <GruposData :subgrupos="subgrupos" :conceptos="conceptos" />
                </v-col>
            </v-row>
        </v-slide-x-transition>
            
        <Footer />
    </div>
</template>

<script>
import AppBar from "@/components/navbar/AppBar";
import Footer from "@/components/footer/Footer";
import Grupos from '@/services/Grupos';
import SubGrupos from '@/services/SubGrupos';
import {mapState} from 'vuex';
import LoaderRect from '@/components/loaders/LoaderRect';
import GruposData from '@/components/vistaGrupos/GruposData';

    export default {
        components:{
            AppBar,
            Footer,
            LoaderRect,
            GruposData
        },
        data() {
            return {
                subgrupos:[],
                conceptos:[],
                loading:true,
                error:false,
                bandera:false,
            }
        },
        computed: {
            ...mapState(['agregados'])
        },
        mounted() {
            if(this.$route.params.id){
                this.getGruposSubGrupos(this.$route.params.id);
            }else{
                this.loading = false;
                this.error=true;
            }
        },
        watch: {
            agregados(){
                this.bandera ?  this.revision():this.bandera=true;
            },
            '$route'(val){
               if(val.params.id){
                    this.loading = true;
                    this.getGruposSubGrupos(val.params.id); 
                    this.error=false;
                }else{
                    this.error=true;
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
        methods: {
            getGruposSubGrupos(id){
                this.conceptos = [];
                Grupos().get(`/${id}/subgrupos`).then((response) => {
                    this.subgrupos = response.data.data;
                    this.subgrupos.filter(a => this.getSubgruposConceptos(a.id));
                    this.loading = false;
                }).catch(e => { 
                    console.log(e);
                    this.error = true;
                });
            },
            getSubgruposConceptos(id){
                SubGrupos().get(`/${id}/conceptos/?limit=15`).then((response) => {
                    if(!response.data == ""){
                        response.data.data.filter(a => a.agregado=false);
                        response.data.data.filter(a => this.agregados.filter(b => a.id == b ? a.agregado=true:null));
                        this.conceptos.push(response.data.data);
                    }else{
                        this.conceptos.push([]);
                    }
                }).catch(e => {
                    this.error=true;
                    console.log(e);
                });
            },
            revision(){
                this.conceptos.filter(a => a.filter(b => b.agregado=false));
                this.conceptos.filter(a => a.filter(b => this.agregados.filter(c => b.id == c ? b.agregado=true:null)));
            }
        },
    }
</script>

<style lang="css" scoped>
    .shadow{
        box-shadow: 0px 6px 5px -4px rgba(35,35,35,0.4);
    }
</style>