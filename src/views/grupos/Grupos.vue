<template>
    <div>
        <v-card v-if="loading" elevation="0" color="#f7f7f7" width="100%" height="500">
            <LoaderRect />
        </v-card>

        <div v-else :class="$vuetify.breakpoint.smAndDown ? 'margen-movil mx-4':'mx-10 px-5 margen-top'">
            <div class="text-center font-weight-bold my-5 display-1">
                Todos los grupos
            </div>

            <v-row justify="center">
                <v-card 
                    @click="push(grupo)" 
                    v-for="(grupo,i) in grupos" :key="i" 
                    width="300" height="200" class="mx-2 my-2"
                >
                    <v-img 
                        :src="image+grupo.imagen" 
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
                        @click="getGrupos()"
                        :disabled="grupos.length == total ? true:false"
                    >
                        Ver más
                    </v-btn>
                </v-hover>
            </v-row>
        </div>  

        <Footer class="margen" />
    </div>
</template>

<script>
import LoaderRect from '@/components/loaders/LoaderRect';
import Grupos from '@/services/Grupos';
import variables from '@/services/variables_globales';
import Footer from '@/components/footer/Footer';
import router from '@/router';

    export default {
        components:{
            LoaderRect,
            Footer
        },
        data() {
            return {
                loading:true,
                after:0,
                total:0,
                grupos:[],
                ...variables
            }
        },
        mounted() {
            this.getGrupos();
        },
        head:{
            title(){
                return {
                    inner:'Hoyprovoca',
                    separator:'|',
                    complement: 'Categorías'
                }
            }
        },
        methods:{
            push(item){
                window.localStorage.setItem('grupo',item.id);
                let nombre = item.nombretoLowerCase(); 
                router.push({name:'grupoDetalle', params:{text:nombre}});
            },
            getGrupos(){
                Grupos().get(`/?limit=20&offset=${this.after}`).then((response) => {
                    response.data.data.filter(a => this.grupos.push(a));
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