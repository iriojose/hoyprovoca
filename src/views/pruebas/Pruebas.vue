<template>
    <div>
        <!--Navbar -->
        <v-toolbar width="100%" height="50" color="#005598">
           <v-btn text to="/" disabled>
               <v-img width="120" height="120" src="@/assets/logo2.png" contain></v-img>
           </v-btn>
           <v-spacer></v-spacer>
           <v-btn to="/" text elevation="0" dark class="caption text-capitalize">
               Seguir Comprando
           </v-btn>
        </v-toolbar>

        <v-row>
            <v-col cols="12" md="6" justify-self="center" align-self="center">
                <v-img
                    src="https://moviles.info/wp-content/uploads/2019/01/xiaomi-mi-9.png"
                    contain
                    height="400"
                    width="100%"
                ></v-img>
            </v-col>
            <v-col cols="12" md="6" justify-self="center" align-self="center">
                <v-card class="mx-5">
                    <v-card-title>
                        <div class="title font-weight-black">
                            Xiaomi
                        </div>
                        <div class="body-2">
                            Lorem ipsum dolor 
                            sit amet consectetur adipisicing elit. 
                            Dignissimos quam magnam vitae eius laudantium 
                            voluptatibus eligendi voluptas id alias repellendus 
                            ab, quasi blanditiis eum asperiores? Et officiis 
                            voluptate maiores aliquam!
                        </div>
                    </v-card-title>
                    <v-card-text class="mt-5">
                        <div class="title">
                            Disponible.
                        </div>
                        <div class="title">
                            Tipo_concepto.
                        </div>
                        <div class="d-block">
                            <v-rating
                                v-model="rating"
                                color="yellow darken-3"
                                background-color="grey darken-1"
                                empty-icon="$ratingFull"
                                half-increments
                                hover
                            ></v-rating>
                            {{"("+rating+")"}}
                        </div>
                    </v-card-text>
                    <v-card-actions class="my-4">
                        <v-btn 
                            color="#005598" 
                            rounded 
                            class="caption white--text text-capitalize" 
                            width="100"
                        >
                            Agregar
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn icon tile>
                            <v-icon>delete</v-icon>
                        </v-btn>
                        <div class="mx-5">1</div> 
                        <v-btn icon tile>
                            <v-icon>exposure_plus_1</v-icon>
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
            <v-col cols="12" md="12" sm="12">
                <SliderSugerencias />
            </v-col>
        </v-row>
    </div>
</template>

<script>
import SliderSugerencias from "@/components/sliders/SliderSugerencias";

    export default {
        components:{
            SliderSugerencias
        },
        data() {
            return {
               rating:4.5
            }
        },
    }
</script>