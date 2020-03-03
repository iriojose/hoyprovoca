<template>
        <v-row :class="$vuetify.breakpoint.smAndDown ? 'mx-5 mt-12':'mx-5'">
            <v-col cols="12" md="3" lg="3" sm="12">
                <v-card elevation="5" color="my-6">
                    <!--si aun no ha cargado -->
                    <div class="text-center mt-12" v-if="loading">
                        <v-progress-circular
                            :size="40"
                            color="#005598"
                            :indeterminate="loading"
                            class="my-4"
                        ></v-progress-circular>
                    </div>

                    <!--panel de grupos y subgrupos-->
                    <div  v-else>   
                        <v-card-title class="mx-3">
                            <v-img contain width="80" height="80" :src="ruta+empresa.logo"/>
                            {{empresa.nombre_comercial}}
                        </v-card-title>
                        <v-divider dark></v-divider>
                        
                        <v-expansion-panels accordion>
                            <v-expansion-panel
                                v-for="grupo in grupos"
                                :key="grupo.id"
                                @click="changeGrupo(grupo.id)"
                            >
                                <v-expansion-panel-header 
                                    class="text-lowercase font-weight-bold"
                                >
                                    {{grupo.nombre}}
                                </v-expansion-panel-header>
                                <v-expansion-panel-content>
                                    <v-list dense> 
                                        <div
                                            v-for="subgrupo in subgrupos"
                                            :key="subgrupo.id"
                                        >
                                            <v-list-item
                                                @click="changeSubGrupo(subgrupo.id)"
                                                v-if="subgrupo.grupos_id == grupo.id"
                                            >
                                                <v-list-item-title>
                                                    {{subgrupo.nombre}}
                                                </v-list-item-title>
                                            </v-list-item>
                                        </div>
                                    </v-list>
                                </v-expansion-panel-content>
                            </v-expansion-panel>
                        </v-expansion-panels>
                    </div>
                </v-card>
            </v-col>

            <!--conceptos por grupos y subgrupos seleccionado -->
            <v-col cols="12" md="9" lg="9" sm="12">
                <Conceptos 
                    :selectGrupo="selectGrupo" 
                    :selectSubgrupo="selectSubgrupo" 
                    :subgrupos="subgrupos" 
                    :grupos="grupos" 
                    :conceptos="conceptos"
                />
            </v-col>
        </v-row>
</template>

<script>
import Conceptos from '@/components/vistaAliados/Conceptos';
import url from '@/services/ruta';

    export default {
        props:{
            grupos:{
                type:Array,
                default: () => []
            },
            subgrupos:{
                type:Array,
                default: () => []
            },
            conceptos:{
                type:Array,
                default: () => []
            },
            empresa:{
                type:Object,
                default: () => {}
            },

        },
        created(){
            this.ruta=url;
        },
        data() {
            return {
                item:1,
                loading:true,
                selectGrupo:0,
                selectSubgrupo:0,
            }
        },
        components: {
            Conceptos
        },
        watch: {
            grupos(){
                this.loading=false;
            },
            subgrupos(){
               
            },
            conceptos(){
               
            },

        },
        methods:{
            changeGrupo(evt){
                this.selectGrupo = evt;
                console.log(evt);
            },

            changeSubGrupo(evt){
                this.selectSubgrupo=evt;
                console.log(evt);
            }
        },
    }
</script>