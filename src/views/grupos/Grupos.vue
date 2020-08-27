<template>
    <div>
        <v-container fluid v-if="loading">
            <v-row justify="center" class="fill-height" align="center" style="height:500px;">
                <Loading />
            </v-row>
        </v-container>

        <v-card elevation="0" color="#fff" width="100%" height="100%" v-else>
            <v-card-text v-if="grupos">
                <div class="headline font-weight-black text-center mt-8">Todas las Categorías</div>
                <v-row justify="center">
                    <v-col cols="12" sm="12" md="9">
                        <v-toolbar color="#fff" elevation="0" width="100%" class="pb-4 px-5">
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
                                :width="tipo ? 180:250" :height="tipo ? 220:250" v-for="(grupo,i) in grupos" 
                                :key="i" :elevation="0" @click="push(grupo)" class="scale mb-5"
                            >
                                <v-card elevation="0" class="pa-5">
                                    <v-row justify="center">
                                        <v-img contain :width="tipo ? 100:200" :height="tipo? 100:200" :src="image+grupo.imagen" /> 
                                    </v-row>
                                </v-card>    
                                <div class="px-5 text-center caption font-weight-black">{{grupo.nombre}}</div>
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
import Grupos from '@/services/Grupos';
import variables from '@/services/variables_globales';
import router from '@/router';

    export default {
        components:{
            Loading: () => import('@/components/loaders/Loading')
        },
        data() {
            return {
                tipo:false,
                loading:true,
                loading2:false,
                after:0,
                total:0,
                grupos:[],
                ...variables
            }
        },
        head:{
            title(){
                return {
                    inner:'Hoyprovoca',
                    separator:'|',
                    complement: 'Categorías'
                }
            }
        },
        mounted() {
            if(this.$vuetify.breakpoint.smAndDown) this.tipo = true;
            let cache = JSON.parse(window.localStorage.getItem("cache"));

            if(cache && cache.path == this.$route.path){
                if(cache.grupos) {
                    this.grupos = cache.grupos;
                    this.after = cache.after;
                    this.total = cache.total;
                    this.loading = false;
                }else this.getGrupos();
            }else this.getGrupos();
        },
        methods:{
            push(item){
                window.localStorage.setItem('grupo',JSON.stringify(item));
                let nombre = item.nombre.toLowerCase(); 
                router.push({name:'grupoDetalle', params:{text:nombre}});
            },
            getGrupos(){
                this.loading2 = true;
                Grupos().get(`/?limit=20&offset=${this.after}`).then((response) => {
                    response.data.data.filter(a => this.grupos.push(a));
                    this.after +=20;
                    this.total = response.data.totalCount;
                    this.loading = false;
                    this.loading2 = false;
                    window.localStorage.setItem("cache",JSON.stringify({total:this.total,after:this.after,grupos:this.grupos,path:this.$route.path}));
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