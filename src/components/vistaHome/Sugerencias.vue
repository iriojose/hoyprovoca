<template>
    <v-container>
        <v-divider class="my-12"></v-divider>
        <div class="headline ml-12 mt-12 font-weight-black">Visita nuestras tiendas</div>
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
                    <v-card    
                        height="250" 
                        width="250" 
                        :elevation="hover ? 15:0"
                        @click="push(sugerencia)"
                    >
                        <v-card-text>
                            <!--sugerencia.imagen-->
                            <v-img contain width="250" height="250" :src="ruta+sugerencia.logo" /> 
                        </v-card-text>
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