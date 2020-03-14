<template>
    <!--div :class="$vuetify.breakpoint.smAndDown ? 'mx-2 pt-10':'mx-10'">

        <div v-for="(subgrupo,i) in subgrupos" :key="subgrupo.id">
            <div v-if="conceptos[i]">
                <div class="headline ml-12 mt-12 font-weight-black text-center">{{subgrupo.nombre}}</div>
                <v-slide-group show-arrows class="my-5">
                    
                    <SliderConceptos
                        :conceptos="conceptos[i]" 
                        margen_x="mx-2" 
                        margen_bottom="mb-10" 
                        margen_top="mt-5"
                    />
                </v-slide-group>  
            </div>
        </div> 
    </div -->

    <div :class="$vuetify.breakpoint.smAndDown ? 'mx-2 pt-10':'mx-10'">
        <v-card width="100%" height="400" elevation="0" class="pa-4 ma-3" v-for="(subgrupo,i) in subgrupos" :key="i">
            <v-card-title class="font-weight-black text-center grey--text">
                {{subgrupo.nombre}}
            </v-card-title>
            <v-card-text>
                <v-slide-group show-arrows class="my-2">
                    <v-slide-item v-for="(concepto,e) in conceptos[i]" :key="e">
                        <v-hover v-slot:default="{hover}">
                            <v-card width="200" height="250" class="ma-2" elevation="0">
                                <v-img contain width="200" height="150" :src="ruta+concepto.imagen"></v-img>
                                <div class="text-truncate font-weight-medium text-capitalize">{{concepto.nombre}}</div>
                                <div class="text-truncate body-2 grey--text text-capitalize">{{concepto.descripcion}}</div>
                                <div class="text-truncate  font-weight-black text-capitalize">{{accounting.formatMoney(concepto.precio_a,'Bs')}}</div>
                                <v-fade-transition>
                                    <v-btn block color="#005598" v-show="hover" class="white--text text-capitalize">
                                        Agregar
                                    </v-btn>
                                </v-fade-transition>
                            </v-card>
                        </v-hover>
                    </v-slide-item>
                </v-slide-group>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
//components
import CardConceptos from '@/components/cards/CardConceptos';
import SliderConceptos from '@/components/sliders/SliderConceptos';
//services
import Conceptos from '@/services/Conceptos';
import Pedidos from '@/services/Pedidos';
import url from '@/services/ruta';

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
                ruta:null
            }
        },
        mounted() {
            this.ruta = url;
        },
    }
</script>
