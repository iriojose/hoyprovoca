<template>
    <div>
        <v-toolbar width="100%" height="50" color="#005598">
           <v-btn text to="/" disabled>
               <v-img width="120" height="120" src="@/assets/logo2.png" contain></v-img>
           </v-btn>
           <v-spacer></v-spacer>
           <v-btn to="/" text elevation="0" dark class="caption text-capitalize">
               Seguir Comprando
           </v-btn>
        </v-toolbar>

        <v-row class="mt-5 px-5">
            <v-col cols="12" md="5">
                <v-card height="400" elevation="10" class="py-5">
                    <v-img contain src="https://www.fourjay.org/myphoto/f/0/3981_laptop-png.png"></v-img>
                </v-card>
            </v-col>
            <v-col cols="12" md="5">
                <v-card color="#eee" elevation="0">
                    <v-card-title>
                        <div class="black--text title">
                            Lapto superarrechisima que no se cuanto vale pero ahi esta intacta regia poderosa.
                        </div>
                    </v-card-title>
                    <v-card-text>
                        <v-row align="baseline">
                            <v-col cols="12" md="6" sm="6">
                                <v-rating
                                    class="my-3"
                                    v-model="rating"
                                    background-color="orange lighten-3"
                                    color="orange"
                                    dense
                                    readonly
                                />
                            </v-col>
                            <v-col cols="12" md="6" sm="3">
                                <span class="black--text text--lighten-2 caption mr-2">
                                    ({{ rating }})
                                </span>
                            </v-col>
                            
                            <v-col cols="12" md="12">
                                <strong class="black--text title">Bss. 500.000 </strong>
                            </v-col>
                            <v-col cols="12" md="12" sm="12">
                                <strong class="green--text title">Disponible.</strong>
                            </v-col>
                            <v-col cols="12" md="12">
                                <p class="black--text darken-1 subtitle-1">
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
                                    Corrupti iure nulla cumque sunt itaque eaque reprehenderit 
                                    animi commodi ratione nisi, molestiae culpa ipsum. Pariatur 
                                    ssumenda temporibus, ut perspiciatis amet facilis.
                                </p>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>

            <v-col cols="12" md="2">
                <v-card elevation="0" class="cuadro px-2 py-5">
                    <v-card-text>
                        <v-tooltip left>
                            <template v-slot:activator="{ on }">
                                <div v-on="complete ? on:null">
                                    <v-btn :disabled="complete" color="#005598" class="white--text text-capitalize caption">
                                        <v-icon color="#fff">shopping_cart</v-icon>
                                        Agregar al carrito
                                    </v-btn>
                                </div> 
                            </template>
                            <span>le falta algo más</span>
                        </v-tooltip>
                        
                        <v-select
                            v-model="cant"
                            :items="filters"
                            label="Cantidad"
                            filled
                            color="#000"
                            hide-details
                            hide-selected
                            chips
                            type="number"
                            class="mt-5"
                            dense
                        ></v-select>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                complete:false,
                rating:2.5,
                cant:null,
                filters:[1,2,3,4,5]
            }
        }
    }
</script>

<style scoped>
    .cuadro{
        border: 1px solid #000;
    }
</style>