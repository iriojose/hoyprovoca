<template>
    <div>
        <div v-for="n in 4" :key="n">
            <div class="font-weight-bold title mt-5 mx-8">
                Promociones
            </div>
            <v-sheet
                class="mx-auto"
                elevation="0"
                color="#f5f5f5"
            >
                <v-slide-group
                    v-model="model"
                    class="pa-4"
                    show-arrows
                >
                    <v-slide-item
                        v-for="n in 4"
                        :key="n"
                        class="mx-3 border"
                    >
                        <v-card class="background" width="220" height="320" elevation="0" >
                            <v-img width="220" height="220" contain src="http://www.e02.es/cubic/datos/docs/doc_365/imag_381_creacion_logotipos_identidad_corporativa_01_penato.png">
                                <div class="mt-5 mx-2 divsito px-2">
                                    <span class="white--text caption">Agotado</span>
                                </div>
                            </v-img>
                            <div>
                                <span class="font-weight-bold title mx-2">$1.200</span>
                            </div>
                            <div>
                                <span class="font-weight-bold body-1 mx-2">Name producto</span>
                            </div>
                            <div>
                                <span class="font-weight-bold caption grey--text mx-2">Descripcion del producto</span>
                            </div>
                        </v-card>
                    </v-slide-item>
                </v-slide-group>
            </v-sheet>
        </div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>
    .divsito{
        background-color: #E57373;
        border-radius: 10%;
        width: 30%;
    }
</style>