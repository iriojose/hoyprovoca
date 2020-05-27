<template>
    <v-card elevation="0" color="#f7f7f7" width="100%">
        <v-card-text>
            <v-card v-if="loading" elevation="0" color="#f7f7f7" width="100%" height="500">
                <LoaderRect />
            </v-card>

            <v-card 
                width="100%" elevation="0" color="#f7f7f7" 
                v-if="!loading && conceptos.length == 0" 
                :class="$vuetify.breakpoint.smAndDown ? 'margen-movil':'margen-top'"
            >
                <v-card-text>
                    <v-row justify="center">
                        <v-img src="@/assets/nodata.svg" contain width="500" height="500" />
                    </v-row>
                    <div class="text-center font-weight-bold headline">
                        No se encontraron resultados
                    </div>
                </v-card-text>
            </v-card>

            <v-row 
                v-if="!loading && conceptos.length > 0" justify="center" 
                :class="$vuetify.breakpoint.smAndDown ? 'margen-movil':'margen-top'"
            >
                <v-col cols="12" sm="12" md="10" class="mb-5">

                    <v-toolbar color="#f7f7f7" elevation="0" width="100%" class="mb-4 mx-5" v-if="$vuetify.breakpoint.smAndDown && !loading">
                        <v-btn tile icon class="mx-2" outlined @click="tipo = true" :disabled="tipo">
                            <v-icon dark>mdi-view-grid</v-icon>
                        </v-btn>
                        <v-btn tile icon class="mx-2" outlined @click="tipo = false" :disabled="!tipo">
                            <v-icon dark>mdi-view-agenda</v-icon>
                        </v-btn>
                        <v-spacer></v-spacer>
                    </v-toolbar>

                    <v-row justify="center" v-if="tipo">
                        <div v-for="(concepto,i) in conceptos" :key="i">
                            <CardConceptos style="margin:10px; padding: 0 10px;" :concepto="concepto" />
                        </div>
                    </v-row>

                    <v-row justify="center" v-else>
                        <div v-for="(concepto,i) in conceptos" :key="i">
                            <CardConceptos2 style="margin:10px;" :concepto="concepto" />
                        </div>
                    </v-row>

                    <v-row justify="center" class="my-5">
                        <v-btn 
                            color="#232323" tile 
                            dark
                            :loading="loading2"
                            @click="getConceptos()"
                            :disabled="total == conceptos.length ? true:false"
                        >
                            Ver más
                            <v-icon dark class="mx-2">mdi-chevrom-right</v-icon>
                        </v-btn>
                    </v-row>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script>
import LoaderRect from '@/components/loaders/LoaderRect';
import SubGrupos from '@/services/SubGrupos';
import CardConceptos from '@/components/cards/CardConceptos2';
import CardConceptos2 from '@/components/cards/CardConceptos3';
import variables from '@/services/variables_globales';
import {mapState} from 'vuex';

    export default {
        components:{
            LoaderRect,
            CardConceptos,
            CardConceptos2
        },
        data(){
            return {
                ...variables,
                loading:true,
                loading2:false,
                conceptos:[],
                after:0,
                total:0,
                tipo:true,
            }
        },
        mounted(){
            this.getConceptos();
        },
        computed: {
            ...mapState(['agregados']),
        },
        watch: {
            agregados(){
                this.revision();
            },
        },
        head:{
            title(){
                return {
                    inner:'Hoyprovoca',
                    separator:'|',
                    complement: 'Sub Categoría'
                }
            }
        },  
        methods:{
            async getConceptos(){
                this.loading2 = true;
                let id = window.localStorage.getItem('subgrupo');
                await SubGrupos().get(`/${id}/conceptos/?limit=20&offset=${this.after}`).then((response) => {
                    response.data.data.filter(a => a.agregado=false);
                    response.data.data.filter(a => this.agregados.filter(b => a.id == b ? a.agregado=true:null));
                    response.data.data.filter(a => this.conceptos.push(a));
                    this.after +=20;
                    this.total = response.data.totalCount;
                    this.loading = false;
                    this.loading2 = false;
                }).catch(e => {
                    console.log(e);
                });
            },
            revision(){
                this.conceptos.filter(a => a.agregado = false);
                this.conceptos.filter(a => this.agregados.filter(b => a.id == b ? a.agregado=true:null));
            }
        }
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
        margin-top:100px;
    }
</style>