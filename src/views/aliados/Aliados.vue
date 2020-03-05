<template>
    <div>
        <AppBar />

         <div :class="$vuetify.breakpoint.smAndDown ? 'text-center mt-12':'my-10 text-center headline font-weight-black'">
            Todas las Empresas
        </div>
    
        <v-card width="100%" height="500" v-if="loading" color="#eee" elevation="0"> 
            <v-row justify="center" align="center" class="fill-height">
                <v-progress-circular size="100" color="#005598" indeterminate></v-progress-circular>
            </v-row>
        </v-card>

        <v-row v-else justify="center" align="center" :class="$vuetify.breakpoint.smAndDown ? 'fill-height mx-12 mt-12':'fill-height'">
            <v-col cols="12" md="8" sm="10">
                <v-row justify="center" align="center" class="fill-height">
                    <v-col cols="12" md="3" sm="6" v-for="empresa in empresas" :key="empresa.id">
                        <v-hover v-slot:default="{hover}">
                            <v-card width="100%" height="150" :elevation="hover ? 10:3" @click="push(empresa)">
                                <v-img contain width="100%" height="150" :src="ruta+empresa.logo" :gradient="hover ? 'to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)':null">
                                    <v-row justify="center" align="center" v-if="hover" class="fill-height">
                                        <v-slide-x-transition>
                                            <div class="headline white--text font-weight-black">{{empresa.nombre_comercial}}</div>
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
import AppBar from "@/components/navbar/AppBar";
import Footer from "@/components/footer/Footer";
import Empresa from '@/services/Empresa';
import router from '@/router';
import url from '@/services/ruta';

    export default {
        components:{
            AppBar,
            Footer
        },
        data() {
            return {
                empresas:[],
                loading:true,
                ruta:null
            }
        },
        head:{
            title(){
                return {
                    inner:'HoyProvoca',
                    separator:'|',
                    complement: 'Aliados'
                }
            }
        },
        mounted() {
            this.ruta = url;
            this.getEmpresas();
        },
        methods:{
            push(item){
                var re = / /gi; 
                const nombre = item.nombre_comercial.replace(re,'-');
                router.push({name:'aliadoEspecifico', params:{text:nombre,id:item.id}});
            },
            getEmpresas(){
                Empresa().get("/").then((response) => {
                    this.empresas = response.data.data;
                    this.loading = false;
                }).catch(e => {
                    console.log(e);
                });
            }
        }
    }
</script>
