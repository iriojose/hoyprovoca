<template>
    <div>
        <v-card v-if="loading" elevation="0" color="#f7f7f7" width="100%" height="500">
            <LoaderRect />
        </v-card>

        <div v-else :class="$vuetify.breakpoint.smAndDown ? 'margen-movil mx-4':'mx-10 px-5 margen-top'">
            <div class="text-center font-weight-bold my-5 display-1">
                Todas las empresas
            </div>
            
            <v-row justify="center">
                <v-card 
                    @click="push(empresa)" 
                    v-for="(empresa,i) in empresas" :key="i" 
                    width="300" height="200" class="mx-2 my-2"
                >
                    <v-img 
                        :src="image+empresa.logo" 
                        contain width="300" height="200" 
                    />
                </v-card>  
            </v-row>

            <v-row justify="center" class="my-5">
                <v-hover v-slot:default="{hover}">
                    <v-btn 
                        color="#232323" 
                        :elevation="hover ? 2:0" 
                        width="120"
                        height="40"
                        class="text-capitalize white--text"
                        @click="getEmpresas()"
                        :disabled="empresas.length == total ? true:false"
                    >
                        Ver más
                    </v-btn>
                </v-hover>
            </v-row>
        </div>  

    </div>
</template>

<script>
import LoaderRect from '@/components/loaders/LoaderRect';
import Empresa from '@/services/Empresa';
import variables from '@/services/variables_globales';
import router from '@/router';

    export default {
        components:{
            LoaderRect
        },
        data() {
            return {
                empresas:[],
                loading:true,
                after:0,
                total:0,
                ...variables
            }
        },
        head:{
            title(){
                return {
                    inner:'Hoyprovoca',
                    separator:'|',
                    complement: 'Aliados'
                }
            }
        },
        mounted() {
            this.getEmpresas();
        },
        methods:{
            push(empresa){
                window.localStorage.setItem('aliado',empresa.id);
                let nombre = empresa.nombre_comercial.toLowerCase(); 
                router.push({name:'aliadoDetalle', params:{text:nombre}});
            },
            getEmpresas(){
                Empresa().get(`/?limit=20&offset=${this.after}`).then((response) => {
                    response.data.data.filter(a => this.empresas.push(a));
                    this.loading = false;
                    this.after +=20;
                    this.total = response.data.totalCount;
                }).catch(e => {
                    console.log(e);
                })
            }
        }
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
</style>