<template>
    <v-card elevation="0" width="100%">
        <v-card-title class="font-weight-black">
            <v-avatar size="60" class="mx-2">
                <v-img :src="image+grupo.imagen"></v-img>
            </v-avatar>
            <div class="text-center">{{grupo.nombre}}</div>
        </v-card-title>

        <v-slide-group show-arrows class="my-2">
            <v-slide-item v-for="(concepto,e) in conceptos" :key="e">
                <CardConceptos :concepto="concepto" />
            </v-slide-item>
        </v-slide-group>
    </v-card>
</template>

<script>
import CardConceptos from '@/components/cards/CardConceptos2';
import router from '@/router';

    export default {
        components:{
            CardConceptos
        },
        props:{
            grupo:{
                type:Array,
                default:() => ([])
            },
            conceptos:{
                type:Array,
                default:() => ([])
            }
        },
        methods:{
            push(grupo){
                window.localStorage.setItem('detalle',grupo.id);
                let nombre = grupo.nombre.toLowerCase(); 
                router.push({name:'aliadoGrupo', params:{text2:nombre}});
            }
        }
    }
</script>
