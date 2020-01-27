<template>
    <div>
        <v-divider class="my-12"></v-divider>
        <div class="headline ml-12 mt-12 font-weight-black">Categorias mas buscadas</div>
        <v-slide-group
            show-arrows
            class="my-5 py-5"
        >
            <v-slide-item
                v-for="categoria in  categorias"
                :key="categoria.id"
                class="mx-4 mb-8"
            >
                <v-hover v-slot:default="{hover}">
                    <v-card height="250" width="250" elevation="10" @click="push(categoria)">
                        <v-card-text>
                            <v-img height="250" width="250" contain :src="'http://192.168.0.253:81/api/images/'+categoria.imagen"/>
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
        props: ["categorias", "title"],
        data() {
            return {
                model: 1,
            };
        },
        methods: {
            push(item){
                router.push({name:'grupos', params:{text:item.nombre,id:item.id}});
            }
        },
    };
</script>
