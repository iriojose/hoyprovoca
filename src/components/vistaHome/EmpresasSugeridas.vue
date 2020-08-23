<template>
    <v-card  class="mb-8" color="transparent" elevation="0" width="100%">
        <v-card-text>
            <div class="text-center font-weight-black headline mt-12 mb-12" style="color:#262626">
                {{title}}
            </div>

            <v-row justify="center">
                <v-card 
                    :elevation="1" 
                   
                    class="border mx-2 mb-4 pa-4"
                    :width="$vuetify.breakpoint.smAndDown ? 100:200" 
                    :height="$vuetify.breakpoint.smAndDown ? 100:200" 
                    v-for="(empresa,i) in empresas" :key="i"
                    @click="push(empresa)"
                >
                    <v-img 
                        contain 
                        :width="$vuetify.breakpoint.smAndDown ? 100:180" 
                        :height="$vuetify.breakpoint.smAndDown ? 80:150"
                        :src="image+empresa.imagen" 
                    /> 
                    <div class="mt-2 text-center subtitle-2 font-weight-black">{{empresa.nombre_comercial}}</div>
                </v-card>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script>
import variables from '@/services/variables_globales';
import router from '@/router';
import {mapState} from 'vuex';

    export default {
        props:{
            title:{
                Type:String,
                default:''
            }
        },
        data() {
            return {
                ...variables,
            }
        },
        computed: {
            ...mapState(['empresas'])
        },
        methods: {
            push(empresa){
                window.localStorage.setItem('aliado',JSON.stringify(empresa));
                let nombre = empresa.nombre_comercial.toLowerCase(); 
                router.push({name:'aliadoDetalle', params:{text:nombre}});
            },
        },
    }
</script>

<style lang="scss" scoped>
    .border{
        border-radius:30px !important;
    }
</style>