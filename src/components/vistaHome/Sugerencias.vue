<template>
    <v-container>
        <v-divider class="my-12"></v-divider>
        <v-card-actions>
            <div class="headline ml-12 mt-12 font-weight-black">Visita nuestras tiendas</div>
            <v-spacer></v-spacer>
            <v-hover v-slot:default="{hover}">
                <v-btn width="100" text depressed class="caption text-capitalize mt-10">
                    Ver todas 
                    <v-slide-x-transition>
                        <v-icon v-show="hover">keyboard_arrow_right</v-icon>
                    </v-slide-x-transition>
                </v-btn>
            </v-hover>
        </v-card-actions>
        <v-slide-group
            show-arrows
            class="my-5 py-5"
        >
            <v-slide-item
                v-for="sugerencia in  sugerencias"
                :key="sugerencia.id"
                class="mx-4 mb-8"
            >
                <v-hover v-slot:default="{hover}">
                    <v-card height="200" width="300" :elevation="hover ? 15:0" @click="push(sugerencia)">
                        <v-img contain width="300" height="200" :src="ruta+sugerencia.logo" /> 
                        <div class="mt-2 px-5">{{sugerencia.nombre_comercial}}</div>
                    </v-card>
                </v-hover>
            </v-slide-item>
        </v-slide-group>
    </v-container>
</template>

<script>
//router
import router from '@/router';
import url from '@/services/ruta';

    export default {
        props: ["sugerencias", "title"],
        data() {
            return {
                model: 1,
                ruta:null,
            }
        },
        mounted() {
            this.ruta=url;
        },
        methods: {
            push(item){
                router.push({name:'local',params:{text:item.nombre_comercial,id:item.id}});
            }
        }
    }
</script>