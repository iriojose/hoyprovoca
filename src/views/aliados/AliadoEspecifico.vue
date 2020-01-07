<template>
    <div>
        <div v-if="error">
            <AppBar />
            <div class="text-center mt-10">
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
            <EmpresaData :grupos="grupos" :empresa="empresa" :subgrupos="subgrupos" :conceptos="conceptos"/>
            <Footer />
        </div>
    </div>
</template>

<script>
//components
import EmpresaData from '@/components/vistaAliados/EmpresaData';
import AppBar from '@/components/navbar/AppBar';
import Footer from '@/components/footer/Footer';
//services
import Empresa from '@/services/Empresa';

    export default {
        components:{
            EmpresaData,
            AppBar,
            Footer,
        },
        data() {
            return {
                id:'',
                error:false,
                empresa:{},
                grupos:[],
                subgrupos:[],
                conceptos:[],
            }
        },
        mounted(){
            if(this.$route.params.id){
                this.id=this.$route.params.id;
                this.getEmpresa(this.id);
            }else{
                this.error=true;
            }
        },
        watch:{//cuando la ruta se cambie vuelve a ejecutar
            '$route'(val){
               if(val.params.id){
                    this.id=val.params.id;
                    this.getEmpresa(this.id); 
                    this.error=false;//en caso de devolverse por algun error no devolvera 404 nuevamente seguira normalmente
                }else{
                    this.error=true;
                }
            }
        },
        methods:{
            //antes de debuguear este codigo entienda que el asincronismo de vue es raro
            //puse los metodos de los servicios uno dentro del otro por que si no a la 
            //hora de filtrar los datos eran undefined

            async getEmpresa(id){//trae los datos de la empresa
                await Empresa().get(`/${id}`).then((response)=> {
                    this.empresa = response.data.data[0];

                    this.getEmpresaGrupos(this.id);//grupos
                    
                }).catch(e => {
                    this.error=true;
                    console.log(e);
                });
            },

            getEmpresaGrupos(){
                Empresa().get(`/${this.id}/grupos`).then((response) => {
                    this.grupos = response.data.response.data;

                    this.getEmpresaSubgrupos();
                }).catch(e => {
                    this.error=true;
                    console.log(e);
                });
            },

            getEmpresaSubgrupos(){
                Empresa().get(`/${this.id}/subgrupos`).then((response) => {
                    this.subgrupos=response.data.response.data;

                    this.getEmpresaConceptos();
                }).catch(e => {
                    this.error=true;
                    console.log(e);
                });
            },

            getEmpresaConceptos(){
                Empresa().get(`/${this.id}/conceptos`).then((response)  => {
                    this.conceptos = response.data.response.data;
                }).catch(e => {
                    this.error=true;
                    console.log(e);
                });
            },
        }
    }
</script>
