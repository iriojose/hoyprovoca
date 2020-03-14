<template>
    <div>
        <div v-if="error">
            <AppBar />
            <div :class="$vuetify.breakpoint.smAndDown ? 'text-center margen':'text-center mt-10'">
                <strong class="grey--text">No se encontraron resultados...</strong>
                <v-row justify="center" align="center" class="fill-height">
                    <v-img src="@/assets/nodata.svg" contain width="500" height="500" />
                </v-row>
            </div>
            <Footer />
        </div>

        <div v-else>
            <AppBar />
           
            <v-row justify="center" align="center" class="fill-height" v-if="loading">
                <v-img contain width="500" height="500" :src="require('@/assets/loading.gif')"></v-img>
            </v-row>
            <v-slide-x-transition>
                <v-row justify="center" align="center" class="fill-height" v-show="!loading">
                    <v-col cols="12" md="11" sm="12">
                        <GruposData :subgrupos="subgrupos" :conceptos="conceptos" />
                    </v-col>
                </v-row>
            </v-slide-x-transition>
            
            <Footer />
        </div>
    </div>
</template>

<script>
import AppBar from "@/components/navbar/AppBar";
import Footer from "@/components/footer/Footer";
import GruposData  from '@/components/vistaGrupos/GruposData'
import Grupos from '@/services/Grupos';
import SubGrupos from '@/services/SubGrupos';
import {mapState} from 'vuex';

    export default {
        components:{
            AppBar,Footer,GruposData 
        } ,
        head:{
            title(){
                return {
                    inner:'HoyProvoca',
                    separator:'|',
                    complement: 'Categoría'
                }
            }
        },
        data() {
            return {
                conceptos:[],
                subgrupos:[],
                error:false,
                loading:true,
            }
        },
        mounted() {
            if(this.$route.params.id){
                this.loading = true;
                this.getGruposSubGrupos(this.$route.params.id);
            }else{
                this.loading = false;
                this.error=true;
            }
        },
        computed: {
            ...mapState(['conceptosId'])
        },
        watch: {
            '$route'(val){
               if(val.params.id){
                    this.loading = true;
                    this.getGruposSubGrupos(val.params.id); 
                    this.error=false;
                }else{
                    this.error=true;
                }
            },
            conceptosId(){
                this.addOrder();
            }
        },
        methods: {
            getGruposSubGrupos(id){
                this.conceptos = [];
                Grupos().get(`/${id}/subgrupos`).then((response) => {
                    this.subgrupos = response.data.data;
                    this.subgrupos.filter(a => this.getSubgruposConceptos(a.id));
                }).catch(e => { 
                    console.log(e);
                    this.error = true;
                });
            },
            getSubgruposConceptos(id){
                SubGrupos().get(`/${id}/conceptos`).then((response) => {
                    this.conceptos.push(response.data.data);
                    this.loading = false;
                }).catch(e => {
                    this.error=true;
                    console.log(e);
                });
            }
        },
    }
</script>


<style lang="css" scope>
    .margen{
        margin-top: 80px;
    }
</style>