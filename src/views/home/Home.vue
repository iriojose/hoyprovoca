<template>
    <div>
        <AppBar />
        <Banner />

        <v-scroll-x-transition>
            <MasVendidos :conceptos="conceptos" v-show="loadingC" />
        </v-scroll-x-transition>
        <SkeletonCard v-if="!loadingC"/>

        <Parallax />

        <Categorias title="Categorias" :categorias="grupos" />

        <Sugerencias :sugerencias="empresas" />

        <Footer />
        <ValidacionConcepto />
    </div>
</template>

<script>
import AppBar from "@/components/navbar/AppBar";
import Footer from "@/components/footer/Footer";
import Banner from "@/components/vistaHome/Banner";
import Parallax from '@/components/vistaHome/Parallax';
import SkeletonCard from "@/components/layouts/SkeletonCard";
import MasVendidos from '@/components/vistaHome/MasVendidos';
import Categorias from "@/components/vistaHome/Categorias";
import Sugerencias from "@/components/vistaHome/Sugerencias";
import ValidacionConcepto from '@/components/dialogs/ValidacionConcepto';
import { mapState } from "vuex";
import Conceptos from '@/services/Conceptos';
import Grupos from '@/services/Grupos';
import Empresa from '@/services/Empresa';

    export default {
        components:{
            AppBar,Footer,Banner,Parallax,SkeletonCard,MasVendidos,Categorias,Sugerencias,ValidacionConcepto
        },
        head:{
            title(){
                return {
                    inner:'HoyProvoca',
                    separator:'|',
                    complement: 'Inicio'
                }
            }
        },
        data() {
            return {
                loadingC:false,
                error:false,
                grupos:[],
                empresas:[],
                conceptos:[]
            }
        },
        mounted() {
            this.getEmpresas();
            this.getConceptos();
            this.getGrupos();
            this.addOrder();
        },
        computed: {
            ...mapState(['conceptosId','user']),
        },
        watch: {
            //cuando las variables cambien se quita el modo de espera
            conceptosId(){//se refresca cada que agregan
                this.addOrder();
            },
        },
        methods: {
            addOrder(){
                this.conceptos.filter(a=> this.conceptosId.filter(b=> a.id==b ? a.agregado=true:null));
            },
            getGrupos(){//trae las categorias (grupos)
                Grupos().get('/?limit=10').then((response) => {
                    this.grupos = response.data.data;
                }).catch(e => {
                    console.log(e);
                    this.error = true;
                });
            },
            getEmpresas(){//trae empresas (sugerencias)
                Empresa().get('/?limit=8').then((response) => {
                    this.empresas= response.data.data;
                }).catch(e => {
                    console.log(e);
                    this.error = true;
                });
            },
            getConceptos(){//trae conceptos (productos/servicios)
                Conceptos().get('/?limit=15').then((response) => {
                    this.loadingC = true;
                    console.log(response);
                    this.conceptos = response.data.data;
                    this.addOrder();//pone bandera de agregado a pedidos
                }).catch(e => {
                    console.log(e);
                    this.error = true;
                });
            }
        },
    }
</script>
