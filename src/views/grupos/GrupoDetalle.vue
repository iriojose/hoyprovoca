<template>
    <div>
        <v-card elevation="0" color="#fff" width="100%" height="100%" v-if="loadingConceptos && loadingSubgrupos">
            <v-card-text>
                <v-row justify="center" class="fill-height" align="center">
                    <v-img width="500" height="500" contain :src="require('@/assets/loader.gif')"></v-img>
                </v-row>
            </v-card-text>
        </v-card>

        <v-card elevation="0" color="#fff" width="100%" height="100%" v-else>
            <v-card-text v-if="subgrupos.length!==0">
                <div class="text-center font-weight-black title my-2">Sub categorías</div>
                <v-row justify="center">
                    <v-slide-group multiple :show-arrows="$vuetify.breakpoint.smAndDown ? false:true">
                        <v-slide-item v-for="(subgrupo,i) in subgrupos" :key="i" class="mx-2" @click="push(subgrupo)">
                            <div @click="push(subgrupo)">
                                <v-avatar size="50">
                                    <v-img :src="image+subgrupo.imagen"></v-img>
                                </v-avatar>
                                <div 
                                    style="max-width:60px;"
                                    class="text-center font-weight-black text-truncate">{{subgrupo.nombre}}
                                </div>
                            </div>
                        </v-slide-item>
                </v-slide-group>
                </v-row>
            </v-card-text>

            <v-card-text v-if="conceptos.length!==0">
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

                <v-row justify="center" class="my-5">
                    <v-btn 
                        color="#232323" tile dark
                        :loading="loadingConceptos" @click="getConceptos()"
                        :disabled="total == conceptos.length ? true:false"
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
import Grupos from '@/services/Grupos';
import variables from '@/services/variables_globales';
import {mapState} from 'vuex';
import router from '@/router';

    export default {
        components:{
            CardConceptos: () => import("@/components/cards/CardConceptos"),
            CardConceptos2:() => import("@/components/cards/CardConceptos2")
        },
        data() {
            return {
                ...variables,
                loadingConceptos:true,
                loadingSubgrupos:true,
                tipo:true,
                subgrupos:[],
                conceptos:[],
                after:0,
                total:0,
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
                let grupo = JSON.parse(window.localStorage.getItem('grupo'));
                this.conceptos = [];
                this.subgrupos = [];
                if(grupo){
                    this.getSubgrupos(grupo.id);
                    this.getConceptos(grupo.id);
                }
            },
        },
        mounted() {
            let grupo = JSON.parse(window.localStorage.getItem('grupo'));
            this.getSubgrupos(grupo.id);
            this.getConceptos(grupo.id);
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
                    console.log(e);
                    this.loadingSubgrupos = false;
                });
            },
            getConceptos(id){
                this.loadingConceptos = true;
                Grupos().get(`/${id}/conceptos`).then((response)=> {
                    if(response.data.data){
                        response.data.data.filter(a => a.agregado=false);
                        response.data.data.filter(a => this.agregados.filter(b => a.id == b ? a.agregado=true:null));
                        this.after +=20;
                        this.total = response.data.totalCount;
                        response.data.data.filter(a => this.conceptos.push(a));
                        this.loadingConceptos = false;
                    }else this.loadingConceptos = false;
                }).catch(e => {
                    console.log(e);
                    this.loadingConceptos = false;
                });
            },
            revision(){
                this.conceptos.filter(a => a.agregado=false);
                this.conceptos.filter(a => this.agregados.filter(b => a.id == b ? a.agregado=true:null));
            },
            push(item){
                window.localStorage.setItem('subgrupo',JSON.stringify(item));
                let nombre = item.nombre.toLowerCase(); 
                router.push({name:'subgrupoDetalle', params:{text:nombre}});
            }
        }
    }
</script>
