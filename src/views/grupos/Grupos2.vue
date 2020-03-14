<template>
    <div>
        <AppBar />

        <div :class="$vuetify.breakpoint.smAndDown ? 'text-center mt-12':'my-10 text-center headline font-weight-black'">
            Todas las categorias
        </div>

        <v-card width="100%" height="500" v-if="loading" color="#eee" elevation="0"> 
            <v-row justify="center" align="center" class="fill-height">
                <v-progress-circular size="100" color="#005598" indeterminate></v-progress-circular>
            </v-row>
        </v-card>

        <v-row v-else justify="center" align="center" :class="$vuetify.breakpoint.smAndDown ? 'fill-height mx-12 mt-12':'fill-height'">
            <v-col cols="12" md="8" sm="10">
                <v-row justify="center" align="center" class="fill-height">
                    <v-col cols="12" md="3" sm="6" v-for="grupo in grupos" :key="grupo.id">
                        <v-hover v-slot:default="{hover}">
                            <v-card width="100%" height="150" :elevation="hover ? 10:3" @click="push(grupo)">
                                <v-img contain width="100%" height="150" :src="ruta+grupo.imagen" :gradient="hover ? 'to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)':null">
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
        </v-row>

        <Footer />
    </div>
</template>

<script>
//componentes
import AppBar from "@/components/navbar/AppBar";
import Footer from "@/components/footer/Footer";
import Grupos from '@/services/Grupos';
import url from '@/services/ruta';
import router from '@/router';

    export default {
        components:{
            AppBar,
            Footer,
        },
        data() {
            return {
                ruta:null,
                grupos:[],
                loading:true,
            }
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
        mounted() {
            this.ruta = url;
            this.getGrupos();
        },
        methods: {
            push(item){
                var re = / /gi; 
                const nombre = item.nombre.replace(re,'-');
                router.push({name:'gruposDetalle', params:{text:nombre,id:item.id}});
            },
            getGrupos(){
                Grupos().get("/").then((response) => {
                    console.log(response);
                    this.grupos = response.data.data;
                    this.loading=false;
                }).catch(e => {
                    console.log(e);
                });
            }
        },
    }
</script>