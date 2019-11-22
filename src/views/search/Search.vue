<template>
    <div>
        <AppBar />
        <v-row >
            <v-col cols="12" md="12" lg="3" sm="12">
                <Filtros />
            </v-col>

            <v-col cols="12" lg="9" md="12" sm="12">
                <v-sheet class="mx-4 my-3 pa-4" elevation="2" height="150">
                    <h3 class="headline text-center mb-3">Resultados:</h3>
                    <v-slide-group show-arrows class="space">
                        <v-slide-item
                            v-for="n in 15" 
                            :key="n"
                            v-slot:default="{active,toggle}" 
                        >
                            <v-avatar class="mx-4 elevation-3" :input-value="active" size="50">
                                Ig
                            </v-avatar>
                        </v-slide-item>
                    </v-slide-group>
                </v-sheet>

                <v-sheet elevation="2" class="ma-4" v-for="n in 10" :key="n">
                    <v-row>
                        <v-col cols="12" md="3" sm="3" lg="3"  class="ma-4 px-8">
                            <v-avatar color="#f5f5f5" class="elevation-3">
                                Ig
                            </v-avatar>
                            <h6 class="subtitle-1 font-weight-bolt">Irio Gomez</h6>
                        </v-col>
                        
                        <v-col cols="12" md="3" sm="3" lg="3" offset="5">
                            <v-hover v-slot:default="{hover}">
                                <v-btn text rounded outlined :color="hover ? '#005598':null">
                                    ver más
                                </v-btn>
                            </v-hover>
                        </v-col>
                    </v-row>

                    <v-slide-group class="pa-4" mandatory show-arrows v-model="model">
                        <v-slide-item v-for="n in 6" :key="n" class="mx-2">
                            <v-hover v-slot:default="{hover}">
                                <v-card
                                    :color="hover ? '#f5f5f5': 'grey lighten-1'"
                                    height="200"
                                    width="180"
                                    elevation="0"
                                    :to="{name:'aliados',params:{id:'empresa'}}"
                                >
                                </v-card>
                            </v-hover>
                        </v-slide-item>
                    </v-slide-group>
                </v-sheet>
            </v-col>
        </v-row>
        <Footer />
    </div>
</template>

<script>
import AppBar from '@/components/navbar/AppBar';
import Footer from '@/components/footer/Footer';
import Filtros from '@/components/vistaBuscar/Filtros';

    export default {
        components:{
            AppBar,
            Footer,
            Filtros
        },
        data() {
            return {
                active:false
            }
        },
    }
</script>

<style scoped>
    .space{
        height: 65px !important;
    }
</style>