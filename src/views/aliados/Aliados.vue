<template>
    <v-card elevation="0" color="#f7f7f7" width="100%">
        <v-card-text>
            <v-card v-if="loading" elevation="0" color="#f7f7f7" width="100%" height="500">
                <LoaderRect />
            </v-card>

            <v-card 
                width="100%" elevation="0" color="#f7f7f7" 
                v-if="!loading && empresas.length == 0" 
                :class="$vuetify.breakpoint.smAndDown ? 'margen-movil':'margen-top'"
            >
                <v-card-text>
                    <v-row justify="center">
                        <v-img src="@/assets/nodata.svg" contain width="500" height="500" />
                    </v-row>
                    <div class="text-center font-weight-bold headline">
                        No se encontraron resultados
                    </div>
                </v-card-text>
            </v-card>

            <v-row 
                v-if="!loading && empresas.length > 0" justify="center" 
                :class="$vuetify.breakpoint.smAndDown ? 'margen-movil':'margen-top'"
            >
                <v-col cols="12" sm="12" md="8">
                    <div class="display-1 font-weight-black text-center mb-5">Todas las empresas</div>

                    <v-toolbar color="#f7f7f7" elevation="0" width="100%" class="mb-4 mx-5" v-if="$vuetify.breakpoint.smAndDown && !loading">
                        <v-btn tile icon class="mx-2" outlined @click="tipo = true" :disabled="tipo">
                            <v-icon dark>mdi-view-grid</v-icon>
                        </v-btn>
                        <v-btn tile icon class="mx-2" outlined @click="tipo = false" :disabled="!tipo">
                            <v-icon dark>mdi-view-agenda</v-icon>
                        </v-btn>
                        <v-spacer></v-spacer>
                    </v-toolbar>

                    <v-row justify="center" v-if="tipo">
                        <v-card 
                            :width="180"
                            :height="220"  
                            v-for="(empresa,i) in empresas" 
                            :key="i"
                            :elevation="0" @click="push(empresa)"
                            class="pa-5"
                        >
                            <v-card elevation="0" class="pa-5">
                                <v-row justify="center">
                                    <v-img 
                                        contain 
                                        :width="100"
                                        :height="100" 
                                        :src="image+empresa.imagen" 
                                    /> 
                                </v-row>
                            </v-card>    
                            <div class="mt-2 px-5 caption font-weight-black">{{empresa.nombre_comercial}}</div>
                        </v-card>
                    </v-row>

                    <v-row justify="center" v-else>
                        <v-card 
                            :width="300"
                            :height="250"  
                            v-for="(empresa,i) in empresas" 
                            :key="i"
                            :elevation="0" @click="push(empresa)"
                            class="pa-5"
                        >
                            <v-card elevation="0" class="pa-5">
                                <v-row justify="center">
                                    <v-img 
                                        contain 
                                        :width="200"
                                        :height="150" 
                                        :src="image+empresa.imagen" 
                                    /> 
                                </v-row>
                            </v-card>    
                            <div class="mt-2 px-5 subtitle-1 font-weight-black">{{empresa.nombre_comercial}}</div>
                        </v-card>
                    </v-row>

                    <v-row justify="center" class="my-5">
                        <v-btn 
                            color="#232323" tile 
                            dark
                            :loading="loading2"
                            @click="getEmpresas()"
                            :disabled="total == empresas.length ? true:false"
                        >
                            Ver más
                        </v-btn>
                    </v-row>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script>
import LoaderRect from '@/components/loaders/LoaderRect';
import Empresa from '@/services/Empresa';
import variables from '@/services/variables_globales';
import router from '@/router';

    export default {
        components:{
            LoaderRect
        },
        data() {
            return {
                empresas:[],
                loading:true,
                loading2:false,
                after:0,
                total:0,
                tipo:true,
                ...variables
            }
        },
        head:{
            title(){
                return {
                    inner:'Hoyprovoca',
                    separator:'|',
                    complement: 'Aliados'
                }
            }
        },
        mounted() {
            this.getEmpresas();
        },
        methods:{
            push(empresa){
                window.localStorage.setItem('aliado',empresa.id);
                let nombre = empresa.nombre_comercial.toLowerCase(); 
                router.push({name:'aliadoDetalle', params:{text:nombre}});
            },
            getEmpresas(){
                this.loading2 = true;
                Empresa().get(`/?limit=20&offset=${this.after}`).then((response) => {
                    response.data.data.filter(a => this.empresas.push(a));
                    this.after +=20;
                    this.total = response.data.totalCount;
                    this.loading = false;
                    this.loading2 = false;
                }).catch(e => {
                    console.log(e);
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .margen{
        margin-top:200px;
    }
    .margen-top{
        margin-top:75px;
    }
    .margen-movil{
        margin-top:100px;
    }
    .shadow{
        box-shadow: 0px 6px 5px -4px rgba(35,35,35,0.4);
    }
</style>