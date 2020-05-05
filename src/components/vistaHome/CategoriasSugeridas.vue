<template>
    <v-row justify="center">
        <v-card 
            :elevation="$vuetify.breakpoint.smAndDown ? 0:2" 
            :class="$vuetify.breakpoint.smAndDown ? 'border':'mx-2 mb-2 border'"
            :width="$vuetify.breakpoint.smAndDown ? 100:200" 
            :height="$vuetify.breakpoint.smAndDown ? 100:200" 
            v-for="(grupo,i) in grupos" :key="i"
            @click="push(grupo)"
        >
            <v-card 
                elevation="0"
                :color="colores[i].color" 
                :width="$vuetify.breakpoint.smAndDown ? 100:200" 
                :height="$vuetify.breakpoint.smAndDown ? 100:170"
            >
                <v-row justify="center" align="center" class="fill-height">
                    <v-img 
                        contain 
                        :width="$vuetify.breakpoint.smAndDown ? 50:100" 
                        :height="$vuetify.breakpoint.smAndDown ? 50:100"
                        :src="image+grupo.imagen" 
                    /> 
                </v-row>
            </v-card>
            <div class="hidden-sm-and-down mt-2 px-5 subtitle-1 font-weight-black">{{grupo.nombre}}</div>
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

<style lang="scss" scope>
    .border{
        border-radius:0% !important;
    }
</style>