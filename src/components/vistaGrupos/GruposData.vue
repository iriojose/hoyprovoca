<template>
    <div class="mt-12">
        <div v-for="(subgrupo,i) in subgrupos" :key="i" class="mt-4">
            <v-card 
                width="100%" 
                :height="$vuetify.breakpoint.smAndDown ? 300:350" 
                elevation="0" class="shadow"
            >
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
import CardConceptos from '@/components/cards/CardConceptos2';

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
        -webkit-box-shadow: 1px 1px 11px 0px rgba(0,0,0,0.75);
        -moz-box-shadow: 1px 1px 11px 0px rgba(0,0,0,0.75);
        box-shadow: 1px 1px 11px 0px rgba(0,0,0,0.75);
    }
</style>