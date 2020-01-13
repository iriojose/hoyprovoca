<template>
    <v-slide-group
        show-arrows
        class="my-5 mx-3"
    >
        <v-slide-item
            v-for="n in 10"
            :key="n"
        >
            <CardSugerenciaConcepto />
        </v-slide-item>
    </v-slide-group>
</template>

<script>
import CardSugerenciaConcepto from "@/components/cards/CardSugerenciaConcepto";

    export default {
        components:{
            CardSugerenciaConcepto
        },
        props:{
            conceptos:{
                type:Array,
                default:() => []
            }
        }
    }
</script>