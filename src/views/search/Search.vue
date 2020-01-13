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
                <v-row class="mr-2">
                    <v-col 
                        :justify-self="$vuetify.breakpoint.smAndDown ? 'center':null"
                        :align-self="$vuetify.breakpoint.smAndDown ? 'center':null"
                        cols="12" 
                        class="mb-5"
                        lg="3" 
                        sm="12" 
                        md="4" 
                        v-for="(concepto,i) in conceptos" 
                        :key="i"
                    >
                        <CardConceptos 
                            :widthCard="300"
                            :heightCard="200"
                            :widthImg="300"
                            :heightImg="200"
                            :concepto="concepto"
                        />
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="12" lg="9" md="12" sm="12">
                <!--Resultados empresa 
                <v-sheet class="mx-4 my-3 pa-4" elevation="2" height="200">
                    <ResultadosEmpresa :empresas="empresas"/>
                </v-sheet>-->

                <!--Resultados conceptos/empresa 
                <ResultadosConceptos :conceptos="conceptos" :empresas="empresas"/>-->
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
import CardConceptos from '@/components/cards/CardConceptos';
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
            ValidacionConcepto,
            CardConceptos
        },
        data() {
            return {
                aux:[],
                auxConceptos:[],
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
            ...mapState(['busqueda','conceptosId','validarBusqueda'])
        },
        watch: {
            validarBusqueda(){
                if(this.validarBusqueda){
                    console.log('hola');
                    this.getConceptos(this.busqueda);
                    this.validarBusqueda=false;
                }
            },
            conceptosId(){
                this.addOrder();
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
                this.selectCategoria=evt.text;
            },

            filtrosChange(evt){//guarda el seleccionado para luego filtrar 
                this.selectFiltro=evt.text;
            },

            getConceptos(nombre){//trae los conceptos por un like 
                Conceptos().get(`/?nombre=${nombre}`).then((response) => {
                    this.conceptos=response.data.data;
                    //this.ordenEmpresa();
                    this.addOrder();
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
            
            addOrder(){
                for (let i = 0; i < this.conceptos.length; i++) {
                    for (let e = 0; e < this.conceptosId.length; e++) {
                        if(this.conceptos[i].id == this.conceptosId[e]){
                            this.conceptos[i].agregado=true;
                            break;
                        }else{
                            this.conceptos[i].agregado=false;
                        }
                    }
                }
            },

            ordenEmpresa(){
                let ids=0;

                for (let i = 0; i < this.conceptos.length; i++){
                    if(this.conceptos[i].empresa_id !== ids){
                        ids=this.conceptos[i].empresa_id;
                        let data={
                            id:ids
                        }
                        this.aux.push(data);
                    }
                }
            }


        },
    }
</script>
