<template>
    <div>
        <v-card elevation="0" color="#fff" width="100%" height="100%" v-if="loading">
            <v-card-text>
                <v-row justify="center" class="fill-height" align="center">
                    <v-img width="500" height="500" contain :src="require('@/assets/loader.gif')"></v-img>
                </v-row>
            </v-card-text>
        </v-card>

        <v-card elevation="0" color="#fff" width="100%" height="100%" v-else>
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

                <v-row justify="center" class="my-5">
                    <v-btn 
                        color="#232323" tile dark
                        :loading="loading" @click="getConceptos(subgrupo.id)"
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
import SubGrupos from '@/services/SubGrupos';
import {mapState} from 'vuex';

    export default {
        components:{
            CardConceptos: () => import("@/components/cards/CardConceptos"),
            CardConceptos2:() => import("@/components/cards/CardConceptos2")
        },
        data() {
            return {
                loading:true,
                tipo:false,
                conceptos:[],
                total:0,
                after:0,
                subgrupo:null
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
            getConceptos(id){
                this.loading = true;
                SubGrupos().get(`/${id}/conceptos/?limit=20&offset=${this.after}`).then((response) => {
                    if(response.data.data){
                        response.data.data.filter(a => a.agregado=false);
                        response.data.data.filter(a => this.agregados.filter(b => a.id == b ? a.agregado=true:null));
                        this.after +=20;
                        this.total = response.data.totalCount;
                        response.data.data.filter(a => this.conceptos.push(a));
                        this.loading = false;
                    }else this.loading = false;
                }).catch(e => {
                    this.loading = false;
                });
            },
            revision(){
                this.conceptos.filter(a => a.agregado=false);
                this.conceptos.filter(a => this.agregados.filter(b => a.id == b ? a.agregado=true:null));
            },
        }
    }
</script>