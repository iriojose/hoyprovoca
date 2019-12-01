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
                    v-for="item in items"
                    :key="item.grupo"
                    @click="push(item.grupo)"
                >
                    <v-expansion-panel-header expand-icon="arrow_right">{{item.grupo}}</v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <v-list color="#f5f5f5" dense rounded>
                            <v-list-item-group active-class="green white--text">
                                <v-list-item
                                    v-for="subgrupo in item.subgrupos"
                                    :key="subgrupo.nombre"
                                    @click="push2(subgrupo.nombre)"
                                >
                                    <v-list-item-content>
                                        <v-list-item-title v-text="subgrupo.nombre"></v-list-item-title>
                                    </v-list-item-content>
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
        data() {
            return {
                top:0,
                local:'',
                categoria:'',
                especifica:'',
                items:[
                    {
                        grupo:'Hamburguesas',
                        subgrupos:[
                            {nombre:'Pollo'},
                            {nombre:'Chuleta'},
                            {nombre:'Mixta'},
                            {nombre:'Carne'},
                            {nombre:'Especial'},
                        ]
                    },
                    {
                        grupo:'Perro Caliente',
                        subgrupos:[
                            {nombre:'Polaco'},
                            {nombre:'Especial'},
                            {nombre:'Jumbo'},
                        ]
                    },
                    {
                        grupo:'Bebidas',
                        subgrupos:[
                            {nombre:'Refrescos'},
                            {nombre:'Cervezas'},
                            {nombre:'Jugos'},
                        ]
                    },
                    {
                        grupo:'Vinos',
                        subgrupos:[
                            {nombre:'Tinto'},
                            {nombre:'Blanco'},
                        ]
                    },
                ]

            }
        },

        mounted() {
            if(this.$route.params.especifica){
                this.especifica = this.$route.params.especifica;
                console.log(this.especifica);
            } 
            if(this.$route.params.categoria){
                this.categoria = this.$route.params.categoria;
                console.log(this.categoria);
            } 
            this.local=this.$route.params.local;
        },

        methods: {
            push(n){
                this.$router.push({
                    name: "nivel1",
                    params:{
                        categoria:n,
                    }
                });

                this.categoria = n;
                console.log(this.categoria + ' categoria');
            },

            push2(n){
                this.$router.push({
                    name: "nivel2",
                    params:{
                        especifica:n,
                    }
                });
                this.especifica = n;
                console.log(this.especifica + 'especifica');
            }
        },
    }
</script>