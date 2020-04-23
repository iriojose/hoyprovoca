<template>
    <div>
        <div class="text-center font-weight-bold headline" v-if="error" :class="$vuetify.breakpoint.smAndDown ? 'margen-movil':'margen-top'">
            No se encontraron resultados
        </div>
        <v-row justify="center" v-if="error">
            <v-img src="@/assets/nodata.svg" contain width="500" height="500" />
        </v-row>

        <v-card v-if="loading" elevation="0" color="#f7f7f7" width="100%" height="500">
            <LoaderRect />
        </v-card>

        <v-row v-if="!loading && !error" justify="center" :class="$vuetify.breakpoint.smAndDown ? 'margen-movil':'margen-top mx-10'">
            <v-col cols="12" sm="12" md="3">
                <v-card width="100%" height="250" elevation="2" class="pa-5">
                    <!--v-hover v-slot:default="{hover}">
                        <v-btn color="#828282" to="" outlined block rounded 
                            :elevation="hover ? 2:0" class="text-capitalize overline font-weight-bold mb-4"
                        >
                            Tiendas / Mercados
                        </v-btn>
                    </v-hover>

                    <v-hover v-slot:default="{hover}">
                        <v-btn color="#828282" to="" outlined block rounded 
                            :elevation="hover ? 2:0" class="text-capitalize overline font-weight-bold mb-4"
                        >
                            Restaurantes
                        </v-btn>
                    </v-hover>

                    <v-divider class="my-4"></v-divider-->

                    <div class="title font-weight-black my-4">Ordenar Por</div>

                    <v-hover v-slot:default="{hover}">
                        <v-btn :color="activo == 1 ? '#232323':'#fff'" block rounded @click="menorPrecio"
                            :elevation="hover ? 2:0" class="mb-4 text-capitalize overline font-weight-bold"
                            :dark="activo == 1 ? true:false"
                        >
                            Menor Precio
                        </v-btn>
                    </v-hover>

                    <v-hover v-slot:default="{hover}">
                        <v-btn :color="activo == 2 ? '#232323':'#fff'" block rounded @click="mayorPrecio"
                            :elevation="hover ? 2:0" class="mb-4 text-capitalize overline font-weight-bold"
                            :dark="activo == 2 ? true:false"
                        >
                            Mayor Precio
                        </v-btn>
                    </v-hover>

                    <v-hover v-slot:default="{hover}">
                        <v-btn :color="activo == 3 ? '#232323':'#ffff'" block rounded @click="alfabeticamente"
                            :elevation="hover ? 2:0" class="text-capitalize overline font-weight-bold"
                            :dark="activo == 3 ? true:false"
                        >
                            Orden Alfabético
                        </v-btn>
                    </v-hover>
                </v-card>
            </v-col>

            <v-col cols="12" md="9" sm="12">
                <v-card width="100%" height="150" elevation="2" class="px-5 pt-3">
                    <div class="title font-weight-black">Resultados en:</div>
                    <v-slide-group show-arrows class="my-5">
                        <v-slide-item v-for="(empresa,i) in empresas" :key="i" class="ma-3">
                            <v-btn fab @click="push(empresa)" elevation="0">
                                <v-avatar size="60" class="elevation-5">
                                    <v-img :src="image+empresa.logo"></v-img>
                                </v-avatar> 
                            </v-btn> 
                        </v-slide-item>
                    </v-slide-group>
                </v-card>

                <div class="mt-5" v-for="(empresa,i) in empresas" :key="i">
                    <v-card width="100%" height="400" elevation="2" class="pt-3">
                        <v-card-title >
                            <v-btn fab @click="push(empresa)" elevation="0">
                                <v-avatar size="50" class="elevation-5">
                                    <v-img :src="image+empresa.logo"></v-img>
                                </v-avatar> 
                            </v-btn> 
                            <div style="cursor: pointer" @click="push(empresa)" class="mx-2 font-weight-black subtitle-2 underline">{{empresa.nombre_comercial}}</div>
                        </v-card-title>
                        <v-card-text>
                            <v-slide-group show-arrows class="my-2">
                                <v-slide-item v-for="(concepto,e) in arrayConceptos[i]" :key="e">
                                    <CardConceptos :concepto="concepto" />
                                </v-slide-item>
                            </v-slide-group>
                        </v-card-text>
                    </v-card>
                </div>
            </v-col>
        </v-row>

        <ModalSesion />
        <Footer class="margen" />
    </div>
</template>

<script>
import Footer from "@/components/footer/Footer";
import LoaderRect from '@/components/loaders/LoaderRect';
import {mapState} from 'vuex';
import Empresa from '@/services/Empresa';
import Conceptos from '@/services/Conceptos';
import CardConceptos from '@/components/cards/CardConceptos2';
import variables from '@/services/variables_globales';
import router from '@/router';
import ModalSesion from '@/components/dialogs/ModalSesion';

    export default {
        components:{
            Footer,
            LoaderRect,
            CardConceptos,
            ModalSesion
        },
        data() {
            return {
                loading:true,
                bandera2:false,
                error:false,
                activo:0,
                ids:[],
                empresas:[],
                conceptos:[],
                arrayConceptos:[],
                ...variables
            }
        },
        head:{
            title(){
                return {
                    inner:'HoyProvoca',
                    separator:'|',
                    complement: 'Buscar'
                }
            }
        },
        mounted() {
            this.getConceptos();
        },
        computed: {
            ...mapState(['agregados','search','bandera'])
        },
        watch: {
            bandera(){
                this.error=false;
                this.loading = true;
                this.conceptos = [];
                this.arrayConceptos = [];
                this.empresas = [];
                this.getConceptos();
            },
            agregados(){
                this.bandera2 ?  this.revision():this.bandera2=true;
            }
        },
        methods:{
            push(item){
                router.push({name:'aliadoDetalle', params:{text:item.nombre_comercial}});
            },
            getConceptos(){
                console.log(this.search);
                Conceptos().get(`/?nombre=${this.search}`).then((response) => {
                    if(response.data !== "This entity is empty"){
                        this.conceptos = response.data.data;
                        this.conceptos.filter(a => a.agregado=false);
                        this.conceptos.filter(a => this.agregados.filter(b => a.id == b ? a.agregado=true:null));
                        let array = [];
                        response.data.data.filter(a => array.push(a.adm_empresa_id));
                        this.ids = [...new Set(array)];
                        this.ids.filter(a => this.getEmpresas(a));
                        this.loading = false;
                    }else{
                        this.loading = false;
                        this.error = true;
                    }
                }).catch(e => {
                    console.log(e);
                });
            },
            getEmpresas(id){
                Empresa().get(`/${id}`).then((response) => {
                    this.empresas.push(response.data.data);
                    let array=[];
                    this.conceptos.filter(a => a.adm_empresa_id == response.data.data.id ? array.push(a):null);
                    this.arrayConceptos.push(array);
                }).catch(e => {
                    console.log(e);
                });
            },
            revision(){
                this.arrayConceptos.filter(a => a.filter(b => b.agregado=false));
                this.arrayConceptos.filter(a => a.filter(b => this.agregados.filter(c => b.id == c ? b.agregado=true:null)));
            },
            menorPrecio(){
                this.activo = 1;
                this.arrayConceptos.filter(c => c.sort(function (a, b){
                    if (Number.parseFloat(a.precio_a) < Number.parseFloat(b.precio_a)){
                        return -1;
                    }
                    if (Number.parseFloat(a.precio_a) > Number.parseFloat(b.precio_a)){
                        return 1;
                    }
                    return 0;
                }));
            },
            mayorPrecio(){
                this.activo = 2;
                this.arrayConceptos.filter(c => c.sort((a,b) => {
                    if (Number.parseFloat(a.precio_a) < Number.parseFloat(b.precio_a)){
                        return 1;
                    }
                    if (Number.parseFloat(a.precio_a) > Number.parseFloat(b.precio_a)){
                        return -1;
                    }
                    return 0;
                }));
            },
            alfabeticamente(){
                this.activo = 3;
                this.arrayConceptos.filter(c => c.sort((a,b) =>{
                    var n = a.nombre.toLocaleLowerCase().localeCompare(b.nombre.toLocaleLowerCase());
                    return n === 0 && a.nombre !== b.nombre ? b.nombre.localeCompare(a) : n;
                }));
            }
        }
    }
</script>

<style lang="scss" scope>
    .margen{
        margin-top:200px;
    }
    .margen-top{
        margin-top:75px;
    }
    .margen-movil{
        margin-top:120px;
    }
    .shadow{
        box-shadow: 0px 6px 5px -4px rgba(35,35,35,0.4);
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