<template>
    <v-container>
        <div class="headline ml-12 mt-12 font-weight-black">Categorias mas buscadas</div>
        <v-slide-group show-arrows class="my-5 py-5">
            <v-slide-item
                v-for="categoria in  categorias"
                :key="categoria.id"
                class="mx-4 mb-8"
            >
                <v-hover v-slot:default="{hover}">
                    <v-card height="300" width="300" :elevation="hover ? 0:10" @click="push(categoria)">
                        <v-card-text>
                            <v-img height="250" width="250" contain :src="ruta+categoria.imagen"/>
                        </v-card-text>
                    </v-card> 
                </v-hover>
            </v-slide-item>
        </v-slide-group>

        <!-- <v-slide-group show-arrows class="my-5 py-5">
            <v-slide-item v-for="categoria in categorias" :key="categoria.id" class="mx-4 mb-8">
                <v-hover v-slot:default="{hover}">
                    <v-card height="300" width="300" elevation="0" @click="push(categoria)">
                        <v-card-text>
                            <v-img 
                                :aspect-ratio="1.7888"
                                :class="hover ? 'elevation-0':'elevation-15'"
                                height="100%"
                                width="100%"
                                contain
                                :src="ruta+categoria.imagen"
                                :gradient="hover ? 'to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)':null" 
                            />
                        </v-card-text>
                    </v-card>
                </v-hover>
            </v-slide-item>
        </v-slide-group>-->
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