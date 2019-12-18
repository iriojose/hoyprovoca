<template>
    <div>
        <v-sheet elevation="0" class="ma-4" v-for="resultado in resultados" :key="resultado.local">
            <v-row>
                <v-col cols="12" md="3" sm="3" lg="3"  class="ma-4 px-8">
                    <v-avatar class="elevation-3" size="80">
                        <v-img :src="resultado.img" />
                    </v-avatar>
                    <h6 class="subtitle-1 font-weight-bolt">{{resultado.local}}</h6>
                </v-col>
            </v-row>
                    
            <v-slide-group
                center-active
                show-arrows
                class="pa-2"
                v-model="model"
            >
                <v-slide-item
                    v-for="producto in resultado.productos"
                    :key="producto.nombre"
                >
                    <v-hover v-slot:default="{hover}">
                        <v-card 
                            color=""
                            :elevation="hover ? '5':'2'"
                            class="ma-2"
                            height="300"
                            width="200"
                        >
                            <v-img 
                                :src="producto.img" 
                                contain 
                                width="200" 
                                height="200"
                                :gradient="hover ? ' rgba(255,255,255,0.2), rgba(215,215,215,0.9)':null"
                            >
                                <div class="mt-5 mx-2 divsito  text-center" v-if="producto.item">
                                    <span class="white--text caption">Agotado</span>
                                </div>
                                <div class="mt-5 mx-2 divsito2  text-center" v-if="!producto.item && producto.oferta">
                                    <span class="white--text caption">Promoción</span>
                                </div>
                                <v-row
                                    class="fill-height"
                                    align="center"
                                    justify="center"
                                >
                                    <v-scale-transition>
                                        <v-btn 
                                            v-if="hover" 
                                            color="green" 
                                            elevation="1" 
                                            dark
                                            :disabled="producto.item "
                                                    
                                        >
                                            Agregar
                                        </v-btn>
                                    </v-scale-transition>
                                </v-row>
                            </v-img>
                            <div>
                                <span :class="producto.oferta ? 'font-weight-bold subtitle mx-2 decoration grey--text':'font-weight-bold subtitle mx-2'">{{producto.precio}}</span>
                                <span class="font-weight-bold subtitle mx-2 red--text" v-if="producto.oferta">1$</span>
                            </div>
                            <div>
                                <span class="font-weight-bold body-1 mx-2">{{producto.nombre}}</span>
                            </div>
                            <div>
                                <span class="font-weight-bold caption grey--text mx-2">Descripcion del producto</span>
                            </div>
                        </v-card>
                    </v-hover>
                </v-slide-item>
            </v-slide-group>
        </v-sheet>
    </div>
</template>

<script>

    export default {
        props:{
            resultados:{
                type:Array,
                default: () => ([])
            }
        },
    }
</script>