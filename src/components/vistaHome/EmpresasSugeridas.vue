<template>
    <v-card style="height:85vh " class="mt-8" color="transparent" elevation="0" width="100%">
        <v-card-text>
            <div :style="`color:${theme.background.font}`" class="text-center font-weight-black headline mt-12 mb-4">
                {{title}}
            </div>

            <v-row justify="center">
                <v-card 
                    :elevation="1" 
                    class="border mx-2 mb-8 pa-4"
                    :width="$vuetify.breakpoint.smAndDown ? 100:200" 
                    :height="$vuetify.breakpoint.smAndDown ? 100:200" 
                    v-for="(n,i) in 7" :key="i"
                    @click="push(empresas[i])"
                >
                    <v-img 
                        contain 
                        :width="$vuetify.breakpoint.smAndDown ? 100:180" 
                        :height="$vuetify.breakpoint.smAndDown ? 80:150"
                        :src="image+empresas[i].imagen" 
                    /> 
                    <div :style="`color:${theme.background.font}`" class="mt-2 px-2 text-center text-truncate caption text-capitalize font-weight-black">{{empresas[i].nombre_comercial}}</div>
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
            ...mapState(['empresas','theme'])
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