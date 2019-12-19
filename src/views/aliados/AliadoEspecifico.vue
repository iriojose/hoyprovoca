<template>
    <!--en caso de no encontrar la empresa -->
    <n404 v-if="error"/>
    
    <!--se muestran los resultados -->
    <div v-else>
        <AppBar />
        <v-row :class="$vuetify.breakpoint.smAndDown ? 'mx-5 mt-12':'mx-5'">
            <v-col cols="12" md="3" lg="3" sm="12">
                <CategoriasConceptos :grupos="grupos" />
            </v-col>
            <v-col cols="12" md="9" lg="9" sm="12">
                <Conceptos  />
            </v-col>
        </v-row>
        <Footer />
    </div>
</template>

<script>
//components
import CategoriasConceptos from '@/components/vistaAliados/CategoriasConceptos';
import Conceptos from '@/components/vistaAliados/Conceptos';
import AppBar from '@/components/navbar/AppBar';
import Footer from '@/components/footer/Footer';
//services
import Empresa from '@/services/Empresa';
//NOT FOUND 
import n404 from '@/views/NotFound';

    export default {
        components:{
            CategoriasConceptos,
            Conceptos,
            AppBar,
            Footer,
            n404
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
                    this.error=false;//en caso de devolverse por algun error no devolvera 404 nuevamente seguira el 404
                }else{
                    this.error=true;
                }
            }
        },
        methods:{
            //antes de debuguear este codigo entienda que el asincronismo de vue es raro
            //puse los metodos de los servicios uno dentro del otro por que si no a la 
            //hora de filtrar los datos eran undefined

            getEmpresa(id){//trae los datos de la empresa
                Empresa().get(`/${id}`).then((response)=> {
                    this.empresa = response.data.data[0];

                    this.getEmpresaGrupos(this.id);//grupos
                    
                }).catch(e => {
                    this.error=true;
                    console.log(e);
                });
            },


            getEmpresaGrupos(id){//trae los grupos de la empresa
                Empresa().get(`/${id}/grupos`).then((response) => {
                    this.grupos = response.data.response.data;

                    this.getEmpresaSubGrupos(this.id);//subgrupos

                }).catch(e => {
                    console.log(e);
                    this.error=true;
                })
            },

            getEmpresaSubGrupos(id){//trae los subgrupos de la empresa
                Empresa().get(`/${id}/subgrupos`).then((response) => {
                    this.subgrupos = response.data.response.data;

                    this.getEmpresaConceptos(this.id);//conceptos

                }).catch(e => {
                    console.log(e);
                    this.error=true;
                })
            },

            getEmpresaConceptos(id){//trae los conceptos de la empresa
                Empresa().get(`/${id}/conceptos`).then((response) => {
                    this.conceptos = response.data.response.data;

                    this.filter();//filtra todo

                }).catch(e => {
                    console.log(e);
                    this.error=true;
                })
            }, 

            filter(){//pone todo en un super arreglo que tiene grupos - subgrupos - conceptos de esa empresa
                for(let i=0 ; i < this.subgrupos.length; i++){//filtra conceptos de subgrupos
                    this.subgrupos[i].conceptos= this.conceptos.filter(concepto => concepto.subgrupos_id == this.subgrupos[i].id);
                }

                for(let i=0 ; i < this.grupos.length; i++){//filtra subgrupos de grupos
                    this.grupos[i].subgrupos = this.subgrupos.filter(subgrupo => subgrupo.grupos_id == this.grupos[i].id);
                }
                console.log(this.grupos);
            }
        }
    }
</script>
