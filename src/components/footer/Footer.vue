<template>
    <div class="mt-12">
        <v-sheet elevation="4">
            <v-row justify="space-around" >
                <v-col cols="12" md="4" sm="12" v-for="about in abouts" :key="about.text">
                    <v-img contain width="100%" height="150" :src="require('@/assets/'+about.img)"></v-img>
                    <div class="text-center title font-weight-bold my-4">
                        {{about.text}}
                    </div>
                </v-col>
            </v-row>
        </v-sheet>

        <v-sheet elevation="4">
            <v-row justify="center">
                <v-col cols="12" md="4" sm="12" v-for="(n,i) in 4" :key="i">
                    <div v-if="i == 0">
                        <div v-for="(categoria,e) in categorias" :key="e" class="underline my-5 text-center font-weight-bold">
                            {{categoria.text}}
                        </div>
                    </div>

                    <div v-if="i == 1">
                        <div v-for="(interes,g) in intereses" :key="g" class="underline my-5 text-center font-weight-bold">
                            {{interes.text}}
                        </div>
                    </div>

                    <div v-if="i == 2">
                        <div v-for="(red,f) in redes" :key="f" class="my-5 text-center font-weight-bold">
                            <a :href="red.to" class="underline">
                                <v-avatar size="40" class="mx-2">
                                    <v-img :src="require('@/assets/'+red.img)"></v-img>
                                </v-avatar>
                                {{red.text}}
                            </a>
                        </div>
                    </div>

                    <!--div v-if="i == 3">
                        <div v-for="(categoria,h) in categorias" :key="h" class="underline my-5 text-center font-weight-bold">
                            {{categoria.text}}
                        </div>
                    </div-->
                </v-col>
            </v-row>
        </v-sheet>

        <v-footer class="font-weight-medium" elevation="4" color="#fff">
            <v-col class="text-center" cols="12">
                {{ new Date().getFullYear() }} — <strong>Hoyprovoca</strong>
            </v-col>
        </v-footer>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                abouts:[
                    {img:'pay.svg',text:'Pagos online'},
                    {img:'negocio.svg',text:'Compre en su tienda preferida'},
                    {img:'safe.svg',text:'Privacidad garantizada'},
                ],
                categorias:[
                    {text:'Viveres'},
                    {text:'Farmacia'},
                    {text:'Comida'},
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
                /*apps:[
                    {img:'app-store.png',text:'Iphone'},
                    {img:'playstore.png',text:'Android'}
                ],*/
            }
        },
    }
</script>

<style lang="scss" scoped>
    .underline{
        color:#000;
        text-decoration:none;
        background:#fff;
    }
    .underline:hover{
        cursor:pointer;
        text-decoration:underline;
        background:#fff;
    }
</style>