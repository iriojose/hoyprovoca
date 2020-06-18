<template>
    <v-card elevation="0" color="#f7f7f7" width="100%">
        <v-card-text>
            <v-card v-if="loading" elevation="0" color="#f7f7f7" width="100%" height="500">
                <LoaderRect />
            </v-card>
        </v-card-text>

        
        <v-card-text v-if="!loading && conceptos.length == 0" 
            :class="$vuetify.breakpoint.smAndDown ? 'margen-movil':'margen-top'"
        >
            <v-row justify="center">
                <v-img src="@/assets/nodata.svg" contain width="500" height="500" />
            </v-row>
            <div class="text-center font-weight-bold headline">
                No se encontraron resultados
            </div>
        </v-card-text>

        <v-card-text v-if="!loading && conceptos.length > 0" 
            :class="$vuetify.breakpoint.smAndDown ? 'margen-movil':'margen-top'"
        > 
            <v-btn 
                tile color="#0f2441" absolute right
                class="text-capitalize white--text caption"
                width="100" @click="drawer = !drawer"
                v-if="drawer==true || !$vuetify.breakpoint.smAndDown"
            >
                Filtros <v-icon class="mx-2" small>mdi-magnify</v-icon>
            </v-btn>

            <v-row justify="start">
                <v-col cols="12" sm="12" md="10" class="mb-5">

                    <v-toolbar color="#f7f7f7" elevation="0" width="100%" class="mb-4 mx-5" v-if="$vuetify.breakpoint.smAndDown && !loading">
                        <v-btn tile icon class="mx-2" outlined @click="tipo = true" :disabled="tipo">
                            <v-icon dark>mdi-view-grid</v-icon>
                        </v-btn>
                        <v-btn tile icon class="mx-2" outlined @click="tipo = false" :disabled="!tipo">
                            <v-icon dark>mdi-view-agenda</v-icon>
                        </v-btn>
                        <v-spacer></v-spacer>

                        <v-btn tile icon class="mx-2" outlined @click="drawer = !drawer" :disabled="drawer">
                            <v-icon dark>mdi-magnify</v-icon>
                        </v-btn>
                    </v-toolbar>

                    <v-row justify="center" v-if="tipo">
                        <!--isotope v-if="tipo" :list="conceptos" @filter="filterOption=arguments[0]" @sort="sortOption=arguments[0]"-->
                            <div v-for="(concepto,i) in conceptos" :key="i">
                                <CardConceptos style="margin:10px; padding: 0 10px;" :concepto="concepto" />
                            </div>
                        <!--/isotope-->
                    </v-row>

                    <v-row justify="center" v-else>
                        <!--isotope v-else :list="conceptos" @filter="filterOption=arguments[0]" @sort="sortOption=arguments[0]"-->
                            <div v-for="(concepto,i) in conceptos" :key="i">
                                <CardConceptos2 :concepto="concepto" />
                            </div>
                        <!--/isotope-->
                    </v-row>
                </v-col>
            </v-row>
        </v-card-text>

        <v-navigation-drawer 
            app v-model="drawer" temporary hide-overlay width="220" right
            :style="$vuetify.breakpoint.smAndDown ? 'margin-top:106px;':'margin-top:64px'"
        >
            <div class="my-5 text-center title font-weight-black">
                Filtros <v-icon class="mx-2">mdi-magnify</v-icon>
            </div>
            <v-divider></v-divider>

            <v-expansion-panels flat class="px-1" accordion>
                <v-expansion-panel>
                    <v-expansion-panel-header class="subtitle-2 font-weight-medium">Ordenar por:</v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <v-radio-group>
                            <v-radio
                                v-model="selectMayor"
                                color="#0f2441"
                                label="Mayor precio"
                                @change="mayorPrecio()"
                            ></v-radio>
                            <v-radio
                                v-model="selectMenor"
                                color="#0f2441"
                                label="Menor precio"
                                @change="menorPrecio()"
                            ></v-radio>
                            <v-radio
                                v-model="selectAlfa"
                                color="#0f2441"
                                label="Alfabeticamente"
                                @change="alfabeticamente()"
                            ></v-radio>
                        </v-radio-group>
                    </v-expansion-panel-content>

                    <v-expansion-panel-header class="subtitle-2 font-weight-medium">Filtrar por:</v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <v-select 
                            dense filled single-line
                            rounded label="Municipios"
                            hint="Ubicación" persistent-hint
                            color="#2950c3" return-object
                            @change="filtroMunicipios($event)" :items="municipios"
                            item-text="municipio" item-value="municipio"
                            v-model="municipio"
                        >
                        </v-select>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
        </v-navigation-drawer>
     </v-card>
</template>

<script>
import Conceptos from '@/services/Conceptos';
import Direcciones from '@/services/Direcciones';
import LoaderRect from '@/components/loaders/LoaderRect';
import CardConceptos from '@/components/cards/CardConceptos2';
import CardConceptos2 from '@/components/cards/CardConceptos3';
import {mapState} from 'vuex';

    export default {
        components:{
            LoaderRect,
            CardConceptos,
            CardConceptos2,
        },
        data() {
            return {
                selectMayor:0,
                selectMenor:0,
                selectAlfa:0,
                municipio:null,
                conceptos:[],
                municipios:[],
                tipo:true,
                loading:false,
                drawer:true,
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
                this.conceptos = [];
                this.getConceptos();
            },
        },
        mounted() {
            this.getConceptos();
            this.getUbicaciones();
        },
        methods:{
            getConceptos(){
                this.loading = true;
                Conceptos().get(`/?limit=150&nombre=${this.search}&fields=direcciones,existencias`).then((response) => {
                    if(response.data.data){
                        response.data.data.filter(a => a.agregado = false);
                        response.data.data.filter(a => this.agregados.filter(b => a.id == b ? a.agregado=true:null));
                        this.conceptos = response.data.data;
                    }
                    this.loading = false;
                    if(this.selectMayor == 1){
                        this.mayorPrecio();
                    }else if(this.selectMenor == 2){
                        this.menorPrecio();
                    }else if(this.selectAlfa == 3){
                        this.alfabeticamente();
                    }
                    if(this.municipio){
                        this.filtroMunicipios(this.municipio);
                    }
                }).catch(e => {
                    console.log(e);
                });
            },
            getUbicaciones(){
                Direcciones().get("/16").then((response) => {
                    this.municipios = response.data.data.detalles;
                }).catch(e => {
                    console.log(e);
                });
            },
            filtroMunicipios(evt){
                if(this.conceptos[1].direcciones){
                    let aux = this.conceptos;
                    this.conceptos = [];
                    aux.filter(a => a.direcciones.municipio ? a.direcciones.municipio == evt.municipio ? this.conceptos.push(a):null:null);
                }
            },
            revision(){
                this.conceptos.filter(a => a.filter(b => b.agregado=false));
                this.conceptos.filter(a => a.filter(b => this.agregados.filter(c => b.id == c ? b.agregado=true:null)));
            },
            mayorPrecio(){
                this.selectMayor = 1;
                this.conceptos.sort((a, b) => b.precio_a - a.precio_a);
            },
            menorPrecio(){
                this.selectMenor = 2;
                this.conceptos.sort((a, b) => a.precio_a - b.precio_a);
            },
            alfabeticamente(){
                this.selectAlfa = 3;
                this.conceptos.sort((a, b) => a.nombre.localeCompare(b.nombre));
            }
        }

    }
</script>