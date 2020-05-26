<template>
    <v-row justify="center" v-if="grupos">
        <v-card 
            :elevation="0" 
            class="border mx-2 mb-4"
            :width="$vuetify.breakpoint.smAndDown ? 100:200" 
            :height="$vuetify.breakpoint.smAndDown ? 100:200" 
            v-for="(grupo,i) in grupos" :key="i"
            @click="push(grupo)"
        >
            <v-img 
                contain 
                :width="$vuetify.breakpoint.smAndDown ? 100:200" 
                :height="$vuetify.breakpoint.smAndDown ? 80:180"
                :src="image+grupo.imagen" 
            /> 
            <div class="mt-2 text-center subtitle-2 font-weight-black">{{grupo.nombre}}</div>
        </v-card>
    </v-row>
    <v-row justify="center" v-else>
        <v-card 
            :elevation="0" 
            class="border mx-2 mb-4"
            :width="$vuetify.breakpoint.smAndDown ? 100:200" 
            :height="$vuetify.breakpoint.smAndDown ? 100:200" 
            v-for="(color,i) in colores" :key="i"
            :color="colores.color"
        >
            <v-row justify="center">
                <Puntos />
            </v-row>
        </v-card>
    </v-row>
</template>

<script>
import variables from '@/services/variables_globales';
import router from '@/router';
import Puntos from '@/components/loaders/Puntos';

    export default {
        components:{
            Puntos
        },
        props:{
            grupos:{
                type:Array,
                default:() => ([])
            },
            title:{
                Type:String,
                default:''
            }
        },
        data(){
            return {
                ...variables,
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
        methods:{
            push(item){
                window.localStorage.setItem('grupo',item.id);
                let nombre = item.nombre.toLowerCase(); 
                router.push({name:'grupoDetalle', params:{text:nombre}});
            }
        }
    }
</script>

<style lang="scss" scoped>
    .border{
        border-radius:30px !important;
    }
</style>