<template>
    <div>
        <v-toolbar color="#f7f7f7" elevation="0" width="100%" class="mt-12">
            <v-toolbar-title class="font-weight-black headline">
                {{title}}
            </v-toolbar-title>
            <v-spacer></v-spacer>
        </v-toolbar>

        <v-slide-group :show-arrows="$vuetify.breakpoint.smAndDown ? false:true" :class="$vuetify.breakpoint.smAndDown ? 'my-4':'my-4 mx-10'">
            <v-slide-item v-for="empresa in  empresas" :key="empresa.id" class="mx-2 mb-8">
                <v-hover v-slot:default="{hover}">
                    <v-card 
                        :width="220"
                        :height="220"  
                        :elevation="hover ? 3:3" @click="push(empresa)"
                        class="pa-5"
                    >
                        <v-card elevation="0" class="pa-5">
                            <v-row justify="center">
                                <v-img 
                                    contain 
                                    :width="100"
                                    :height="100" 
                                    :src="image+empresa.imagen" 
                                /> 
                            </v-row>
                        </v-card>    
                        <div class="mt-2 px-5 body-2 font-weight-black">{{empresa.nombre_comercial}}</div>
                    </v-card>
                </v-hover>
            </v-slide-item>
            <v-slide-item>
                <v-card 
                    :width="220"
                    :height="220"  
                    :elevation="0"
                    color="#f7f7f7"
                    to="/aliados"
                    class="pa-5"
                >
                    <v-row justify="center" align="center" class="fill-height">
                        <v-btn 
                            tile color="#232323" to="/aliados" 
                            class="text-capitalize" dark
                        >
                            <div>Ver todas</div>
                            <v-icon 
                                class="mx-2" 
                                dark
                            >
                                mdi-chevron-right
                            </v-icon>
                        </v-btn>
                    </v-row>
                </v-card>
            </v-slide-item>
        </v-slide-group>
    </div>
</template>

<script>
import variables from '@/services/variables_globales';
import router from '@/router';

    export default {
        props:{
            empresas:{
                Type:Array,
                default:() => ([])
            },
            title:{
                Type:String,
                default:''
            }
        },
        data() {
            return {
                ...variables
            }
        },
        methods: {
            push(empresa){
                window.localStorage.setItem('aliado',empresa.id);
                let nombre = empresa.nombre_comercial.toLowerCase(); 
                router.push({name:'aliadoDetalle', params:{text:nombre}});
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>