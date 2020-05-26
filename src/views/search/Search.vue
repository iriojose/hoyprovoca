<template>
    <v-card elevation="0" color="#f7f7f7" width="100%">
        <v-card-text>
            <v-card v-if="loading" elevation="0" color="#f7f7f7" width="100%" height="500">
                <LoaderRect />
            </v-card>

            <v-card 
                width="100%" elevation="0" color="#f7f7f7" 
                v-if="!loading && arrayConceptos.length == 0" 
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
                v-if="!loading && arrayConceptos.length > 0" justify="center" 
                :class="$vuetify.breakpoint.smAndDown ? 'margen-movil':'margen-top'"
            >
                <v-col cols="12" sm="12" md="12">
                    <PanelEmpresas :empresas="empresas" />
                </v-col>
                <v-col cols="12" md="12" sm="12">
                    <div :class="$vuetify.breakpoint.smAndDown ? 'mb-5':'mb-5'" v-for="(conceptos,i) in arrayConceptos" :key="i">
                        <DataSearch :conceptos="conceptos" :empresa="empresas[i]" />
                    </div>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script>
import LoaderRect from '@/components/loaders/LoaderRect';
import PanelEmpresas from '@/components/vistaSearch/PanelEmpresas';
import DataSearch from '@/components/vistaSearch/DataSearch';
import {mapState,mapActions} from 'vuex';
import variables from '@/services/variables_globales';
import Conceptos from '@/services/Conceptos';
import Empresa from '@/services/Empresa';

    export default {
        components:{
            LoaderRect,
            PanelEmpresas,
            DataSearch
        },
        data() {
            return {
                ...variables,
                conceptos:[],
                arrayConceptos:[],
                empresas:[],
                ids:[],
                loading:true,
                tipo:true,
            }
        },
        head:{
            title(){
                return {
                    inner:'Hoyprovoca',
                    separator:'|',
                    complement: 'Buscar'
                }
            }
        },
        computed: {
            ...mapState(['agregados','search','bandera'])
        },
        watch: {
            agregados(){
                this.revision();
            },
            bandera(){
                this.loading = true;
                this.conceptos = [];
                this.empresas = [];
                this.arrayConceptos = [];
                this.ids = [];
                this.getConceptos();
            },
        },
        mounted() {
            this.getConceptos();
        },
        methods:{
            getConceptos(){
                Conceptos().get(`/?nombre=${this.search}&after=1`).then((response) => {
                    if(response.data.data){
                        let array = [];
                        response.data.data.filter(a => a.agregado = false);
                        response.data.data.filter(a => this.agregados.filter(b => a.id == b ? a.agregado=true:null));
                        response.data.data.filter(a => array.push(a.adm_empresa_id));
                        this.ids = [...new Set(array)];
                        this.conceptos = response.data.data;
                        this.ids.filter((a,i) => this.getEmpresas(a,i));
                    }else{
                        this.loading = false;
                    }
                }).catch(e => {
                    console.log(e);
                });
            },
            getEmpresas(id,i){
                Empresa().get(`/${id}`).then((response) => {
                    this.empresas.push(response.data.data);
                    let array = [];
                    this.conceptos.filter(a => a.adm_empresa_id == response.data.data.id ? array.push(a):null);
                    this.arrayConceptos.push(array);

                    if(this.ids.length - 1 == i){
                        this.loading = false;
                    }
                }).catch(e => {
                    console.log(e);
                });
            },
            revision(){
                this.arrayConceptos.filter(a => a.filter(b => b.agregado=false));
                this.arrayConceptos.filter(a => a.filter(b => this.agregados.filter(c => b.id == c ? b.agregado=true:null)));
            },
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
    $thetransition: all .5s cubic-bezier(1,.25,0,.75) 0s;
    .underline{
        text-decoration: none;
        position: relative;
        &:before {
            content: "";
            position: absolute;
            width: 100%;
            height: 1px;
            bottom: 0;
            left: 0;
            background-color: #302d2d;
            visibility: hidden;
            -webkit-transform: scaleX(0);
            transform: scaleX(0);
            -webkit-transition: $thetransition;
            transition: $thetransition;
        }
        &:hover:before {
            visibility: visible;
            -webkit-transform: scaleX(1);
            transform: scaleX(1);
        }
    }
</style>