<template>
    <div>
        <AppBar />

        <v-row justify="center" align="center" :class="$vuetify.breakpoint.smAndDown ? 'mt-12 px-10':null">
            <v-col cols="12" md="3" sm="12">
                <v-row justify="center" align="center">
                    <v-col cols="12" sm="12" md="10">
                        <v-card class="pa-4" elevation="3">
                            <v-card-title class="subtitle-2 font-weight-black">
                                Buscar por:
                            </v-card-title>
                            <v-card-text>
                                <v-select 
                                    :items="grupos"
                                    item-text="nombre"
                                    label="Categoria"
                                    v-model="categoria"
                                    color="#005598"
                                    return-object
                                    dense
                                    chips
                                    outlined
                                    hide-details
                                    hide-selected
                                    small-chips
                                />
                            </v-card-text>
                        </v-card>
                    </v-col>
                    <v-col cols="12" sm="12" md="10">
                        <v-card class="pa-4" elevation="3">
                            <v-card-title class="subtitle-2 font-weight-black">
                                Buscar por:
                            </v-card-title>
                            <v-card-text>
                                <v-select 
                                    :items="filtros"
                                    label="Filtros"
                                    v-model="filtro"
                                    color="#005598"
                                    return-object
                                    dense
                                    chips
                                    outlined
                                    hide-details
                                    hide-selected
                                    small-chips
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
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="12" md="9" sm="12">
                <SliderAvatars :empresas="empresas" :class="$vuetify.breakpoint.smAndDown ? 'ma-5':'mr-4 ml-2 my-5'"/> 
            </v-col>
        </v-row>
        <Footer />
    </div>
</template>

<script>
import AppBar from '@/components/navbar/AppBar';
import Footer from '@/components/footer/Footer';
import SliderAvatars from "@/components/sliders/SliderAvatars";
import Grupos from '@/services/Grupos';
import Conceptos from '@/services/Conceptos';
import Empresa from '@/services/Empresa';
import {mapState} from 'vuex';

    export default {
        components:{
            AppBar,
            Footer,
            SliderAvatars,
        },
        data() {
            return {
                error:false,
                filtro:null,
                categoria:null,
                conceptos:[],
                grupos:[],
                empresas:[],
                filtros:[
                    {id:1,icon:'arrow_right',text:'Mayor precio'},
                    {id:2,icon:'arrow_left',text:'Menor precio'},
                    {id:3,icon:'text_format',text:'Alfabeto'},
                ]
            }
        },
        mounted(){
            this.getConceptos();
            this.getGrupos();
            this.getEmpresas();
        },
        computed: {
            ...mapState(['busqueda','conceptosId','validarBusqueda'])
        },
        watch: {
            conceptosId(){
                this.addOrder();
            },
        },
        head:{
            title(){
                return {
                    inner:'HoyProvoca',
                    separator:'|',
                    complement: 'Search'
                }
            }
        },
        methods:{
            getConceptos(nombre){
                Conceptos().get(`/?nombre=${nombre}`).then((response) => {
                    this.conceptos = response.data.data;
                }).catch(e => {
                    console.log(e);
                });
            },
            getGrupos(){
                Grupos().get("/").then((response) => {
                    this.grupos = response.data.data;
                }).catch(e => {
                    console.log(e);
                });
            },
            getEmpresas(){
                Empresa().get("/").then((response) => {
                    this.empresas = response.data.data;
                }).catch(e => {
                    console.log(e);
                });
            },
            addOrder(){//verifica los conceptos agregados a conceptos
                //experimental
                this.conceptos.filter(a => this.conceptosId.filter(b => a.id == b ? a.gregado=true:a.agregado=false));
                
                //old code
                /*for (let i = 0; i < this.conceptos.length; i++) {
                    for (let e = 0; e < this.conceptosId.length; e++) {
                        if(this.conceptos[i].id == this.conceptosId[e]){
                            this.conceptos[i].agregado=true;
                            break;
                        }else{
                            this.conceptos[i].agregado=false;
                        }
                    }
                }*/
            },
        }
    }
</script>