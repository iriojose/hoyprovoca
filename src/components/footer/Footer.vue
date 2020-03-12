<template>
    <v-sheet>
        <PreFooter />
        <v-divider />

        <v-sheet class="py-4">
            <v-row justify="center" align="center" class="fill-height">
                <v-col cols="12" md="3" sm="6">

                </v-col>
            </v-row>
            <v-row align="baseline">
                <v-col cols="12" md="3" sm="6">
                    <div class="text-center subtitle-1 font-weight-bold">Categorias</div>
                    <v-list dense rounded>
                        <v-list-item @click="method" dense v-for="categoria in categorias" :key="categoria.text">
                            <v-hover v-slot:default="{hover}">
                                <v-list-item-title :class="hover ? 'decoracion text-center':'text-center'">
                                    {{categoria.text}}
                                </v-list-item-title>
                            </v-hover>
                        </v-list-item>
                    </v-list>
                </v-col>

                <v-col cols="12" md="3" sm="6">
                    <div class="text-center subtitle-1 font-weight-bold">Informaciòn de interes</div>
                    <v-list dense rounded>
                        <v-list-item @click="method" dense v-for="interes in intereses" :key="interes.text">
                            <v-hover v-slot:default="{hover}">
                                <v-list-item-title :class="hover ? 'decoracion text-center':'text-center'">
                                    {{interes.text}}
                                </v-list-item-title>
                            </v-hover>
                        </v-list-item>
                    </v-list>
                </v-col>

                <v-col cols="12" md="3" sm="6">
                    <div class="text-center subtitle-1 font-weight-bold">Descarga la app</div>
                    <v-list dense rounded>
                        <v-list-item class="text-center" @click="method" dense v-for="app in apps" :key="app.text">
                            <v-list-item-title></v-list-item-title>
                                <v-list-item-avatar size="25">
                                    <v-img :src="require('@/assets/'+app.img)"/>
                                </v-list-item-avatar>
                                <v-list-item-title>{{app.text}}</v-list-item-title>
                            <v-list-item-title></v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-col>

                <v-col cols="12" md="3" sm="6">
                    <div class="text-center subtitle-1 font-weight-bold">Redes sociales</div>
                    <v-list dense rounded>
                        <v-list-item class="text-center" @click="method" dense v-for="red in redes" :key="red.text" :href="red.to">
                            <v-list-item-title></v-list-item-title>
                                <v-list-item-avatar size="25">
                                    <v-img :src="require('@/assets/'+red.img)"/>
                                </v-list-item-avatar>
                                <v-list-item-title>{{red.text}}</v-list-item-title>
                            <v-list-item-title></v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-col>
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