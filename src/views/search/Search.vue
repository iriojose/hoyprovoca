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
            <transition name="fade">
                <v-card-text v-show="conceptos">
                    <!--div class="headline font-weight-black text-center mt-8">Todas las Categorías</div-->
                    <v-row>
                        <v-col cols="12" sm="12" md="9">
                            <v-toolbar color="#fff" elevation="0" width="100%" class="pb-4 px-5">
                                <v-btn tile icon class="mx-2" outlined @click="tipo = true" :disabled="tipo">
                                    <v-icon dark>mdi-view-grid</v-icon>
                                </v-btn>
                                <v-btn tile icon class="mx-2" outlined @click="tipo = false" :disabled="!tipo">
                                    <v-icon dark>mdi-view-agenda</v-icon>
                                </v-btn>
                                <v-btn tile icon class="mx-2" outlined @click="drawer = !drawer">
                                    <v-icon dark>mdi-magnify</v-icon>
                                </v-btn>
                                <v-spacer></v-spacer>
                            </v-toolbar>
                        </v-col>
                    </v-row>
                    
                    <v-row justify="center" v-show="tipo">
                        <CardConceptos :concepto="concepto" v-for="(concepto,i) in conceptos" :key="i"/>
                    </v-row>

                    <v-row justify="center" v-show="!tipo">
                        <CardConceptos2 :concepto="concepto" v-for="(concepto,i) in conceptos" :key="i"/>
                    </v-row>
                </v-card-text>
            </transition> 
            
            <transition name="fade">
                <v-card-text v-show="!loading && conceptos.length==0">
                    <div class="text-center font-weight-black headline mt-8">No se encontraron resultados.</div>
                    <v-row justify="center">
                        <v-img width="500" height="500" contain :src="require('@/assets/cancel.svg')"></v-img>
                    </v-row>
                </v-card-text>
            </transition>
        </v-card>

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
                        <v-radio-group v-model="radioGroup">
                            <v-radio
                                color="#0f2441"
                                label="Mayor precio"
                                @change="mayorPrecio()"
                            ></v-radio>
                            <v-radio
                                color="#0f2441"
                                label="Menor precio"
                                @change="menorPrecio()"
                            ></v-radio>
                            <v-radio
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
                            item-text="municipio" v-model="municipio"
                        >
                        </v-select>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>

            <v-row justify="center">
                <v-btn 
                    color="#0f2441" tile @click="resetFilter()"
                    class="text-capitalize font-weight-bold white--text">
                    Borrar fliltros
                </v-btn>
            </v-row>
        </v-navigation-drawer>
    </div>
</template>

<script>
import Conceptos from '@/services/Conceptos';
import Direcciones from '@/services/Direcciones';
import {mapState,mapActions} from 'vuex';

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
                radioGroup:-1,
                radio:null,
                municipio:null,
                drawer:false,
                aux:[]
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
        computed:{
            ...mapState(['agregados','municipios','search'])
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
            let municipios = JSON.parse(window.localStorage.getItem('municipios'));

            if(municipios) this.setMunicipios(municipios);
            else this.getUbicaciones();
           
           this.getConceptos();
        },
        methods:{
            ...mapActions(['setMunicipios']),

            getConceptos(){
                this.loading = true;
                Conceptos().get(`/?limit=150&nombre=${this.search}&fields=direcciones,existencias`).then((response) => {
                    if(response.data.data){
                        response.data.data.filter(a => a.agregado = false);
                        response.data.data.filter(a => this.agregados.filter(b => a.id == b ? a.agregado=true:null));
                        this.conceptos = response.data.data;
                        this.aux = response.data.data;
                    }
                    this.loading = false;
                    if(this.radioGroup == 2){
                        this.mayorPrecio();
                    }else if(this.radioGroup == 1){
                        this.menorPrecio();
                    }else if(this.radioGroup == 0){
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
                    this.setMunicipios(response.data.data.detalles);
                    window.localStorage.setItem("municipios",JSON.stringify(response.data.data.detalles));
                }).catch(e => {
                    console.log(e);
                });
            },
            filtroMunicipios(evt){
                this.conceptos = [];
                this.aux.filter(a => a.direcciones !== undefined ? a.direcciones.municipio == evt.municipio ? this.conceptos.push(a):null:null);
            },
            mayorPrecio(){
                this.conceptos.sort((a, b) => b.precio_dolar - a.precio_dolar);
            },
            menorPrecio(){
                this.conceptos.sort((a, b) => a.precio_dolar - b.precio_dolar);
            },
            alfabeticamente(){
                this.conceptos.sort((a, b) => a.nombre.localeCompare(b.nombre));
            },
            resetFilter(){
                this.municipio = null;
                this.radioGroup = -1;
                this.conceptos = this.aux;
            },
            revision(){
                this.conceptos.filter(a => a.agregado=false);
                this.conceptos.filter(a => this.agregados.filter(b => a.id == b ? a.agregado=true:null));
            },
        }
    }
</script>
