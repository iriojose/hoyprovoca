<template>
    <div>
        <v-card 
            class="mb-5" 
            elevation="0" 
            width="100%" 
            :height="$vuetify.breakpoint.smAndDown ? 300:350" 
            v-for="(arrays,i) in conceptos" :key="i"
        >
            <v-card-title class="font-weight-black">
                <div class="text-center">{{grupos[i].nombre}}</div>
            </v-card-title>
            <v-slide-group show-arrows class="my-2">
                <v-slide-item v-for="(concepto,e) in arrays" :key="e">
                    <CardConceptos :concepto="concepto" />
                </v-slide-item>

                <v-slide-item class="mx-5">
                    <v-card 
                        elevation="0" 
                        :height="$vuetify.breakpoint.smAndDown ? 200:250" 
                        :width="$vuetify.breakpoint.smAndDown ? 100:150"
                    >
                        <v-row justify="center" align="center" class="fill-height">
                            <div>
                                <div class="text-capitalize grey--text caption">
                                    Ver todos los productos de
                                </div>
                                <div class="title font-weight-black mb-5">
                                    {{grupos[i].nombre}}
                                </div>
                                <v-hover v-slot:default="{hover}">
                                    <v-btn 
                                        color="#005598"
                                        block 
                                        @click="push(grupos[i])"
                                        :outlined="hover ? false:true"
                                        :elevation="hover ? 3:0"
                                        :dark="hover ? true:false"
                                        class="text-capitalize font-weight-bold"
                                    >
                                        Ver mas 
                                    </v-btn>
                                </v-hover>
                            </div>
                        </v-row>
                    </v-card>
                </v-slide-item>
            </v-slide-group>
        </v-card>
    </div>
</template>

<script>
import CardConceptos from '@/components/cards/CardConceptos2';
import router from '@/router';

    export default {
        components:{
            CardConceptos
        },
        props:{
            grupos:{
                type:Array,
                default:() => ([])
            },
            conceptos:{
                type:Array,
                default:() => ([])
            }
        },
        methods:{
            push(grupo){
                router.push({name:'aliadoGrupo',params:{text2:grupo.nombre}});
            }
        }
    }
</script>
