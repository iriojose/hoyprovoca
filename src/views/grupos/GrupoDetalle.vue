<template>
    <div>
        <v-card v-if="loading" elevation="0" color="#eee" width="100%" height="500">
            <LoaderRect />
        </v-card>

        <div class="text-center font-weight-bold headline" v-if="error" :class="$vuetify.breakpoint.smAndDown ? 'margen-movil':'margen-top'">
            No se encontraron resultados
        </div>
        <v-row justify="center" v-if="error">
            <v-img src="@/assets/nodata.svg" contain width="500" height="500" />
        </v-row>

        <v-card width="100%" elevation="0" color="#f7f7f7">
            <v-slide-x-transition>
                <v-row justify="center" align="center" :class="$vuetify.breakpoint.smAndDown ? 'mt-12':'mt-12 mx-10'" v-show="!loading && !error">
                    <v-col cols="12" md="12" sm="12">
                        <GruposData :subgrupos="subgrupos" :conceptos="conceptos" />
                    </v-col>
                </v-row>
            </v-slide-x-transition>
        </v-card>
        
        <ModalSesion />
        <Footer />
    </div>
</template>

<script>
import Footer from "@/components/footer/Footer";
import Grupos from '@/services/Grupos';
import SubGrupos from '@/services/SubGrupos';
import {mapState} from 'vuex';
import LoaderRect from '@/components/loaders/LoaderRect';
import GruposData from '@/components/vistaGrupos/GruposData';
import ModalSesion from '@/components/dialogs/ModalSesion';

    export default {
        components:{
            Footer,
            LoaderRect,
            ModalSesion,
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
                //this.bandera ?  this.revision():this.bandera=true;
                this.revision();
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
            async getGruposSubGrupos(id){
                this.subgrupos = [];
                this.conceptos = [];
                await Grupos().get(`/${id}/subgrupos`).then((response) => {
                    if(response.data.data !== undefined){
                        this.subgrupos = response.data.data;
                        this.subgrupos.filter((a,i)=> this.getSubgruposConceptos(a.id,i));
                        this.loading = false;
                    }else{
                        this.error = true;
                        this.loading = false;
                    }
                }).catch(e => { 
                    console.log(e);
                    this.error = true;
                });
            },
            async getSubgruposConceptos(id,i){
                await SubGrupos().get(`/${id}/conceptos/?limit=10`).then((response) => {
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

<style lang="scss" scoped>
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
</style>