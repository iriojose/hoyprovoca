<template>
    <div>
        <v-card elevation="0" color="#fff" width="100%" height="100%" v-if="loading">
            <v-card-text>
                <v-row justify="center" class="fill-height" align="center">
                    <v-img width="500" height="500" contain :src="require('@/assets/loader.gif')"></v-img>
                </v-row>
            </v-card-text>
        </v-card>

        <v-card elevation="0" color="#fff" width="100%" height="100%" v-else>
            <v-card-text v-if="empresas">
                <div class="headline font-weight-black text-center mt-8">Todas los aliados</div>
                <v-row justify="center">
                    <v-col cols="12" sm="12" md="9">
                        <v-toolbar color="#fff" elevation="0" width="100%" class="pb-4 px-5" v-if="$vuetify.breakpoint.smAndDown">
                            <v-btn tile icon class="mx-2" outlined @click="tipo = true" :disabled="tipo">
                                <v-icon dark>mdi-view-grid</v-icon>
                            </v-btn>
                            <v-btn tile icon class="mx-2" outlined @click="tipo = false" :disabled="!tipo">
                                <v-icon dark>mdi-view-agenda</v-icon>
                            </v-btn>
                            <v-spacer></v-spacer>
                        </v-toolbar>

                        <v-row justify="center">
                            <v-card 
                                :width="tipo ? 180:250" :height="tipo ? 220:250" v-for="(empresa,i) in empresas" 
                                :key="i" :elevation="0" @click="push(empresa)" class="scale mb-5"
                            >
                                <v-card elevation="0" class="pa-5">
                                    <v-row justify="center">
                                        <v-img contain :width="tipo ? 100:200" :height="tipo? 100:200" :src="image+empresa.imagen" /> 
                                    </v-row>
                                </v-card>    
                                <div class="px-5 text-center caption font-weight-black">{{empresa.nombre_comercial}}</div>
                            </v-card>
                        </v-row>
                    </v-col>
                </v-row>
            </v-card-text>

            <v-card-text v-else>
                <div class="text-center font-weight-black headline mt-8">No se encontraron resultados.</div>
                <v-row justify="center">
                    <v-img width="500" height="500" contain :src="require('@/assets/cancel.svg')"></v-img>
                </v-row>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
import Empresa from '@/services/Empresa';
import variables from '@/services/variables_globales';
import router from '@/router';

    export default {
        data() {
            return {
                tipo:false,
                loading:true,
                loading2:false,
                after:0,
                total:0,
                empresas:[],
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
            let cache = JSON.parse(window.localStorage.getItem("cache"));

            if(cache && cache.path == this.$route.path){
                if(cache.empresas) {
                    this.empresas = cache.empresas;
                    this.after = cache.after;
                    this.total = cache.total;
                    this.loading = false;
                }else this.getEmpresas();
            }else this.getEmpresas();
        },
        methods:{
            push(empresa){
                window.localStorage.setItem('aliado',JSON.stringify(empresa));
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
                    window.localStorage.setItem("cache",JSON.stringify({total:this.total,after:this.after,empresas:this.empresas,path:this.$route.path}));
                }).catch(e => {
                    console.log(e);
                    this.loading = false;
                    this.loading2 = false;
                });
            }
        }
    }
</script>

<style lang="scss" scope>
    .scale{
        transition:all 0.3s;
    }
    .scale:hover{
        transition:all 0.3s;
        transform:scale(1.1);
    }
</style>