<template>
    <v-card class="mt-12" v-if="loading" width="100%" elevation="0" height="500" color="#f7f7f7" >
        <LoaderRect />
    </v-card>
    <transition name="slide-fade" v-else>
        <v-card width="100%" elevation="0" color="#f7f7f7" v-show="!loading">
            <v-row class="ml-5">
                <CardConceptos :concepto="concepto" v-for="(concepto,i) in conceptos" :key="i"/>
            </v-row>
            <v-row justify="center" align="center" v-if="conceptos.length==20" class="mt-5">
                <v-hover v-slot:default="{hover}">
                    <v-btn 
                        color="#005598" 
                        :elevation="hover ? 3:0"
                        class="text-capitalize font-weigth-bold body-1"
                        dark
                        @click="getConceptos(grupo.id)"
                    >
                        Ver más
                    </v-btn>
                </v-hover>
            </v-row>
        </v-card>
    </transition>
</template>

<script>
import CardConceptos from '@/components/cards/CardConceptos2';
import {mapState} from 'vuex';
import Grupos from '@/services/Grupos';
import Empresa from '@/services/Empresa';
import LoaderRect from '@/components/loaders/LoaderRect';

    export default {
        components:{
            CardConceptos,
            LoaderRect
        },
        data() {
            return {
                grupo:{},
                conceptos:[],
                loading:true,
                error:false,
                bandera:false,
                after:0
            }
        },
        mounted() {
            if(this.$route.params.text2){
                this.after=0;
                this.getGrupo(this.$route.params.text2);
            }else{
                this.loading = false;
                this.error=true;
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
            '$route'(val){
               if(val.params.text2){
                    this.loading = true;
                    this.after=0;
                    this.getGrupo(val.params.text2); 
                    this.error=false;
                }else{
                    this.error=true;
                }
            },
        },
        methods: {
            getGrupo(text){
                Grupos().get(`/?nombre=${text}`).then((response) => {
                    this.grupo = response.data.data[0];
                    this.getConceptos(this.grupo.id);
                }).catch(e => {
                    console.log(e);
                });
            },
            getConceptos(id){
                this.loading = true;
                Grupos().get(`/${id}/conceptos/?limit=20&offset=${this.after}`).then((response) => {
                    this.conceptos = response.data.data;
                    this.revision();
                    this.loading = false;
                    this.after+=20;
                }).catch(e => {
                    console.log(e);
                });
            },
            revision(){
                this.conceptos.filter(a => a.agregado = false);
                this.conceptos.filter(a => this.agregados.filter(b => a.id == b ? a.agregado=true:null));
            }
        },
    }
</script>

<style lang="css" scope>
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