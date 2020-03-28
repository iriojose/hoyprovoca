<template>
    <v-card elevation="0" width="100%" :class="$vuetify.breakpoint.smAndDown ? 'mx-2':'mx-2'">
        <v-card-title class="px-4 pb-2 caption">
            <v-img contain width="100" height="100" :src="image+empresa.logo"/>
            {{empresa.nombre_comercial}}
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
            <v-list dense>
                <v-list-item @click="push(grupo)" dense v-for="grupo in grupos" :key="grupo.id">
                    <v-list-item-content>
                        {{grupo.nombre}}
                    </v-list-item-content>
                    <v-list-item-icon>
                        <v-icon small color="#005598">chevron_right</v-icon>
                    </v-list-item-icon>
                </v-list-item>
            </v-list>
        </v-card-text>
    </v-card>
</template>

<script>
import variables from '@/services/variables_globales';
import router from '@/router';

    export default {
        props:{
            empresa:{
                type:Object,
                default:() => ({})
            },
            grupos:{
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
            push(grupo){
                router.push({name:'aliadoGrupo',params:{text2:grupo.nombre}});
            }
        },
    }
</script>