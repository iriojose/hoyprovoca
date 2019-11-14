<template>
    <div>
        <v-card color="#f5f5f5" elevation="4">
            <v-img gradient="to bottom right, rgba(0,0,0,.1), rgba(0,0,0,.5)" 
                    height="350" 
                    src="https://cdn.pixabay.com/photo/2014/06/11/17/00/cook-366875_960_720.jpg">
                <v-row>
                    <v-col cols="12" md="5" sm="10" lg="5" class="mt-12 mx-10">
                        <v-card elevation="5" width="100%"  height="200">
                            <v-card-title class="mx-10 headline font-weight-bold">
                                Somos sistemas
                            </v-card-title>
                            <v-card-content>
                                <p class="my-3 mx-10 overline font-weight-bold">
                                    <span class="green--text">$$</span>
                                    • Software administrativo • 
                                    Maquinas fiscales • 
                                    Servicio tecnico...
                                </p>

                                <p class="my-3 mx-10 overline font-weight-bold">
                                    Estacion de Servicio Cocheima, 
                                    Arriba del antiguo Autolavado 
                                    - Local 1 - 
                                    Piso 1, La Asunción 6311, 
                                    Nueva Esparta •
                                    <router-link to="" class="green--text">
                                        <span class="green--text">
                                            Mas información
                                        </span>
                                    </router-link>
                                </p>
                            </v-card-content>
                        </v-card>
                    </v-col>
                </v-row>
            </v-img>
        </v-card>

        <v-tabs 
            color="#000" 
            centered class="mt-5" 
            background-color="#f5f5f5"
        >
            <v-tabs-slider></v-tabs-slider>
            <v-tab 
                v-for="n in num" 
                :key="n.id"
                :href="`#tab-${n.id}`"
            >
                {{n.id}}
            </v-tab>

            <v-tab-item
                v-for="n in num" 
                :key="n.id"
                :value="'tab-' + n.id"
                class="color"
            >
                <v-card class="mx-10 mt-10" elevation="0" color="#f5f5f5" height="400" width="100%">
                    <span class="subtitle-1 font-weight-bold">{{n.id}}</span>
                    <v-row>
                        <v-col cols="12" md="3">
                            <v-card height="150" width="100%">
                                <v-layout row>
                                    <v-flex md6 sm6>
                                        <div class="mx-3">producto</div>
                                    </v-flex>
                                    <v-flex md6 sm6 lg6 class="mt-2">
                                        <v-img height="135" width="90%" src="https://cdn.pixabay.com/photo/2014/06/11/17/00/cook-366875_960_720.jpg" />
                                    </v-flex>
                                </v-layout>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-card>
            </v-tab-item>
            
        </v-tabs>
        
    </div>
</template>

<script>
    export default {
        data() {
            return {
                num:[
                    {id:'Sugeridos'},{id:'Promociones'},{id:'Calorias'},{id:'Nuevos'}
                ],
            }
        },
    }
</script>
 <style scope>
    .mapa{
        height:200px;
    }

    .color{
        background-color: #f5f5f5;
    }
 </style>