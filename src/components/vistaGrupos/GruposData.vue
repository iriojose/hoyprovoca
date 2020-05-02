<template>
    <div>
        <v-card elevation="0" width="100%" v-if="!$vuetify.breakpoint.smAndDown">
            <v-card-title class="font-weight-black">
                <v-avatar size="60" class="mx-2">
                    <v-img :src="image+subgrupo.imagen"></v-img>
                </v-avatar>
                <div class="text-center">{{subgrupo.nombre}}</div>
                <v-spacer></v-spacer>

                <v-btn 
                    color="#232323" @click="push(subgrupo)"  
                    class="text-capitalize" dark
                    :disabled="conceptos.length < 9 ? true:false"
                >
                    Ver más
                    <v-icon class="mx-2" dark>mdi-chevron-right</v-icon>
                </v-btn>
            </v-card-title>

            <v-slide-group show-arrows class="my-2">
                <v-slide-item v-for="(concepto,e) in conceptos" :key="e">
                    <CardConceptos :concepto="concepto" />
                </v-slide-item>
            </v-slide-group>
        </v-card>

        <v-card v-else>
            <v-expansion-panels flat>
                <v-expansion-panel>
                    <v-expansion-panel-header class="title font-weight-black">
                        <v-avatar size="50" class="mx-2">
                            <v-img :src="image+subgrupo.imagen"></v-img>
                        </v-avatar>
                        <div class="text-center">{{subgrupo.nombre}}</div>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <v-row justify="center" v-if="tipo">
                            <CardConceptos :concepto="concepto" v-for="(concepto,i) in conceptos" :key="i"/>
                        </v-row>
                        <v-row justify="center" v-else>
                            <CardConceptos2 :concepto="concepto" v-for="(concepto,i) in conceptos" :key="i"/>
                        </v-row>
                        <v-row justify="center" class="my-5">
                            <v-btn 
                                color="#232323" @click="push(subgrupo)" 
                                class="text-capitalize" dark
                                :disabled="conceptos.length < 9 ? true:false"
                            >
                                Ver más
                                <v-icon class="mx-2" dark>mdi-chevron-right</v-icon>
                            </v-btn>
                        </v-row>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
        </v-card>
    </div>
</template>

<script>
import CardConceptos from '@/components/cards/CardConceptos2';
import CardConceptos2 from '@/components/cards/CardConceptos3';
import variables from '@/services/variables_globales';
import router from '@/router';

    export default {
        components:{
            CardConceptos,
            CardConceptos2
        },
        props:{
            subgrupo:{
                type:Object,
                default: () => ({})
            },
            conceptos:{
                type:Array,
                default: () => ([])
            },
            tipo:{
                type:Boolean,
                default:true
            }
        },
        data(){
            return {
                ...variables
            }
        },
        methods: {
            push(item){
                window.localStorage.setItem('subgrupo',item.id);
                let nombre = item.nombre.toLowerCase(); 
                router.push({name:'subgrupoDetalle', params:{text:nombre}});
            }
        },
    }
</script>

<style lang="css" scoped>
    .margen-top{
        margin-top:75px;
    }
    .margen-movil{
        margin-top:120px;
    }
    .sombra{
        -webkit-box-shadow: 0px 5px 6px -5px rgba(0,0,0,0.75);
        -moz-box-shadow: 0px 5px 6px -5px rgba(0,0,0,0.75);
        box-shadow: 0px 5px 6px -5px rgba(0,0,0,0.75);
    }
</style>