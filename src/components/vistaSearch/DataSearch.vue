<template>
    <v-card elevation="0" width="100%" color="#f7f7f7">
        <v-card-title class="font-weight-black" @click="push(empresa)">
            <v-avatar size="60" class="mx-2 cursor" tile>
                <v-img :src="image+empresa.imagen"></v-img>
            </v-avatar>
            <div class="text-center underline font-weight-black cursor">{{empresa.nombre_comercial}}</div>
        </v-card-title>

        <v-slide-group class="my-2">
            <v-slide-item v-for="(concepto,e) in conceptos" :key="e">
                <CardConceptos :concepto="concepto" />
            </v-slide-item>
        </v-slide-group>
    </v-card>
</template>

<script>
import variables from '@/services/variables_globales';
import router from '@/router';
import CardConceptos from '@/components/cards/CardConceptos2';

    export default {
        components:{
            CardConceptos
        },
        props:{
            empresa:{
                type:Object,
                default:() => ({})
            },
            conceptos:{
                type:Array,
                default:() => ([])
            }
        },
        data() {
            return {
                ...variables
            }
        },
        methods: {
            push(empresa){
                window.localStorage.setItem('aliado',empresa.id);
                let nombre = empresa.nombre_comercial.toLowerCase(); 
                router.push({name:'aliadoDetalle', params:{text:nombre}});
            },
        },
    }
</script>

<style lang="scss" scoped>
    .cursor{
        cursor:pointer;
    }
    .sombra{
        -webkit-box-shadow: 0px 5px 6px -5px rgba(0,0,0,0.75);
        -moz-box-shadow: 0px 5px 6px -5px rgba(0,0,0,0.75);
        box-shadow: 0px 5px 6px -5px rgba(0,0,0,0.75);
    }
    $thetransition: all .5s cubic-bezier(1,.25,0,.75) 0s;
    .underline{
        text-decoration: none;
        position: relative;
        &:before {
            content: "";
            position: absolute;
            width: 100%;
            height: 1px;
            bottom: 0;
            left: 0;
            background-color: #302d2d;
            visibility: hidden;
            -webkit-transform: scaleX(0);
            transform: scaleX(0);
            -webkit-transition: $thetransition;
            transition: $thetransition;
        }
        &:hover:before {
            visibility: visible;
            -webkit-transform: scaleX(1);
            transform: scaleX(1);
        }
    }
</style>