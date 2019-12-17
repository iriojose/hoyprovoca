<template>
    <div>
        <v-divider/>
        <v-sheet class="hidden-sm-and-down">
            <v-row>
                <v-col cols="4" md="4" v-for="about in abouts" :key="about.text">
                    <v-card class="pa-3 ma-2" elevation="0">
                        <v-card-text>
                            <v-row>
                                <v-col cols="12" md="2" lg="2" offset="5">
                                    <v-avatar size="72" class="elevation-10">
                                        <v-img contain :src="require('@/assets/'+about.img)"></v-img>
                                    </v-avatar>
                                </v-col>
                                <v-col cols="12" md="12" lg="12">
                                    <div class="text-center title font-weight-bold">
                                        {{about.text}}
                                    </div>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-sheet>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                abouts:[
                    {img:'e-commerce.svg',text:'Pagos online'},
                    {img:'e-comer.svg',text:'compras a toda hora'},
                    {img:'seguridad.svg',text:'Privacidad garantizada'},
                ],
            }
        },
    }
</script>