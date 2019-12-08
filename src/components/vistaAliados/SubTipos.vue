<template>
    <div class="my-5">
        <v-row>
            <v-col cols="12" :offset="$vuetify.breakpoint.smAndDown ? null:1" md="10" lg="10" sm="12">
                <div class="font-weight-bold title mt-5 mx-8">
                    Supermercados y Tiendas
                </div>
            </v-col>

            <v-col cols="12" md="10" sm="12" :offset="$vuetify.breakpoint.smAndDown ? null:1" >
                <v-sheet
                    class="mx-auto"
                    elevation="0"
                    color="#eee"
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
                            <v-card class="background" width="220" height="220" elevation="0" >
                                <v-img width="220" height="220" contain src="http://www.e02.es/cubic/datos/docs/doc_365/imag_381_creacion_logotipos_identidad_corporativa_01_penato.png" />
                            </v-card>
                        </v-slide-item>
                    </v-slide-group>
                </v-sheet>
            </v-col>

            <v-col cols="12" :offset="$vuetify.breakpoint.smAndDown ? null:1" md="10" lg="10" sm="12">
                <div class="font-weight-bold title mt-5 mx-8">
                    Restaurantes
                </div>
            </v-col>

            <v-col cols="12" md="10" sm="12" :offset="$vuetify.breakpoint.smAndDown ? null:1"  >
                <v-sheet
                    class="mx-auto"
                    elevation="0"
                    color="#eee"
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
                            <v-card class="background" width="220" height="220" elevation="0" >
                                <v-img width="220" height="220" contain src="http://www.e02.es/cubic/datos/docs/doc_366/imag_387_logotipo_diseno_corporativo_graphic_design_01_jupama.png" />
                            </v-card>
                        </v-slide-item>
                    </v-slide-group>
                </v-sheet>
            </v-col>
        </v-row>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                model:1
            }
        },
    }
</script>

<style scope>
    .background{
        background-color: #f5f5f5;
    }
</style>