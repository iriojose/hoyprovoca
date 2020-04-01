<template>
    <div :class="$vuetify.breakpoint.smAndDown ? 'mx-2 pt-10 mt-12':'mt-5 mx-10'">
        <div v-for="(subgrupo,i) in subgrupos" :key="i" class="ma-5">
            <v-card width="100%" height="350" elevation="0" class="pa-4 shadow" v-if="conceptos[i].length > 0">
                <v-card-title class="font-weight-black">
                    {{subgrupo.nombre}}
                </v-card-title>
                <v-card-text>
                    <v-slide-group show-arrows class="my-2">
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
import CardConceptos from '@/components/cards/CardConceptos';

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
    }
</script>

<style lang="css" scoped>
    .shadow{
        box-shadow: 0px 5px 8px 0px rgba(153,153,153,1);
    }
</style>