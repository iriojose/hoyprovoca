<template>
    <n404 v-if="error" />
    <div v-else>
        <AppBar />
        <GruposData :subgrupos="subgrupos" :conceptos="conceptos"/>
        <Footer />
    </div>
</template>

<script>
//componentes
import AppBar from "@/components/navbar/AppBar";
import Footer from "@/components/footer/Footer";
import GruposData  from '@/components/vistaGrupos/GruposData'
//NOT FOUND 
import n404 from '@/views/NotFound';
//services
import Grupos from '@/services/Grupos';
import SubGrupos from '@/services/SubGrupos';
import {mapActions} from 'vuex';

    export default {
        components:{
            AppBar,
            Footer,
            GruposData,
            n404
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
                    }//habia utilizado return pero devolvia undefined , lo deje asi 
                    console.log(this.grupos);
                    console.log(this.conceptos);
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
