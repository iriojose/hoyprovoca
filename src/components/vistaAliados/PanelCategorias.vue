<template>
    <div class="sombra">
        <v-card elevation="0" width="100%" class="px-10">    
            <v-card-title class="title font-weight-black" @click="push2(empresa)">
                <v-row justify="center" align="center">
                    <v-avatar size="80" tile>
                        <v-img :src="image+empresa.imagen"></v-img>
                    </v-avatar>
                    {{empresa.nombre_comercial}}
                </v-row>
            </v-card-title>

            <v-divider></v-divider>

            <v-list dense v-if="!$vuetify.breakpoint.smAndDown">
                <v-list-item 
                    v-for="(grupo,i) in grupos" :key="i" @click="push(grupo)" 
                    :class="$route.params.text2 == grupo.nombre ? 'color white--text sombra':null"
                >
                    <v-list-item-title 
                        :class="$route.params.text2 == grupo.nombre ? 'subtitle-2 white--text font-weight-black':'subtitle-2 font-weight-black'"
                    >
                        {{grupo.nombre}}
                    </v-list-item-title>
                    <v-list-item-icon>
                        <v-icon :dark="$route.params.text2 == grupo.nombre ? true:false">
                            mdi-chevron-right
                        </v-icon>
                    </v-list-item-icon>
                </v-list-item>
            </v-list>

            <v-expansion-panels v-else flat>
                <v-expansion-panel>
                    <v-expansion-panel-header class="subtitle-1 font-weight-black">
                        Categorías
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <v-list dense>
                            <v-list-item 
                                v-for="(grupo,i) in grupos" :key="i" @click="push(grupo)" 
                                :class="$route.params.text2 == grupo.nombre ? 'color white--text sombra':null"
                            >
                                <v-list-item-title 
                                    :class="$route.params.text2 == grupo.nombre ? 'subtitle-2 white--text font-weight-black':'subtitle-2 font-weight-black'"
                                >
                                    {{grupo.nombre}}
                                </v-list-item-title>
                                <v-list-item-icon>
                                    <v-icon :dark="$route.params.text2 == grupo.nombre ? true:false">
                                        mdi-chevron-right 
                                    </v-icon>
                                </v-list-item-icon>
                            </v-list-item>
                        </v-list>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
        </v-card>
    </div>
</template>

<script>
import variables from '@/services/variables_globales';
import router from '@/router';

    export default {
        props:{
            empresa:{
                type:Object,
                default:() => ({})
            },
            grupos:{
                type:Array,
                default:() => ([])
            }
        },
        data() {
            return {
                ...variables
            }
        },
        methods: {
            push(item){
                window.localStorage.setItem('detalle',item.id);
                router.push('/aliados/'+this.empresa.nombre_comercial+'/'+item.nombre);
            },
            push2(item){
                window.localStorage.setItem('aliados',item.id);
                router.push('/aliados/'+this.empresa.nombre_comercial);
            }
        },
    }
</script>

<style lang="css" scope>    
    .color{
        background: #232323;
    }
    .sombra{
        -webkit-box-shadow: 0px 5px 6px -5px rgba(0,0,0,0.75);
        -moz-box-shadow: 0px 5px 6px -5px rgba(0,0,0,0.75);
        box-shadow: 0px 5px 6px -5px rgba(0,0,0,0.75);
    }
</style>