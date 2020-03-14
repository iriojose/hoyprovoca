<template>
    <v-sheet>
        <PreFooter />
        <v-divider />

        <v-sheet class="py-4 px-12">
            <v-row align="baseline" justify="center" class="fill-height px-10"> 
                <v-col cols="12" md="2" sm="6">
                    <v-list class="font-weight-black">
                        <div class="text-center subtitle-2 grey--text">Categorías</div>
                        <v-list-item dense v-for="(categoria,i) in categorias" :key="i">
                            <v-list-item-title class="text-center">
                                {{categoria.text}}
                            </v-list-item-title>
                        </v-list-item>
                    </v-list>
    
                </v-col>
                <v-col cols="12" md="4" sm="6">
                    <v-list dense>
                        <div class="text-center subtitle-2 grey--text">Informaciòn de interes</div>
                        <v-list-item dense v-for="(interes,i) in intereses" :key="i">
                            <v-list-item-title class="text-center">
                                {{interes.text}}
                            </v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-col>

                <v-col cols="12" md="2" sm="6">
                    <v-list dense rounded>
                        <div class="text-center subtitle-2 grey--text">Descarga la app</div>
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
            <v-row align="center" justify="center" class="fill-height pt-4">
                <v-btn width="40" height="40" elevation="0" fab class="mx-2" v-for="(red,i) in redes" :key="i">
                    <a :href="red.to">
                        <v-img contain width="40" height="40" :src="require('@/assets/'+red.img)"></v-img>
                    </a>
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
                    {img:'svgfacebook.svg',text:'Facebbok',to:'https://es-la.facebook.com/somossistemasca'},
                    {img:'svgyoutu.svg',text:'YouTube',to:'https://www.youtube.com/channel/UCRxWOVR7AVYep0AqNoN-zhA'},
                    {img:'instagramsvg.svg',text:'Instagram',to:'https://www.instagram.com/somossistemas/?hl=es-la'}
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
