<template>
    <v-sheet>
        <PreFooter />
        <v-divider />

        <v-sheet class="py-4 px-12">
            <v-row align="baseline" justify="center" class="fill-height px-10"> 
                <v-col cols="12" md="2" sm="6">
                    <v-list class="font-weight-black">
                        <v-subheader class="text-center">Categorias</v-subheader>
                        <v-list-item dense v-for="(categoria,i) in categorias" :key="i">
                            <v-list-item-title>
                                {{categoria.text}}
                            </v-list-item-title>
                        </v-list-item>
                    </v-list>
    
                </v-col>
                <v-col cols="12" md="3" sm="6">
                    <v-list dense>
                        <v-subheader class="text-center">Informaciòn de interes</v-subheader>
                        <v-list-item dense v-for="(interes,i) in intereses" :key="i">
                            <v-list-item-title>
                                {{interes.text}}
                            </v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-col>

                <v-col cols="12" md="2" sm="6">
                    <v-list dense rounded>
                        <v-subheader class="text-center">Descarga la app</v-subheader>
                        <v-list-item dense v-for="app in apps" :key="app.text">
                                <v-list-item-avatar size="25">
                                    <v-img :src="require('@/assets/'+app.img)"/>
                                </v-list-item-avatar>
                                <v-list-item-title>{{app.text}}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-row align="center" justify="center" class="fill-height pa-4">
                <v-btn width="30" height="30" elevation="0" fab class="mx-2" v-for="(red,i) in redes" :key="i">
                    <v-img contain width="30" height="30" :src="require('@/assets/'+red.img)"></v-img>
                </v-btn>
            </v-row>
        </v-sheet>

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
                intereses:[
                    {text:'Terminos y condiciones'},
                    {text:'Trabaja con nosotros'},
                    {text:'Politica de tratamientos de datos personales'},
                    {text:'Preguntas frecuentes'}
                ],
                redes:[
                    {img:'svgfacebook.svg',text:'Facebbok',to:''},
                    {img:'svgyoutu.svg',text:'YouTube',to:'https://www.youtube.com/channel/UCRxWOVR7AVYep0AqNoN-zhA'},
                    {img:'instagramsvg.svg',text:'Instagram',to:''}
                ],
                apps:[
                    {img:'app-store.png',text:'Iphone'},
                    {img:'playstore.png',text:'Android'}
                ],
            }
        },
        methods: {
            method(){

            }
        },
    }
</script>

<style lang="scss" scoped>
    .decoracion{
        text-decoration: underline;
        text-decoration-color: #005598;
        transition-delay: 2s;
        transition-duration: 1s;
    }
</style>