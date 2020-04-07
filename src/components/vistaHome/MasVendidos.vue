<template>
    <div>
        <div 
            :class="$vuetify.breakpoint.smAndDown ? 'font-weight-black text-center headline mt-12':'headline ml-12 mt-12 font-weight-black'"
        >
            Productos más vendidos
        </div>
        <v-slide-group show-arrows :class="$vuetify.breakpoint.smAndDown ? 'my-2':'my-2 mx-10'">
            <v-slide-item v-for="(concepto,i) in conceptos" :key="i" class="mx-2">
                <CardConceptos :concepto="concepto" />
            </v-slide-item>
        </v-slide-group>
    </div>

    
</template>

<script>
import CardConceptos from '@/components/cards/CardConceptos';

    export default {
        props:{
            conceptos:{
                type:Array,
                default:() => ([])
            }
        },
        components:{
            CardConceptos
        },
    }
</script>