<template>
    <div>
        <div v-if="error">
            <AppBar />
            <div class="text-center my-10">
                <v-row justify="center" align="center">
                    <v-col cols="12" md="6">
                        <v-img src="@/assets/nodata.svg" height="500" contain />
                    </v-col>
                </v-row>
                <strong class="grey--text mb-12 headline font-weight-black">Catálogo no Disponible...</strong>
            </div>
            <Footer />
        </div>
        <div v-else>
            <AppBar />
            <EmpresaData :grupos="grupos" :empresa="empresa" :subgrupos="subgrupos" :conceptos="conceptos"/>
            <Footer />
            <ValidacionConcepto />
        </div>
    </div>
</template>

<script>
//components
import EmpresaData from '@/components/vistaAliados/EmpresaData';
import AppBar from '@/components/navbar/AppBar';
import Footer from '@/components/footer/Footer';
import ValidacionConcepto from '@/components/dialogs/ValidacionConcepto';
//services
import Empresa from '@/services/Empresa';
import { mapState } from 'vuex';

    export default {
        components:{
            EmpresaData,
            AppBar,
            Footer,
            ValidacionConcepto
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
        head:{
            title(){
                return {
                    inner:'HoyProvoca',
                    separator:'|',
                    complement: 'Aliado'
                }
            }
        },
        computed:{
            ...mapState(['conceptosId'])
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
            },
            conceptosId(){
                this.addOrder();
            }
        },
        methods:{
            //las llamadas a la api se deben hacer continuas (una despues de otra)
            //no funciona el async await ***
            
            getEmpresa(id){//trae los datos de la empresa
                Empresa().get(`/${id}`).then((response)=> {
                    this.empresa = response.data.data;
                    this.getEmpresaGrupos(this.id);//grupos 
                }).catch(e => {
                    this.error=true;
                    console.log(e);
                });
            },
            getEmpresaGrupos(id){
                Empresa().get(`/${id}/grupos`).then((response) => {
                    this.grupos = response.data.data;
                    this.getEmpresaSubgrupos();
                }).catch(e => {
                    this.error=true;
                    console.log(e);
                });
            },
            getEmpresaSubgrupos(){
                Empresa().get(`/${this.id}/subgrupos`).then((response) => {
                    this.subgrupos=response.data.data;
                    this.getEmpresaConceptos();
                }).catch(e => {
                    this.error=true;
                    console.log(e);
                });
            },

            getEmpresaConceptos(){
                Empresa().get(`/${this.id}/conceptos`).then((response)  => {
                    this.conceptos = response.data.data;
                }).catch(e => {
                    this.error=true;
                    console.log(e);
                });
            },
            addOrder(){
                this.conceptos.filter(a => this.conceptosId.filter(b => a.id == b ? a.gregado=true:a.gregado=false));
                 
                //old code
                /*for (let i = 0; i < this.conceptos.length; i++) {
                    for (let e = 0; e < this.conceptosId.length; e++) {
                        if(this.conceptos[i].id == this.conceptosId[e]){
                            this.conceptos[i].agregado=true;
                            break;
                        }else{
                            this.conceptos[i].agregado=false;
                        }
                    }
                }*/
            }
        }
    }
</script>
