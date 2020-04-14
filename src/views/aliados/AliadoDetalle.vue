<template>
    <div>
        <v-row :class="$vuetify.breakpoint.smAndDown ? 'margen-movil mx-3':'margen-top mx-10'">
            <v-col cols="12" sm="12" md="3" >
                <PanelCategorias :grupos="grupos" :empresa="empresa" />
            </v-col>
            
            <v-col sm="12" md="9" cols="12" v-if="$route.name=='aliadoDetalle' && loading">
                <LoaderRect />
            </v-col>
        
            <v-col v-if="$route.name=='aliadoDetalle' && !loading" sm="12" md="9" cols="12">
                <DataAliados :grupos="grupos" :conceptos="conceptos" />
            </v-col>

            <v-col 
                v-if="$route.name=='aliadoGrupo'" 
                cols="12" sm="12" md="9" 
            >
                <router-view/>
            </v-col>
        </v-row>
        
        <ModalSesion />
        <Footer class="margen" />
    </div>
</template>

<script>
import Footer from "@/components/footer/Footer";
import Empresa from '@/services/Empresa';
import Grupos from '@/services/Grupos';
import LoaderRect from '@/components/loaders/LoaderRect';
import PanelCategorias from '@/components/vistaAliados/PanelCategorias';
import DataAliados from '@/components/vistaAliados/DataAliados';
import ModalSesion from '@/components/dialogs/ModalSesion';
import {mapState} from 'vuex';

    export default {
        components:{
            Footer,
            LoaderRect,
            ModalSesion,
            PanelCategorias,
            DataAliados
        },
        computed: {
            ...mapState(['agregados'])
        },
        data() {
            return {
                intersect:false,
                loading:true,
                error:false,
                bandera:false,
                conceptos:[
                    {id:1,id:2,id:3,id:4,id:5,id:6,id:7,id:8,id:9,id:10}
                ],
                grupos:[],
                empresa:{}
            }
        },
        mounted() {
            if(this.$route.params.text){
                this.getEmpresa(this.$route.params.text);
            }else{
                this.loading = false;
                this.error=true;
            }
        },
        watch: {
            agregados(){
                this.bandera ?  this.revision():this.bandera=true;
            },
            '$route'(val){
               if(val.params.text){
                    this.loading = true;
                    this.getEmpresa(val.params.text); 
                    this.error=false;
                }else{
                    this.error=true;
                }
            },
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
        methods: {
            getEmpresa(text){
                Empresa().get(`/?nombre_comercial=${text}`).then((response) => {
                    this.empresa = response.data.data[0];
                    this.getGrupos(this.empresa.id);
                }).catch(e => {
                    console.log(e);
                });
            },
            getGrupos(id){
                Empresa().get(`/${id}/grupos`).then((response) => {
                    this.grupos = response.data.data;
                    if(!this.$route.params.text2){
                        this.grupos.filter((a,i) => i > 9 ? null:this.getConceptos(a.id,i));
                    }else{
                        this.loading = false;
                    }
                }).catch(e => {
                    console.log(e);
                });
            },
            getConceptos(id,i){
                Grupos().get(`/${id}/conceptos/?limit=10`).then((response) => {
                    response.data.data.filter(a => a.agregado=false);
                    response.data.data.filter(a => this.agregados.filter(b => a.id == b ? a.agregado=true:null));
                    this.conceptos[i] = response.data.data;
                    i <= 9 ? this.loading = false:null;
                }).catch(e => {
                    console.log(e);
                });
            },
            revision(){
                this.conceptos.filter(a => a.filter(b => b.agregado=false));
                this.conceptos.filter(a => a.filter(b => this.agregados.filter(c => b.id == c ? b.agregado=true:null)));
            }
        },
    }
</script>

<style lang="scss" scoped>
    .margen{
        margin-top:200px;
    }
    .margen-top{
        margin-top:75px;
    }
    .margen-movil{
        margin-top:120px;
    }
    .shadow{
        box-shadow: 0px 6px 5px -4px rgba(35,35,35,0.4);
    }
    .fix{
        position:fixed;
        width: 20%;
    }
</style>