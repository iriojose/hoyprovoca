<template>
    <div>
        <div class="text-left black--text headline font-weight-black">Categorías</div>
        <v-row justify="center">
            <v-card 
                :elevation="0" 
                class="border mx-2 mb-4"
                color="transparent"
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
    </div>
</template>

<script>
import variables from '@/services/variables_globales';
import router from '@/router';

    export default {
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