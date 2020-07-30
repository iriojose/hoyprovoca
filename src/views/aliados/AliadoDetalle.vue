<template>
    <div>
        <v-card elevation="0" color="#fff" width="100%" height="100%" v-if="loadingConceptos && loadingGrupos">
            <v-card-text>
                <v-row justify="center" class="fill-height" align="center">
                    <v-img width="500" height="500" contain :src="require('@/assets/loader.gif')"></v-img>
                </v-row>
            </v-card-text>
        </v-card>

        <v-card elevation="0" color="#fff" width="100%" height="100%" v-else>

            <v-card-title class="title font-weight-black">
                <v-row justify="center" align="center">
                    <v-avatar size="80" class="mx-2">
                        <v-img :src="image+empresa.imagen"></v-img>
                    </v-avatar>
                    {{empresa.nombre_comercial}}
                </v-row>
            </v-card-title>
            
            <v-card-text v-if="grupos.length!==0">
                <v-row justify="center">
                    <v-slide-group multiple :show-arrows="$vuetify.breakpoint.smAndDown ? false:true">
                        <v-slide-item v-for="(grupo,i) in grupos" :key="i" class="mx-2" @click="push(grupo)">
                            <div @click="push(grupo)">
                                <v-avatar size="50">
                                    <v-img :src="image+grupo.imagen"></v-img>
                                </v-avatar>
                                <div 
                                    style="max-width:60px;"
                                    class="text-center font-weight-black text-truncate">{{grupo.nombre}}
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
                        :loading="loadingConceptos" @click="getConceptos(empresa.id)"
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
import Empresa from '@/services/Empresa';
import Grupos from '@/services/Grupos';
import variables from '@/services/variables_globales';
import router from '@/router';
import {mapState} from 'vuex';

    export default {
        components:{
            CardConceptos: () => import("@/components/cards/CardConceptos"),
            CardConceptos2:() => import("@/components/cards/CardConceptos2")
        },
        data() {
            return {
                ...variables,
                empresa:{imagen:"default.png"},
                grupos:[],
                conceptos:[],
                loadingConceptos:true,
                loadingGrupos:true,
                tipo:true,
                total:0,
                after:0
            }
        },       
        head:{
            title(){
                return {
                    inner:'Hoyprovoca',
                    separator:'|',
                    complement: 'Aliados'
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
                let empresa = JSON.parse(window.localStorage.getItem('empresa'));
                this.conceptos = [];
                this.grupos = [];
                if(empresa){
                    this.getGrupos(empresa.id);
                    this.getConceptos(empresa.id);
                }
            },
        },
        mounted() {
            let empresa = JSON.parse(window.localStorage.getItem("aliado"));

            if(empresa){
                this.empresa = empresa;
                this.getGrupos(empresa.id);
                this.getConceptos(empresa.id);
            }else{
                this.loadingConceptos = false;
                this.loadingGrupos = false;
            }
        },
        methods:{
            getGrupos(id){
                Empresa().get(`/${id}/grupos`).then((response) => {
                    this.grupos = response.data.data.sort(function (a, b) {
                        if (a.nombre > b.nombre) {return 1;}
                        if (a.nombre < b.nombre) {return -1;}
                        return 0;
                    });
                }).catch(e => {
                    this.loadingGrupos = false;
                });
            },
            getConceptos(id){
                Empresa().get(`/${id}/conceptos`).then((response) => {
                    if(response.data.data){
                        response.data.data.filter(a => a.agregado=false);
                        response.data.data.filter(a => this.agregados.filter(b => a.id == b ? a.agregado=true:null));
                        this.after +=20;
                        this.total = response.data.totalCount;
                        response.data.data.filter(a => this.conceptos.push(a));
                        this.loadingConceptos = false;
                    }else this.loadingConceptos = false;
                }).catch(e => {
                    this.loadingConceptos = false;
                });
            },
            revision(){
                this.conceptos.filter(a => a.agregado=false);
                this.conceptos.filter(a => this.agregados.filter(b => a.id == b ? a.agregado=true:null));
            },
            push(item){
                window.localStorage.setItem("grupo",JSON.stringify(item));
                let nombre = item.nombre.toLowerCase(); 
                router.push({name:'grupoDetalle', params:{text:nombre}});
            }
        }
    }
</script>