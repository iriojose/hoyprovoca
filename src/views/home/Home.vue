<template>
    <div>
        <Banner />

        <v-scroll-x-transition>
            <MasVendidos :conceptos="conceptos" v-show="!loadingC" title="Productos más vendidos" />
        </v-scroll-x-transition>
        <SkeletonCard v-if="loadingC" :width="200" :height="200" title="Productos más vendidos" />
        
        <v-divider class="my-12"></v-divider>

        <Banner2 />

        <v-divider class="mt-12"></v-divider>

        <v-scroll-x-transition>
            <CategoriasSugeridas title="Categorías más buscadas" :grupos="grupos" v-show="!loadingG"/>
        </v-scroll-x-transition>
        <SkeletonCard v-if="loadingG" :width="300" :height="200" title="Categorías más buscadas" />

        <v-divider class="mt-12"></v-divider>

        <v-scroll-x-transition>
            <EmpresasSugeridas title="Visita nuestras tiendas" :empresas="empresas" v-show="!loadingE" />
        </v-scroll-x-transition>
        <SkeletonCard v-if="loadingE" :width="300" :height="200" title="Visita nuestras tiendas" />

        <ModalSesion />
        <Footer />
    </div>
</template>

<script>
import Footer from '@/components/footer/Footer';
import Conceptos from '@/services/Conceptos';
import Empresa from '@/services/Empresa';
import Grupos from '@/services/Grupos';
import SkeletonCard from '@/components/loaders/SkeletonCard';
import Banner from '@/components/vistaHome/Banner'
import Banner2 from '@/components/vistaHome/Banner2'
import MasVendidos from '@/components/vistaHome/MasVendidos';
import EmpresasSugeridas from '@/components/vistaHome/EmpresasSugeridas';
import CategoriasSugeridas from '@/components/vistaHome/CategoriasSugeridas';
import {mapState} from 'vuex';
import ModalSesion from '@/components/dialogs/ModalSesion';

    export default {
        components:{
            Banner,
            Banner2,
            Footer,
            MasVendidos,
            EmpresasSugeridas,
            CategoriasSugeridas,
            SkeletonCard,
            ModalSesion
        },
        head:{
            title(){
                return {
                    inner:'Hoyprovoca',
                    separator:'|',
                    complement: 'Inicio'
                }
            }
        },
        data() {
            return {
                conceptos:[],
                empresas:[],
                grupos:[],
                bandera:false,
                loadingC:true,
                loadingG:true,
                loadingE:true
            }
        },
        computed:{
            ...mapState(['agregados'])
        },
        watch: {
            agregados(){
                //this.bandera ?  this.revision():this.bandera=true;
                this.revision();
            },
        },
        mounted() {
            this.getConceptos();
            this.getEmpresas();
            this.getGrupos();
        },
        methods:{
            getConceptos(){
                Conceptos().get("/mostsold/?limit=10").then((response) => {
                    this.conceptos = response.data.data;
                    this.revision();
                    this.loadingC = false;
                }).catch(e => {
                    console.log(e);
                });
            },
            getEmpresas(){
                Empresa().get('/?limit=8').then((response) => {
                    this.empresas = response.data.data;
                    this.loadingE = false;
                }).catch(e => {
                    console.log(e);
                });
            },
            getGrupos(){
                Grupos().get('/mostsold/?limit=10').then((response) => {
                    this.grupos = response.data.data;
                    this.loadingG = false;
                }).catch(e => {
                    console.log(e);
                });
            },
            revision(){
                this.conceptos.filter(a => a.gregado = false);
                this.conceptos.filter(a => this.agregados.filter(b => a.id == b ? a.agregado=true:null));
            }
        }
    }
</script>
