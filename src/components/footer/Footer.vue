<template>
    <v-sheet>
        <PreFooter />
        <v-divider />

        <v-layout row>
            <v-flex md3 xs6 align-self-baseline class="px-5 py-2">
                <v-list dense>
                    <h5 class="font-weight-bold">Categorias</h5>

                    <v-hover 
                        v-slot:default="{ hover }" 
                        v-for="item in categorias" 
                        :key="item.text"
                    >
                        <v-list-item>
                            <v-subheader >
                                <div :class="hover ? 'aftim-color' : null">
                                {{item.text}}
                                </div> 
                            </v-subheader>
                        </v-list-item>
                    </v-hover>
                </v-list>
            </v-flex>

            <v-divider vertical class="hidden-sm-and-down"/>

            <v-flex md5 xs6 align-self-baseline class="px-3 py-2">
                <v-list dense>
                    <h5 class="font-weight-bold">Información de interes</h5>
                    <v-hover 
                        v-slot:default="{ hover }" 
                        v-for="item in informacion" 
                        :key="item.text"
                    >
                        <v-list-item>
                            <v-subheader >
                                <div :class="hover ? 'aftim-color' : null">
                                   {{item.text}}
                                </div> 
                            </v-subheader>
                        </v-list-item>
                    </v-hover>
                </v-list>
            </v-flex>

            <v-divider vertical class="hidden-sm-and-down"/>

            <v-flex md3 xs12 class="px-3 py-2" align-self-baseline>
                <v-list dense>
                    <v-layout row wrap>
                        <v-flex md12 xs6>
                            <h5 class="font-weight-bold mx-5">Descarga la App</h5>

                            <v-list-item class="my-2">
                                <v-btn rounded text depressed>
                                    <v-img src="@/assets/app-store.png"/>
                                    <v-list-item-title class="mx-2">iPhone</v-list-item-title>
                                </v-btn>
                            </v-list-item>

                            <v-list-item>
                                <v-btn rounded text depressed>
                                    <v-img src='@/assets/playstore.png'/>
                                    <v-list-item-title class="mx-2">Android</v-list-item-title>
                                </v-btn>
                            </v-list-item>
                        </v-flex>

                        <v-flex md12 xs6>
                            <h5 class="font-weight-bold pa-5">Siguenos</h5>
                            <v-list-item>
                                <v-btn icon  class="mx-3" v-for="img in siguenos" :key="img.img">
                                    <v-img :src="require('@/assets/'+img.img)" width="34" height="34"></v-img>
                                </v-btn>
                            </v-list-item>
                        </v-flex>
                    </v-layout>
                </v-list>
            </v-flex>
        </v-layout>

        <SubFooter />
   </v-sheet>
</template>

<script>
import SubFooter from './SubFooter';
import PreFooter from './PreFooter';
    export default {
        components:{
            SubFooter,
            PreFooter,
        },
        data() {
            return {
                categorias:[
                    {text:'Supermercados'},
                    {text:'Tiendas'},
                    {text:'Tecnologia'},
                    {text:'Restaurantes'}
                ],
                informacion:[
                    {text:'Terminos y condiciones'},
                    {text:'Trabaja con nosotros'},
                    {text:'Politica de tratamientos de datos personales'},
                    {text:'Preguntas frecuentes'}
                ],
                siguenos:[
                    {img:'svgfacebook.svg'},
                    {img:'svgyoutu.svg'},
                    {img:'instagramsvg.svg'}
                ]
            }
        },
        
    }
</script>

<style lang="scss" scoped>
     .aftim-color{
        color:#005598;
    }
</style>