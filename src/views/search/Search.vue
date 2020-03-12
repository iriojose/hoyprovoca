<template>
    <div>
        <AppBar />
        
        <v-row justify="center" align="center" class="fill-height" :class="$vuetify.breakpoint.smAndDown ? 'mt-12':null">
            <v-col cols="12" md="3" sm="12">
                <v-row justify="center" align="center" class="fill-height">
                    <v-col md="8" sm="12">
                        <v-card class="pa-4" elevation="3">
                            <h3 class="my-4">Buscar por:</h3>
                            <v-select 
                                :items="categorias"
                                label="Categorias"
                                chips 
                                color="#005598"
                                hide-details
                                outlined
                                item-text="nombre"
                                return-object
                                dense
                                small-chips
                                hide-selected
                                @change="changeCategoria($event)"
                            ></v-select>
                        </v-card>
                    </v-col>
                    <v-col md="8" sm="12">
                        <v-card class="pa-4" elevation="3">
                            <h3 class="my-4">Buscar por:</h3>
                            <v-select 
                                :items="categorias"
                                label="Categorias"
                                chips 
                                color="#005598"
                                hide-details
                                outlined
                                item-text="nombre"
                                return-object
                                dense
                                small-chips
                                hide-selected
                                @change="changeCategoria($event)"
                            ></v-select>
                        </v-card>
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="12" md="9" sm="12" class="px-5">
                <v-card width="100%" height="500"></v-card>
            </v-col>
        </v-row>
        <Footer />
        <ValidacionConcepto />
    </div>
</template>

<script>
import AppBar from '@/components/navbar/AppBar';
import Footer from '@/components/footer/Footer';
import ValidacionConcepto from '@/components/dialogs/ValidacionConcepto';
import Grupos from '@/services/Grupos';
import Conceptos from '@/services/Conceptos';
import Empresa from '@/services/Empresa';

    export default {
        components:{
            AppBar,Footer,ValidacionConcepto
        },
        data() {
            return {
                
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>