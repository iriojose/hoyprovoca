<template>
    <v-card elevation="0" width="100%" class="mx-2">
        <v-card-title class="px-4 pb-2 caption">
            <v-img contain width="100" height="100" :src="image+empresa.logo"/>
            {{empresa.nombre_comercial}}
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
            <v-list dense rounded>
                <v-list-item 
                    :to="'/aliados/'+empresa.nombre_comercial+'/'+grupo.nombre" 
                    dense v-for="grupo in grupos" :key="grupo.id" active-class="shadow white--text color"
                >
                    <v-list-item-content>
                        {{grupo.nombre}}
                    </v-list-item-content>
                    <v-list-item-icon>
                        <v-icon :dark="$route.params.text2 == grupo.nombre ? true:false">
                            chevron_right
                        </v-icon>
                    </v-list-item-icon>
                </v-list-item>
            </v-list>
        </v-card-text>
    </v-card>
</template>

<script>
import variables from '@/services/variables_globales';

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
    }
</script>

<style lang="css" scope>    
    .color{
        background: #17468b;
    }
    .shadow{
        box-shadow: 1px 1px 9px 1px rgba(153,153,153,0.5);
    }
    .shadow2{
        -webkit-box-shadow: 0px 0px 14px 0px rgba(153,153,153,1);
        -moz-box-shadow: 0px 0px 14px 0px rgba(153,153,153,1);
        box-shadow: 0px 0px 14px 0px rgba(153,153,153,1);
    }
</style>