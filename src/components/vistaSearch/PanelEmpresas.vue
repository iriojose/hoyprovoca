<template>
    <v-card width="100%" :height="$vuetify.breakpoint.smAndDown ? 150:200" elevation="2">
        <v-toolbar elevation="0" width="100%">
            <v-toolbar-title class="font-weight-black headline">
                Resultados en:
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn 
                :fab="$vuetify.breakpoint.smAndDown"
                :tile="!$vuetify.breakpoint.smAndDown" 
                color="#232323" to="/aliados" 
                class="text-capitalize" dark
            >
                <div v-if="!$vuetify.breakpoint.smAndDown">Ver todas</div>
                <v-icon 
                    :class="$vuetify.breakpoint.smAndDown ? null:'mx-2'" 
                    dark
                >
                    mdi-chevron-right
                </v-icon>
            </v-btn>
        </v-toolbar>

        <v-slide-group show-arrows class="my-5">
            <v-slide-item v-for="(empresa,i) in empresas" :key="i" class="ma-3">
                <v-btn fab @click="push(empresa)" elevation="0">
                    <v-avatar size="60" class="elevation-5">
                        <v-img :src="image+empresa.imagen"></v-img>
                    </v-avatar> 
                </v-btn> 
            </v-slide-item>
        </v-slide-group>
    </v-card>
</template>

<script>
import variables from '@/services/variables_globales';
import router from '@/router';

    export default {
        props:{
            empresas:{
                type:Array,
                default:()=> ([])
            }
        },
        data() {
            return {
                ...variables
            }
        }, 
        methods:{
            push(empresa){
                window.localStorage.setItem('aliado',empresa.id);
                let nombre = empresa.nombre_comercial.toLowerCase(); 
                router.push({name:'aliadoDetalle', params:{text:nombre}});
            },
        }
    }
</script>

<style lang="scss" scoped>

</style>