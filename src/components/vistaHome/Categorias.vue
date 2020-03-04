<template>
    <v-container>
        <v-card-actions>
            <div class="headline ml-12 mt-12 font-weight-black">Categorias mas buscadas</div>
            <v-spacer></v-spacer>
            <v-hover v-slot:default="{hover}">
                <v-btn width="100" text class="caption text-capitalize mt-10" to="/grupos">
                    Ver todas 
                    <v-slide-x-transition>
                        <v-icon v-show="hover">keyboard_arrow_right</v-icon>
                    </v-slide-x-transition>
                </v-btn>
            </v-hover>
        </v-card-actions>
        <v-slide-group show-arrows class="my-5 py-5">
            <v-slide-item
                v-for="categoria in  categorias"
                :key="categoria.id"
                class="mx-4 mb-8"
            >
                <v-hover v-slot:default="{hover}">
                    <v-card height="240" width="300" :elevation="hover ? 0:5" @click="push(categoria)">
                        <v-img height="200" width="300" contain :src="ruta+categoria.imagen"/>
                        <div class="mt-2 px-5">{{categoria.nombre}}</div>
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
        props: ["categorias", "title"],
        data() {
            return {
                model: 1,
                ruta:null,
            };
        },
        created(){
            this.ruta = url;
        },
        methods: {
            push(item){
                router.push({name:'grupos', params:{text:item.nombre,id:item.id}});
            }
        },
    };
</script>

<style scoped>
    .div{
        background: #005598;
    }
</style>