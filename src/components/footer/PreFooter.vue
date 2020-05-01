<template>
    <div>
        <v-sheet class="hidden-sm-and-down">
            <v-row>
                <v-col cols="4" md="4" v-for="about in abouts" :key="about.text">
                    <v-card class="pa-3 ma-2" elevation="0">
                        <v-card-text>
                            <v-row>
                                <v-col cols="12" md="4" lg="4" offset="4">
                                    <v-img contain width="100%" height="100" :src="require('@/assets/'+about.img)"></v-img>
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
                    {img:'pay.svg',text:'Pagos online'},
                    {img:'negocio.svg',text:'Compre en su tienda preferida'},
                    {img:'safe.svg',text:'Privacidad garantizada'},
                ],
            }
        },
    }
</script>