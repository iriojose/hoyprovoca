<template>
    <error404 v-if="error" />
    <div v-else>
        <AppBar/>
        <SubTipos :class="$vuetify.breakpoint.smAndDown ? 'mt-12':null"/>
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
        mounted(){
            if(this.$route.params.id){
                this.id=this.$route.params.id;
                this.getGruposSubGrupos(this.id);
            }else{
                this.error=true;
            }
        },

        updated() {
            if(this.$route.params.id){
                this.id=this.$route.params.id;
                this.getGruposSubGrupos(this.id);
            }else{
                this.error=true;
            }
        },

        methods: {
            getGruposSubGrupos(id){//trae los subgrupos del grupo principal
                Grupos().get(`/${id}/subgrupos/`).then((response) => {
                    this.subgrupos = response.data.data;
                    for (let i=0; i < this.subgrupos.length; i++){
                        this.subgrupos[i].conceptos = this.getSubgruposConceptos(this.subgrupos[i].id);
                    }
                    console.log(this.subgrupos);
                }).catch(e => {
                    this.error=true;
                    console.log(e);
                });
            },

            getSubgruposConceptos(id){//trae los conceptos del subgrupo
                Grupos().get(`/${id}/conceptos`).then((response) => {
                    return response.data.data;
                }).catch(e => {
                    this.error=true;
                    console.log(e);
                });
            }
        },


    }
</script>