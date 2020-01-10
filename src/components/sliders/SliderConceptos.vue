<template>
    <v-slide-group
        show-arrows
        class="my-5"
    >
        <v-slide-item
            v-for="concepto in  conceptos"
            :key="concepto.id"
            :class="[margen_x,margen_bottom,margen_y,margen_top,margen_right,margen_left]"
            :title="concepto.nombre+' '+concepto.precio_a"
        >
            <CardConceptos
                :concepto="concepto" 
                :heightImg="heightImg" 
                :widthImg="widthImg" 
                :heightCard="heightCard" 
                :widthCard="widthCard" 
            />
        </v-slide-item>
    </v-slide-group>
</template>

<script>
import CardConceptos from '@/components/cards/CardConceptos';

    export default {
        components:{
            CardConceptos
        },
        props:{//la mayoria es para hacer diseños diferentes (igual se pueden agregar mas...)
            conceptos:{
                type:Array,
                default:() => []
            },
            margen_x:{
                type:String,
                default:""
            },
            margen_y:{
                type:String,
                default:""
            },
            margen_top:{
                type:String,
                default:""
            },
            margen_bottom:{
                type:String,
                default:""
            },
            margen_left:{
                type:String,
                default:""
            },
            margen_right:{
                type:String,
                default:""
            },
            widthCard:{
                type:Number,
                default:200
            },
            heightCard:{
                type:Number,
                default:300
            },
            widthImg:{
                type:Number,
                default:200
            },
            heightImg:{
                type:Number,
                default:220
            },
            tipo:{
                type:Number,
                default:1
            },
        }
    }
</script>
