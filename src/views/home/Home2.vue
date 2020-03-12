<template>
    <!--error en el servidor -->
    <error500 v-if="error"/>

    <div v-else>
        <AppBar />

        <Banner />

        <MasVendidos :conceptos="conceptos" v-if="loadingC"/>
        <SkeletonCard v-else/>

        <MasVendidos :conceptos="conceptos" v-if="loadingC"/>
        <SkeletonCard v-else/>

        <Parallax class="my-10 mx-2" />

        <Categorias title="Categorias" :categorias="categorias" />

        <Sugerencias :sugerencias="sugerencias" />

        <!-- <Banner2 />-->
        <Footer />
        <ValidacionConcepto />
    </div>
</template>

<script>
//store
import { mapState } from "vuex";
//components
import AppBar from "@/components/navbar/AppBar";
import Footer from "@/components/footer/Footer";
import Banner from "@/components/vistaHome/Banner";
import Categorias from "@/components/vistaHome/Categorias";
import Sugerencias from "@/components/vistaHome/Sugerencias";
import SkeletonCard from "@/components/layouts/SkeletonCard";
import Parallax from '@/components/vistaHome/Parallax';
import MasVendidos from '@/components/vistaHome/MasVendidos';
import error500 from '@/views/s500';
import ValidacionConcepto from '@/components/dialogs/ValidacionConcepto';
//servicios
import Conceptos from '@/services/Conceptos';
import Grupos from '@/services/Grupos';
import Empresa from '@/services/Empresa';
//router
import router from '@/router';

    export default {
        name: "home",
        components: {
            AppBar,
            Footer,
            Banner,
            Categorias,
            Sugerencias,
            SkeletonCard,
            Parallax,
            MasVendidos,
            error500,
            ValidacionConcepto
        },
        head:{
            title(){
                return {
                    inner:this.title,
                    separator:'|',
                    complement: 'Home'
                }
            }
        },
        data() {
            return {
                title:'HoyProvoca',
                error:false,
                categorias: [],
                sugerencias:[],
                conceptos:[],
                loadingC:false,
                loadinG:false,
                loadingE:false,
            };
        },
        created() {
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
                Grupos().get('/?limit=15').then((response) => {
                    this.categorias = response.data.data;
                    this.loadinG = true;
                }).catch(e => {
                    console.log(e);
                    this.error = true;
                });
            },
            getEmpresas(){//trae empresas (sugerencias)
                Empresa().get('/?limit=8').then((response) => {
                    this.sugerencias= response.data.data;
                    this.loadingE = true;
                }).catch(e => {
                    console.log(e);
                    this.error = true;
                });
            },
            getConceptos(){//trae conceptos (productos/servicios)
                Conceptos().get('/?limit=15').then((response) => {
                    this.conceptos = response.data.data;
                    this.addOrder();//pone bandera de agregado a pedidos
                    this.loadingC = true;
                }).catch(e => {
                    console.log(e);
                    this.error = true;
                });
            }
        }
    };
</script>
