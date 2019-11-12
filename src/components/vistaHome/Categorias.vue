<template>
    <div class="my-8 mx-10">
        <div class="headline">
            Categorias
        </div>
        <v-sheet
            class="mx-auto my-4"
            elevation="0"
            max-width="1100"
            color="f5f5f5"
        >
            <v-slide-group
                v-model="model"
                class="pa-4"
                mandatory
                show-arrows
            >
                <v-slide-item v-for="categoria in categorias" :key="categoria.text">
                    <v-hover v-slot:default="{hover}">
                        <v-card
                            :color="hover ? 'grey lighten-1':'#fff'"
                            height="250"
                            width="200"
                            elevation="0"
                            :to="{name:'aliados', params:{id:categoria.text}}"
                        >
                            <v-img :src="categoria.img" height="200" width="200" />
                            <strong class="pa-3">{{categoria.text}}</strong>
                        </v-card>
                    </v-hover>
                </v-slide-item>
            </v-slide-group>
        </v-sheet>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                model:1,
                categorias:[
                    {text:'Tecnologia',img:'@/assets/tecnologia.jpg'},
                    {text:'Deportes',img:'@/assets/deportes.jpg'},
                    {text:'Restaurantes',img:'@/assets/restaurantes.jpg'},
                    {text:'Farmacias',img:'@/assets/farmacias.jpg'},
                    {text:'Supermercados',img:'@/assets/supermercado.jpg'},
                    {text:'Ropa',img:'@/assets/ropa.jpg'},
                ]
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>