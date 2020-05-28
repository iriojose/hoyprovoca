<template>
    <div>
        <v-card elevation="0" width="100%" v-if="!$vuetify.breakpoint.smAndDown" style="padding-bottom: 25px;">
            <v-card-title class="font-weight-black">
                <v-avatar size="60" tile class="mx-2">
                    <v-img :src="image+grupo.imagen"></v-img>
                </v-avatar>
                <div class="text-center">{{grupo.nombre}}</div>
            </v-card-title>

            <v-slide-group show-arrows class="my-2">
                <v-slide-item v-for="(concepto,e) in conceptos" :key="e">
                    <CardConceptos style="margin:0 10px;" :concepto="concepto" />
                </v-slide-item>
            </v-slide-group>
        </v-card>

        <v-card v-else>
            <v-expansion-panels flat>
                <v-expansion-panel>
                        <v-expansion-panel-header class="title font-weight-black">
                            <v-avatar size="60" tile class="mx-2">
                                <v-img :src="image+grupo.imagen"></v-img>
                            </v-avatar>
                            <div class="text-center">{{grupo.nombre}}</div>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <v-row justify="center" v-if="tipo">
                                <CardConceptos style="margin:0 10px" :concepto="concepto" v-for="(concepto,i) in conceptos" :key="i"/>
                            </v-row>
                            <v-row justify="center" v-else>
                                <CardConceptos2 :concepto="concepto" v-for="(concepto,i) in conceptos" :key="i"/>
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
import router from '@/router';
import variables from '@/services/variables_globales';

    export default {
        components:{
            CardConceptos,
            CardConceptos2
        },
        props:{
            grupo:{
                type:Object,
                default:() => ({})
            },
            conceptos:{
                type:Array,
                default:() => ([])
            },
            tipo:{
                type:Boolean,
                default:true
            }
        },
        data(){
            return {
                ...variables,
            }
        },
        methods:{
            push(grupo){
                window.localStorage.setItem('detalle',grupo.id);
                let nombre = grupo.nombre.toLowerCase(); 
                router.push({name:'aliadoGrupo', params:{text2:nombre}});
            }
        }
    }
</script>
