<template>
    <v-row justify="center">
        <v-card
            :elevation="$vuetify.breakpoint.smAndDown ? 0:2" 
            class="mx-2 mb-2"
            :width="$vuetify.breakpoint.smAndDown ? 100:200" 
            :height="$vuetify.breakpoint.smAndDown ? 100:200" 
            v-for="(color,i) in colores" :key="i"
        >
            <v-card 
                elevation="0"
                :color="colores[i].color" 
                :width="$vuetify.breakpoint.smAndDown ? 100:200" 
                :height="$vuetify.breakpoint.smAndDown ? 100:170"
            >
                <v-row justify="center" align="center" class="fill-height">
                    <Puntos />
                </v-row>
            </v-card>
        </v-card>
    </v-row>
</template>

<script>
import Puntos from '@/components/loaders/Puntos';

    export default {
        components:{
            Puntos
        },
        data() {
            return {
                colores:[
                    {color:'#D32F2F'},
                    {color:'#512DA8'},
                    {color:'#0288D1'},
                    {color:'#388E3C'},
                    {color:'#FBC02D'},
                    {color:'#E64A19'},
                    {color:'#5D4037'},
                    {color:'#455A64'},
                    {color:'#00796B'},
                    {color:'#7B1FA2'},
                ]
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>