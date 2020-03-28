<template>
    <div>
        <AppBar />
        <Banner />
        <MasVendidos :conceptos="conceptos" />
        <CategoriasSugeridas :grupos="grupos"/>
        <EmpresasSugeridas :empresas="empresas" />
        <Footer />
    </div>
</template>

<script>
import Footer from '@/components/footer/Footer';
import Conceptos from '@/services/Conceptos';
import Empresa from '@/services/Empresa';
import Grupos from '@/services/Grupos';
import AppBar from '@/components/navbar/AppBar';
import Banner from '@/components/vistaHome/Banner'
import MasVendidos from '@/components/vistaHome/MasVendidos';
import EmpresasSugeridas from '@/components/vistaHome/EmpresasSugeridas';
import CategoriasSugeridas from '@/components/vistaHome/CategoriasSugeridas';
import {mapState} from 'vuex';

    export default {
        components:{
            AppBar,
            Banner,
            Footer,
            MasVendidos,
            EmpresasSugeridas,
            CategoriasSugeridas
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
                conceptos:[],
                empresas:[],
                grupos:[],
                bandera:false
            }
        },
        computed:{
            ...mapState(['agregados'])
        },
        watch: {
            agregados(){
                this.bandera ?  this.revision():this.bandera=true;
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
                }).catch(e => {
                    console.log(e);
                });
            },
            getEmpresas(){
                Empresa().get('/?limit=8').then((response) => {
                    this.empresas = response.data.data;
                }).catch(e => {
                    console.log(e);
                });
            },
            getGrupos(){
                Grupos().get('/?after-id=2&before-id=11').then((response) => {
                    this.grupos = response.data.data;
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
