<template>
    <div :class="$vuetify.breakpoint.smAndDown ? 'mx-2 pt-10':'mx-10'">

        <div v-for="(subgrupo,i) in subgrupos" :key="subgrupo.id">
            <div v-if="conceptos[i]">
                <div class="headline ml-12 mt-12 font-weight-black text-center">{{subgrupo.nombre}}</div>
                <v-slide-group show-arrows class="my-5">
                    <!--conceptos de subgrupos -->
                    <SliderConceptos
                        :conceptos="conceptos[i]" 
                        margen_x="mx-2" 
                        margen_bottom="mb-10" 
                        margen_top="mt-5"
                    />
                </v-slide-group>  
            </div>
        </div> 
    </div>
</template>

<script>
//components
import CardConceptos from '@/components/cards/CardConceptos';
import SliderConceptos from '@/components/sliders/SliderConceptos';
//services
import Conceptos from '@/services/Conceptos';
import Pedidos from '@/services/Pedidos';

    export default {
        components:{
            CardConceptos,
            SliderConceptos
        },
        props:{//props
            subgrupos:{
                type:Array,
                default: () => []
            },
            conceptos:{
                type:Array,
                default: () => []
            }
        },
        data() {
            return {
                model:1,
            }
        },
    }
</script>
