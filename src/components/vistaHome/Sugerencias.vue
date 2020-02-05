<template>
    <div>
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
                        width="300" 
                        :elevation="hover ? 15:0"
                        @click="push(sugerencia)"
                    >
                        <v-card-text>
                            <!--sugerencia.imagen-->
                            <v-img contain :src="'http://192.168.0.253:81/api/images/'+sugerencia.logo"/> 
                        </v-card-text>
                    </v-card>
                    
                </v-hover>
            </v-slide-item>
        </v-slide-group>
    </div>
</template>

<script>
//router
import router from '@/router';

    export default {
        props: ["sugerencias", "title"],
        data() {
            return {
                model: 1,
            }
        },
        methods: {
            push(item){
                router.push({name:'local',params:{text:item.nombre_comercial,id:item.id}});
            }
        }
    }
</script>