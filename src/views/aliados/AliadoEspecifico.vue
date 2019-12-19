<template>
    <!--en caso de no encontrar la empresa -->
    <n404 v-if="error"/>
    
    <!--se muestran los resultados -->
    <div v-else>
        <AppBar />
        <v-row :class="$vuetify.breakpoint.smAndDown ? 'mx-5 mt-12':'mx-5'">
            <v-col cols="12" md="3" lg="3" sm="12">
                <CategoriasConceptos :grupos="grupos"/>
            </v-col>
            <v-col cols="12" md="9" lg="9" sm="12">
                <Conceptos :conceptos="conceptos" />
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
            Footer
        },
        data() {
            return {
                id:'',
                error:false,
                empresa:{}
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
            GetEmpresa(id){
                Empresa().get(`/${id}`).then((response)=> {
                    this.empresa= response.data.data[0];
                }).catch(e => {
                    this.error=true;
                    console.log(e);
                });
            }
        }
    }
</script>
