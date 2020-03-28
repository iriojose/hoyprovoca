<template>
    <v-container>
        <div class="headline ml-12 mt-12 font-weight-black">Productos mas vendidos</div>

        <v-slide-group show-arrows class="my-2">
            <v-slide-item v-for="(concepto,i) in conceptos" :key="i" class="mx-3">
                <CardConceptos :concepto="concepto" />
            </v-slide-item>
        </v-slide-group>
    </v-container>
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