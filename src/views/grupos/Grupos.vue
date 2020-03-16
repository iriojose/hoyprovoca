<template>
    <div>
        <AppBar />
        
        <v-row justify="center" align="center" class="fill-height" v-if="loading">
            <v-img contain width="500" height="500" :src="require('@/assets/loading.gif')"></v-img>
        </v-row >

        <v-card :class="$vuetify.breakpoint.smAndDown ? 'mt-12 ma-5 pa-4':' ma-12 mt-4 pa-4'" elevation="0">
            <div class="text-center headline font-weight-black'">
                Todas las Categorías
            </div>

            <v-slide-x-transition>
                <v-row justify="center" align="center" :class="$vuetify.breakpoint.smAndDown ? 'fill-height mx-12 mt-12 py-5':'fill-height py-5'" v-show="!loading">
                    <v-col cols="12" md="8" sm="10">
                        <v-row justify="center" align="center" class="fill-height">
                            <v-col cols="12" md="3" sm="6" v-for="grupo in grupos" :key="grupo.id">
                                <v-hover v-slot:default="{hover}">
                                    <v-card width="100%" height="150" :elevation="hover ? 10:3" @click="push(grupo)">
                                        <v-img contain width="100%" height="150" :src="ruta+grupo.imagen" :gradient="hover ? 'to top right, rgba(100,115,101,.1), rgba(55,30,72,.4)':null">
                                            <v-row justify="center" align="center" v-if="hover" class="fill-height">
                                                <v-slide-x-transition>
                                                    <div class="headline white--text font-weight-black">{{grupo.nombre}}</div>
                                                </v-slide-x-transition>
                                            </v-row>    
                                        </v-img>
                                    </v-card>
                                </v-hover>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="12" md="12" sm="12" v-if="total >= 50">
                        <v-row justify="center" align="center" class="fill-height">
                            <v-btn text depressed class="text-capitalize">Ver más</v-btn>
                        </v-row>
                    </v-col>
                </v-row>
            </v-slide-x-transition>
        </v-card>
        <Footer />
    </div>
</template>

<script>
import AppBar from "@/components/navbar/AppBar";
import Footer from "@/components/footer/Footer";
import Grupos from '@/services/Grupos';
import url from '@/services/ruta';
import router from '@/router';

    export default {
        components:{
            AppBar,Footer
        },
        data() {
            return {
                ruta:null,
                grupos:[],
                total:0,
                loading:true,
            }
        },
        mounted() {
            this.ruta = url;
            this.getGrupos();
        },
        head:{
            title(){
                return {
                    inner:'HoyProvoca',
                    separator:'|',
                    complement: 'Categorías'
                }
            }
        },
        methods: {
            push(item){
                var re = / /gi; 
                const nombre = item.nombre.replace(re,'-');
                router.push({name:'gruposDetalle', params:{text:nombre,id:item.id}});
            },
            getGrupos(){
                Grupos().get("/").then((response) => {
                    this.grupos = response.data.data;
                    this.total = this.grupos.length;
                    this.loading=false;
                }).catch(e => {
                    console.log(e);
                });
            },
        },
    }
</script>

<style lang="scss" scoped>

</style>