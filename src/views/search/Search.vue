<template>
    <div>
        <AppBar />
        <v-row :class="$vuetify.breakpoint.smAndDown ? 'mt-12':null">
            <v-col cols="12" md="12" lg="3" sm="12">
                <v-row class="mx-3">
                    <v-col cols="12" md="6" lg="12" sm="6">
                        <v-card class="pa-4" elevation="3">
                            <h3 class="my-4">Buscar por:</h3>
                            <v-select 
                                :items="categorias"
                                label="Categorias"
                                chips 
                                color="#005598"
                                hide-details
                                outlined
                                dense
                                hide-selected
                                @change="categoriasChange($event)"
                            >
                            <!--
                            el select no acepta otro atributo que no se llame text, si el atributo no es text no muestra nada
                            -->
                            </v-select>
                        </v-card>
                    </v-col>

                    <v-col cols="12" md="6" lg="12" sm="6">
                        <v-card class="pa-4" elevation="3">
                            <h3 class="my-4">Ordenar por:</h3>
                            <v-select 
                                :items="filtros"
                                label="Filtros"
                                chips 
                                color="#005598"
                                hide-details
                                small-chips
                                outlined
                                dense
                                hide-selected
                                @change="filtrosChange($event)"
                            >
                                <template v-slot:item="{item,attrs,on}">
                                    <v-list-item v-bind="attrs" v-on="on" dense>
                                        <v-list-item-icon>
                                            <v-icon>{{item.icon}}</v-icon>
                                        </v-list-item-icon>
                                        <v-list-item-title :id="attrs['aria-labelledby']">
                                            {{item.text}}
                                        </v-list-item-title>
                                    </v-list-item>
                                </template>
                            </v-select>
                        </v-card>
                    </v-col>
                </v-row>
            </v-col>

            <v-col cols="12" lg="9" md="12" sm="12">
                <!--Resultados empresa -->
                <v-sheet class="mx-4 my-3 pa-4" elevation="2" height="200">
                    <ResultadosEmpresa :empresas="empresas"/>
                </v-sheet>

                <!--Resultados conceptos/empresa -->
                <ResultadosConceptos :conceptos="conceptos" :empresas="empresas"/>
            </v-col>
        </v-row>
        <Footer />

        <ValidacionConcepto />
    </div>
</template>

<script>
//components layouts
import AppBar from '@/components/navbar/AppBar';
import Footer from '@/components/footer/Footer';
import ValidacionConcepto from '@/components/dialogs/ValidacionConcepto';
//components que manejan los resultados
import ResultadosConceptos from '@/components/vistaBuscar/ResultadosConceptos';
import ResultadosEmpresa from '@/components/vistaBuscar/ResultadosEmpresa';
//router
import router from '@/router';
//services
import Grupos from '@/services/Grupos';
import Conceptos from '@/services/Conceptos';
import Empresa from '@/services/Empresa';
//state 
import {mapState} from 'vuex';

    export default {
        components:{
            AppBar,
            Footer,
            ResultadosEmpresa,
            ResultadosConceptos,
            ValidacionConcepto 
        },
        data() {
            return {
                aux:[],
                conceptos:[],
                empresas:[],
                error:false,
                selectCategoria:'',
                selectFiltro:'',
                categorias:[],
                filtros:[
                    {id:1,icon:'arrow_right',text:'Mayor precio'},
                    {id:2,icon:'arrow_left',text:'Menor precio'},
                    {id:3,icon:'text_format',text:'Alfabeto'},
                    {id:4,icon:'local_atm',text:'Promociones'},
                ]
            }
        },
        computed: {
            ...mapState(['busqueda','conceptosId'])
        },
        watch: {
            busqueda(){
                if(this.busqueda.length >= 5){
                    this.getConceptos(this.busqueda);
                };
            }
        },
        mounted(){
            this.Getgrupos();
            this.getConceptos(this.busqueda);
        },

        methods: {
            Getgrupos(){
                Grupos().get('/?fields=id,nombre').then((response) => {
                    for(let i=0; i< response.data.data.length; i++){
                        let categoria={
                            text:response.data.data[i].nombre,
                            id:response.data.data[i].id
                        }
                        this.categorias.push(categoria);
                    }
                }).catch(e => {
                    console.log(e);
                    this.error = true;
                });
            },

            categoriasChange(evt){//guarda el seleccionado para luego filtrar 
                console.log(evt);
                this.selectCategoria=evt.text;
            },

            filtrosChange(evt){//guarda el seleccionado para luego filtrar 
                console.log(evt);
                this.selectFiltro=evt.text;
            },

            getConceptos(nombre){//trae los conceptos por un like 
                Conceptos().get(`/?nombre=${nombre}`).then((response) => {
                    console.log(response.data);
                }).catch(e => {
                    console.log(e);
                });
            },

            getEmpresa(id){
                Empresa().get(`/${id}`).then((response) => {
                    console.log(respose.data);
                }).catch(e => {
                    console.log(e);
                })
            },

            ordenEmpresa(){
                if(aux.length >= 0){
                    for (let i = 0; i < aux.length; i++) {
                    }
                }
            }


        },
    }
</script>
