<template>
    <div>
        <div v-for="(subgrupo,i) in subgrupos" :key="i" class="mt-8 sombra">
            <v-card width="100%" elevation="0">
                <v-card-title class="font-weight-black">
                    <v-avatar size="50" class="elevation-0 mx-2">
                        <v-img :src="image+subgrupo.imagen"></v-img>
                    </v-avatar>
                    {{subgrupo.nombre}}
                </v-card-title>
                <v-card-text>
                    <v-slide-group class="my-2" show-arrows>
                        <v-slide-item v-for="(concepto,e) in conceptos[i]" :key="e">
                            <CardConceptos :concepto="concepto" />
                        </v-slide-item>
                    </v-slide-group>
                </v-card-text>
            </v-card>
        </div>
    </div>
</template>

<script>
import CardConceptos from '@/components/cards/CardConceptos2';
import variables from '@/services/variables_globales';

    export default {
        components:{
            CardConceptos
        },
        props:{
            subgrupos:{
                type:Array,
                default: () => []
            },
            conceptos:{
                type:Array,
                default: () => []
            }
        },
        data(){
            return {
                ...variables
            }
        }
    }
</script>

<style lang="css" scoped>
    .margen-top{
        margin-top:75px;
    }
    .margen-movil{
        margin-top:120px;
    }
    .sombra{
        -webkit-box-shadow: 0px 5px 6px -5px rgba(0,0,0,0.75);
        -moz-box-shadow: 0px 5px 6px -5px rgba(0,0,0,0.75);
        box-shadow: 0px 5px 6px -5px rgba(0,0,0,0.75);
    }
</style>