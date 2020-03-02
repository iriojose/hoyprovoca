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
                                item-text="nombre"
                                return-object
                                dense
                                small-chips
                                hide-selected
                                @change="changeCategoria($event)"
                            ></v-select>
                        </v-card>
                    </v-col>

                    <v-col cols="12" md="6" lg="12" sm="6">
                        <v-card class="pa-4" elevation="3">
                            <h3 class="my-4">Ordenar por:</h3>
                            <v-select 
                                :items="filt"
                                label="Filtros"
                                chips 
                                color="#005598"
                                hide-details
                                small-chips
                                outlined
                                dense
                                hide-selected
                                @change="changeFiltro($event)"
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
                <SliderAvatars :empresas="empresas" :class="$vuetify.breakpoint.smAndDown ? 'ma-5':'mr-4 ml-2 my-5'"/> 
                
                <v-row :class="$vuetify.breakpoint.smAndDown ? 'mx-2':'mr-2 ml-2'" >
                    <v-col 
                        cols="12" 
                        class="mb-4 fill-height"
                        lg="3" 
                        sm="6" 
                        md="4" 
                        v-for="(concepto,i) in auxConceptos" 
                        :key="i"
                        justify-self="center"
                        align-self="center"
                    >
                        <CardConceptos 
                            :widthCard="300"
                            :heightCard="200"
                            :widthImg="300"
                            :heightImg="200"
                            :concepto="concepto"
                            :tipo="3"
                        />
                    </v-col>
                    <v-col cols="12" md="12" sm="12">
                        <v-pagination
                            v-model="page"
                            :length="totalPage"
                            :page="page"
                            :total-visible="$vuetify.breakpoint.smAndDown ? 5:10"
                            color="#005598"
                        ></v-pagination>
                    </v-col>
                </v-row>
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
import SliderAvatars from "@/components/sliders/SliderAvatars";
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
            ValidacionConcepto,
            CardConceptos,
            SliderAvatars
        },
        data(){
            return {
                page:1,
                min:1,
                max:5,
                totalPage:1,
                aux:[],
                auxGrupos:[],
                auxConceptos:[],
                conceptos:[],
                empresas:[],
                error:false,
                categorias:[],
                selectFiltro:'',
                selectCategoria:0,
                filt:[
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
                    this.getConceptos(this.busqueda);
                    this.validarBusqueda=false;
                }
            },
            conceptosId(){
                this.addOrder();
            },
            page(){
                this.filtrado();
            },
            selectFiltro(){
                this.filtrado();
            },
            selectCategoria(){
                this.filtrado();
            }
        },
        mounted(){
            this.getConceptos(this.busqueda);
        },
        methods: {
            //LLAMAAS A LA API
            getConceptos(nombre){//trae los conceptos por un like (mejorar)
                Conceptos().get(`/?nombre=${nombre}`).then((response) => {
                    this.conceptos=response.data.data;
                    this.auxConceptos = this.conceptos;
                    this.longitudPage(this.conceptos.length);
                    this.ordenEmpresa();
                    this.addOrder();//verifica agregados a los pedidos
                    this.ordenargrupos();
                    this.paginador();
                }).catch(e => {
                    console.log(e);
                });
            },

            getGrupos(aux){//trae los grupos de los conceptos encontrados
                for (let id of aux) {
                    Grupos().get(`/${id}`).then((response) => {
                        this.categorias = response.data.data;
                    }).catch(e => {
                        console.log(e);
                        this.error = true;
                    });
                }
            },
            getEmpresa(aux){//trae las empresas de los resultaos
                for (let id of aux){
                    Empresa().get(`/${id}`).then((response) => {
                        this.empresas.push(response.data.data);
                    }).catch(e => {
                        console.log(e);
                    });
                }
            },
            longitudPage(longitud){//saca la longitud de la paginacion
                this.totalPage = Math.round((longitud/5)+1);
            },
            ordenEmpresa(){//obtiene los ids de las empresas
                this.aux = [];
                for (let i = 0; i < this.conceptos.length; i++) {
                    this.aux.push(this.conceptos[i].empresa_id);
                }
                //esta variable es de tipo (Set) por lo tanto se itera de manera distinta
                //for(let item of myset) ejemplo... siendo item el valor iterado.
                this.aux = new Set(this.aux);
                this.getEmpresa(this.aux);
            },

            ordenargrupos(){//saca los id de los grupos a los que pertenecen los conceptos buscados
                this.auxGrupos = [];
                for (let i = 0; i < this.conceptos.length; i++) {
                    this.auxGrupos.push(this.conceptos[i].grupos_id);
                }
                //esta variable es de tipo (Set) por lo tanto se itera de manera distinta
                //for(let item of myset) ejemplo... siendo item el valor de la iteracion.
                this.auxGrupos = new Set(this.auxGrupos);
                this.getGrupos(this.auxGrupos);
            },

            addOrder(){//verifica los conceptos agregados a conceptos
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
            
            changeCategoria(evt){
                for (let i = 0; i < this.categorias.length; i++) {
                    if(this.categorias[i].text == evt){
                        this.selectCategoria=this.categorias[i].id;
                    }
                } 
            },

            changeFiltro(evt){
                this.selectFiltro = evt;
            },
            
            paginador(){
                let aux = [];
                this.longitudPage(this.auxConceptos.length);

                if(this.page > 1){
                    this.min = ((this.page*5)-5+1);
                    this.max=(this.min+4);
                }else{
                    this.min=1;
                    this.max=5;
                }

                for (let i = 0; i < this.auxConceptos.length; i++){
                    if(i+1 >= this.min && i+1 <= this.max){
                        aux.push(this.auxConceptos[i]);
                    }
                }
                this.auxConceptos = aux;
            },
            
            filtros(){
                if(this.selectFiltro == 'Mayor precio'){
                    this.auxConceptos = this.ordenarMayorAMenor(this.auxConceptos);
                }else if(this.selectFiltro == 'Menor precio'){
                    this.auxConceptos = this.ordenarMenorAMayor(this.auxConceptos);
                }else if(this.selectFiltro == 'Alfabeto'){
                    this.auxConceptos = this.ordenarAlfabeticamente(this.auxConceptos);
                }
            },

            filtrado(){
                this.auxConceptos = this.conceptos;

                if(this.selectFiltro !== '' && this.selectCategoria !== 0){
                    this.filtros();
                    this.ordenarPorCategorias();
                    this.paginador();
                }else{
                    if(this.selectFiltro !== ''){
                        this.filtros();
                        this.paginador();
                    }else{
                        if(this.selectCategoria !== 0){
                            this.ordenarPorCategorias();
                            this.paginador();
                        }else{
                            this.paginador();
                        }
                    }
                }
            },

            ordenarPorCategorias(){
                let aux = [];
                for (let i= 0; i < this.auxConceptos.length; i++) {
                    if(this.auxConceptos[i].grupos_id == this.selectCategoria){
                        aux.push(this.conceptos[i]);
                    }
                }
                this.auxConceptos = aux;
            },

            ordenarMayorAMenor(conceptos){
                conceptos.sort((a,b) => {
                    if (Number.parseFloat(a.precio_a) < Number.parseFloat(b.precio_a)){
                        return 1;
                    }
                    if (Number.parseFloat(a.precio_a) > Number.parseFloat(b.precio_a)){
                        return -1;
                    }
                    return 0;
                });
                return conceptos;
            },

            ordenarMenorAMayor(conceptos){
                conceptos.sort(function (a, b){
                    if (Number.parseFloat(a.precio_a) < Number.parseFloat(b.precio_a)){
                        return -1;
                    }
                    if (Number.parseFloat(a.precio_a) > Number.parseFloat(b.precio_a)){
                        return 1;
                    }
                    return 0;
                });
                return conceptos;
            },

            ordenarAlfabeticamente(conceptos){
                conceptos.sort((a,b) =>{
                    var n = a.nombre.toLocaleLowerCase().localeCompare(b.nombre.toLocaleLowerCase());
                    return n === 0 && a.nombre !== b.nombre ? b.nombre.localeCompare(a) : n;
                });
                return conceptos;
            },
            
        },
    }
</script>
