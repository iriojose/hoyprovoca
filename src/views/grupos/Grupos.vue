<template>
    <div>
        <div v-if="error">
            <AppBar />
            <div :class="$vuetify.breakpoint.smAndDown ? 'text-center margen':'text-center mt-10'">
                <strong class="grey--text">No se encontraron resultados...</strong>
                <v-row justify="center" align="center">
                    <v-col cols="12" md="6">
                        <v-img src="@/assets/nodata.svg" height="500" contain />
                    </v-col>
                </v-row>
            </div>
            <Footer />
        </div>
        <div v-else>
            <AppBar />
            <GruposData :subgrupos="subgrupos" :conceptos="conceptos"/>
            <Footer />
        </div>
    </div>
</template>

<script>
//componentes
import AppBar from "@/components/navbar/AppBar";
import Footer from "@/components/footer/Footer";
import GruposData  from '@/components/vistaGrupos/GruposData'
//services
import Grupos from '@/services/Grupos';
import SubGrupos from '@/services/SubGrupos';
import {mapActions} from 'vuex';

    export default {
        components:{
            AppBar,
            Footer,
            GruposData,
        },
        data(){
            return{
                error:false,
                id:'',
                subgrupos:[],
                conceptos:[]
            }
        },
        mounted(){//al montarse revisas la ruta
            if(this.$route.params.id){
                this.id=this.$route.params.id;
                this.getGruposSubGrupos(this.id);
            }else{
                this.error=true;
            }
        },
        watch:{//cuando la ruta se cambie se vuelve a buscar
            '$route'(val){
               if(val.params.id){
                    this.id=val.params.id;
                    this.getGruposSubGrupos(this.id); 
                    this.error=false;//en caso de devolverse por algun error no devolvera 404 nuevamente seguira el 404
                }else{
                    this.error=true;
                }
            }
        },
        methods: {
            async getGruposSubGrupos(id){//trae los subgrupos del grupo buscado (sale en la ruta id,nombre)
                this.conceptos=[]; //cuando se ejecute otra vez no debe quedar ninguno del anterior

                await Grupos().get(`/${id}/subgrupos/`).then((response) => {
                    this.subgrupos = response.data.data;
                    for (let i=0; i < this.subgrupos.length; i++){
                       this.getSubgruposConceptos(this.subgrupos[i].id);
                    }
                }).catch(e => {
                    this.error=true;
                    console.log(e);
                });
            },

            async getSubgruposConceptos(id){//trae los conceptos del subgrupo
                await SubGrupos().get(`/${id}/conceptos`).then((response) => {
                    this.conceptos.push(response.data.data);
                }).catch(e => {
                    this.error=true;
                    console.log(e);
                });
            }
        },

    }
</script>

<style lang="css" scope>
    .margen{
        margin-top: 80px;
    }
</style>