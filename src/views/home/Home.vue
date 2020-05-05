<template>
    <v-card elevation="0" color="#f7f7f7" width="100%">
        <Banner />
        <v-card-text>
            
            <CategoriasSugeridas :grupos="grupos" v-if="!loadingG" />
            <LoaderCategorias v-else />

            <v-divider class="mt-12"></v-divider>

            <v-scroll-x-transition>
                <EmpresasSugeridas title="Visita nuestras tiendas" :empresas="empresas" v-show="!loadingE" />
            </v-scroll-x-transition>
            <SkeletonCard v-if="loadingE" :width="300" :height="200" title="Visita nuestras tiendas" />
        </v-card-text>
    </v-card>
</template>

<script>
import Empresa from '@/services/Empresa';
import Grupos from '@/services/Grupos';
import SkeletonCard from '@/components/loaders/SkeletonCard';
import Banner from '@/components/vistaHome/Banner'
import EmpresasSugeridas from '@/components/vistaHome/EmpresasSugeridas';
import CategoriasSugeridas from '@/components/vistaHome/CategoriasSugeridas';
import LoaderCategorias from '@/components/loaders/LoaderCategorias';

    export default {
        components:{
            LoaderCategorias,
            Banner,
            EmpresasSugeridas,
            CategoriasSugeridas,
            SkeletonCard,
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
                empresas:[],
                grupos:[],
                bandera:false,
                loadingG:true,
                loadingE:true,
            }
        },
        mounted() {
            this.getGrupos();
            this.getEmpresas();
        },
        methods:{
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
        }
    }
</script>
