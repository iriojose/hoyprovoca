<template>
    <div>
        <AppBar />

        <!--v-card v-if="loading" elevation="0" color="#eee" width="100%" height="500">
            <LoaderRect />
        </v-card -->

        <v-row justify="center" :class="$vuetify.breakpoint.smAndDown ? 'margen-movil mx-3':'margen-top'">
            <v-col cols="12" md="3" sm="12">
                <v-card width="100%" height="320" elevation="0" class="mt-3 pa-5">
                    <v-btn color="#828282" to="" outlined block rounded elevation="0" active-class="" class="mb-4 text-capitalize overline font-weight-bold">
                        Tiendas / Mercados
                    </v-btn>

                    <v-btn color="#828282" to="" outlined block rounded elevation="0" active-class="" class="mb-4 text-capitalize overline font-weight-bold">
                        Restaurantes
                    </v-btn>

                    <v-divider class="mb-4"></v-divider>

                    <div class="title font-weight-black mb-2">Ordenar Por</div>

                    <v-btn color="#828282" block rounded outlined class="overline font-weight-bold text-capitalize mb-2">
                        Menor precio
                    </v-btn>
                    <v-btn color="#828282" block rounded outlined class="overline font-weight-bold text-capitalize mb-2">
                        Mayor precio
                    </v-btn>
                    <v-btn color="#828282" block rounded outlined class="overline font-weight-bold text-capitalize mb-2">
                        Orden Alfabético
                    </v-btn>
                </v-card>
            </v-col>
            <v-col cols="12" md="8" sm="12">
                <v-row justify="center">
                    <v-col cols="12" md="12" sm="12"> 
                        <v-card width="100%" height="200" elevation="0" class="pa-5">
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
                    </v-col>
                </v-row>
            </v-col>
        </v-row>

        <Footer class="margen" />
    </div>
</template>

<script>
import AppBar from "@/components/navbar/AppBar";
import Footer from "@/components/footer/Footer";
import LoaderRect from '@/components/loaders/LoaderRect';
import {mapState} from 'vuex';
import Empresa from '@/services/Empresa';
import variables from '@/services/variables_globales';

    export default {
        components:{
            AppBar,
            Footer,
            LoaderRect,
        },
        data() {
            return {
                loading:true,
                empresas:[],
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
            this.getEmpresas();
        },
        computed: {
            ...mapState(['agregados'])
        },
        methods:{
            push(empresa){

            },
            getEmpresas(){
                Empresa().get('/').then((response) => {
                    this.empresas = response.data.data;
                }).catch(e => {
                    console.log(e);
                });
            }
        }
    }
</script>

<style lang="css" scope>
    .margen{
        margin-top:200px;
    }
    .margen-top{
        margin-top:75px;
    }
    .margen-movil{
        margin-top:120px;
    }
</style>