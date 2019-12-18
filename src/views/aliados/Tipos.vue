<template>
    <error404 v-if="error" />
    <div v-else>
        <AppBar/>
        <SubTipos :subgrupos="subgrupos" :class="$vuetify.breakpoint.smAndDown ? 'mt-12':null"/>
        <Footer />
    </div>
</template>

<script>
//componentes
import AppBar from '@/components/navbar/AppBar';
import Footer from '@/components/footer/Footer';
import SubTipos from '@/components/vistaAliados/SubTipos'
import error404 from '@/views/NotFound';
//services
import Grupos from '@/services/Grupos';
import SubGrupos from '@/services/SubGrupos';

    export default {
        components:{
            AppBar,
            Footer,
            SubTipos,
            error404
        },
        data(){
            return{
                error:false,
                id:'',
                subgrupos:[],
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
            getGruposSubGrupos(id){//trae los subgrupos del grupo buscado (sale en la ruta id,nombre)
                Grupos().get(`/${id}/subgrupos/`).then((response) => {
                    this.subgrupos = response.data.data;
                    for (let i=0; i < this.subgrupos.length; i++){
                       this.subgrupos[i].conceptos = this.getSubgruposConceptos(this.subgrupos[i].id,i);
                    }//habia utilizado return pero devolvia undefined , lo deje asi (xd)
                    console.log(this.subgrupos);
                }).catch(e => {
                    this.error=true;
                    console.log(e);
                });
            },

            getSubgruposConceptos(id,i){//trae los conceptos del subgrupo
                SubGrupos().get(`/${id}/conceptos`).then((response) => {
                    this.subgrupos[i].conceptos= response.data.data;
                }).catch(e => {
                    this.error=true;
                    console.log(e);
                });
            }
        },


    }
</script>