<template>
    <v-container>
        <div class="headline ml-12 mt-12 font-weight-black">Productos mas vendidos</div>
        <SliderConceptos 
            :conceptos="conceptos"
            :heightImg="200" 
            :widthImg="200" 
            :heightCard="200" 
            :widthCard="200"
            margen_bottom="mb-8"
            margen_x="mx-4"
        />
        <v-divider class="my-12 mx-12"></v-divider>
    </v-container>
</template>

<script>
//modal
import SliderConceptos from '@/components/sliders/SliderConceptos';

    export default {
        props:{
            conceptos:{
                type:Array,
                default:() => []
            },
            title:{
                type:String,
                default:''
            }
        },
        data(){
            return {
                model:1,
            }
        },
        components:{
            SliderConceptos
        }
    
    }
</script>

<style scoped>
    .modif{
        width: 100%;
        height: 40px;
        background: rgba(0,0,0,0.5);
        color: #fff;
        padding-top: 10px;
    }
</style>