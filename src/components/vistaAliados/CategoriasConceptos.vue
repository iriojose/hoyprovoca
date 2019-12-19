<template>
    <v-card elevation="5" color="blue darken-2 my-6">
        <v-card-title class="mx-3 white--text">
            <v-img contain width="80" height="80" src="https://www.lancetalent.com/blog/wp-content/uploads/Captura-de-pantalla-2016-08-15-a-las-14.54.58.png"/>
            Fedex
        </v-card-title>
        <v-divider dark></v-divider>
        <v-card-text class="my-4">
            <v-expansion-panels class="elevation-5" accordion active-class="grey lighten-4">
                <v-expansion-panel
                    v-for="grupo in grupos"
                    :key="grupo.id"
                    @click="changeGrupo(grupo.nombre)"
                >
                    <v-expansion-panel-header expand-icon="arrow_right">{{grupo.nombre}}</v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <v-list color="#f5f5f5" dense rounded>
                            <v-list-item-group active-class="green white--text">
                                <v-list-item
                                    v-for="subgrupo in grupo.subgrupos"
                                    :key="subgrupo.id"
                                    @click="changeSubgrupo(subgrupo.nombre)"
                                >
                                    <v-list-item-title>{{subgrupo.nombre}}</v-list-item-title>
                                </v-list-item>
                            </v-list-item-group>
                        </v-list>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
        </v-card-text>
    </v-card>
</template>

<script>
    export default {
        props:{
            grupos:{
                type:Array,
                default: () => ([])
            }
        },
        data() {
            return {
                top:0,
                selectGrupo:'',
                selectSubgrupo:'',
            }
        },
        mounted() {
            console.log(this.grupos);
        },
        methods:{
            changeGrupo(val){
                this.selectGrupo=val;
                console.log(val);
            },

            changeSubgrupo(val){
                this.selectSubgrupo=val;
                console.log(val);
            }
        },
    }
</script>