<template>
    <div>
        <AppBar />
        <v-row :class="$vuetify.breakpoint.smAndDown ? 'mt-12':null">
            <v-col cols="12" md="12" lg="3" sm="12">
                <Filtros />
            </v-col>

            <v-col cols="12" lg="9" md="12" sm="12">
                <v-sheet class="mx-4 my-3 pa-4" elevation="2" height="200">
                    <h3 class="headline text-center mb-3">Resultados:</h3>
                    <v-slide-group show-arrows class="space">
                        <v-slide-item
                            v-for="resultado in resultados" 
                            :key="resultado.local" 
                        >
                            <v-hover v-slot:default="{hover}">
                                <v-avatar v-ripple @click="push(resultado.local)" :class="hover ? 'mx-4 elevation-4':'mx-4 elevation-2'" size="80">
                                    <v-img :src="resultado.img" />
                                </v-avatar>
                            </v-hover>
                        </v-slide-item>
                    </v-slide-group>
                </v-sheet>

                <v-sheet elevation="0" class="ma-4" v-for="resultado in resultados" :key="resultado.local">
                    <v-row>
                        <v-col cols="12" md="3" sm="3" lg="3"  class="ma-4 px-8">
                            <v-avatar class="elevation-3" size="80">
                                <v-img :src="resultado.img" />
                            </v-avatar>
                            <h6 class="subtitle-1 font-weight-bolt">{{resultado.local}}</h6>
                        </v-col>
                    </v-row>
                    
                    <v-slide-group
                        center-active
                        show-arrows
                        class="pa-2"
                        v-model="model"
                    >
                        <v-slide-item
                            v-for="producto in resultado.productos"
                            :key="producto.nombre"
                        >
                            <v-hover v-slot:default="{hover}">
                                <v-card 
                                    color=""
                                    :elevation="hover ? '5':'2'"
                                    class="ma-2"
                                    height="300"
                                    width="200"
                                >
                                    <v-img 
                                        :src="producto.img" 
                                        contain 
                                        width="200" 
                                        height="200"
                                        :gradient="hover ? ' rgba(255,255,255,0.2), rgba(215,215,215,0.9)':null"
                                    >
                                        <div class="mt-5 mx-2 divsito  text-center" v-if="producto.item">
                                            <span class="white--text caption">Agotado</span>
                                        </div>
                                        <div class="mt-5 mx-2 divsito2  text-center" v-if="!producto.item && producto.oferta">
                                            <span class="white--text caption">Promoción</span>
                                        </div>
                                        <v-row
                                            class="fill-height"
                                            align="center"
                                            justify="center"
                                        >
                                            <v-scale-transition>
                                                <v-btn 
                                                    v-if="hover" 
                                                    color="green" 
                                                    elevation="1" 
                                                    dark
                                                    :disabled="producto.item "
                                                    
                                                >
                                                    Agregar
                                                </v-btn>
                                            </v-scale-transition>
                                        </v-row>
                                    </v-img>
                                    <div>
                                        <span :class="producto.oferta ? 'font-weight-bold subtitle mx-2 decoration grey--text':'font-weight-bold subtitle mx-2'">{{producto.precio}}</span>
                                        <span class="font-weight-bold subtitle mx-2 red--text" v-if="producto.oferta">1$</span>
                                    </div>
                                    <div>
                                        <span class="font-weight-bold body-1 mx-2">{{producto.nombre}}</span>
                                    </div>
                                    <div>
                                        <span class="font-weight-bold caption grey--text mx-2">Descripcion del producto</span>
                                    </div>
                                </v-card>
                            </v-hover>
                        </v-slide-item>
                    </v-slide-group>
                </v-sheet>
            </v-col>
        </v-row>
        <Footer />
    </div>
</template>

<script>
import AppBar from '@/components/navbar/AppBar';
import Footer from '@/components/footer/Footer';
import Filtros from '@/components/vistaBuscar/Filtros';
import router from '@/router';

    export default {
        components:{
            AppBar,
            Footer,
            Filtros
        },
        data() {
            return {
                active:false,
                resultados:[
                    {
                        local:'Vinaya',
                        img:'https://images-platform.99static.com/ItiGoOLrW3CDJ4T7CurB3BFixUQ=/500x500/top/smart/99designs-contests-attachments/37/37329/attachment_37329415',
                        productos:[
                            {
                                item:false,
                                precio:'5$',
                                nombre:'Cerveza Corona',
                                oferta:true,
                                img:'https://upload.wikimedia.org/wikipedia/commons/9/99/Cerveza-corona-bavaria-productos-colombianos.png'
                            },
                            {
                                item:true,
                                precio:'20$',
                                nombre:'Yogurt',
                                oferta:false,
                                img:'https://my7.digitalexperience.ibm.com/1285e1d2-5151-4eab-9da2-775291879cb9/dxresources/a03c/a03c0636-a5a0-4f4f-8e48-5b47a81b04a9.png?resize=450px%3A450px&crop=450%3A450%3B0%2C0'
                            },
                            {
                                item:true,
                                precio:'3$',
                                nombre:'Pepito Luchon',
                                oferta:true,
                                img:'http://www.totis.com.mx/wp-content/uploads/luchones-cat-mobile.png'
                            },
                            {
                                item:false,
                                precio:'3$',
                                nombre:'Galleta Maria',
                                oferta:false,
                                img:'https://images.squarespace-cdn.com/content/v1/595a795e414fb53f397969f6/1560869332786-KEKUV9VZGA8T57XGES7C/ke17ZwdGBToddI8pDm48kFQQgP34qnCpeHaeAOzTt7pZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZamWLI2zvYWH8K3-s_4yszcp2ryTI0HqTOaaUohrI8PIedjZT6_OBzi2ofH1EqNdNeCRxNMlbxs9807lIebBlcA/productos-maria.png'
                            },
                        ]
                    },
                    {
                        local:'Online Shopping',
                        img:'https://image.freepik.com/vector-gratis/tienda-online-logo_20448-98.jpg',
                        productos:[
                            {
                                item:false,
                                precio:'5$',
                                nombre:'Cerveza Corona',
                                oferta:true,
                                img:'https://upload.wikimedia.org/wikipedia/commons/9/99/Cerveza-corona-bavaria-productos-colombianos.png'
                            },
                            {
                                item:true,
                                precio:'20$',
                                nombre:'Yogurt',
                                oferta:false,
                                img:'https://my7.digitalexperience.ibm.com/1285e1d2-5151-4eab-9da2-775291879cb9/dxresources/a03c/a03c0636-a5a0-4f4f-8e48-5b47a81b04a9.png?resize=450px%3A450px&crop=450%3A450%3B0%2C0'
                            },
                            {
                                item:true,
                                precio:'3$',
                                nombre:'Pepito Luchon',
                                oferta:true,
                                img:'http://www.totis.com.mx/wp-content/uploads/luchones-cat-mobile.png'
                            },
                            {
                                item:false,
                                precio:'3$',
                                nombre:'Galleta Maria',
                                oferta:false,
                                img:'https://images.squarespace-cdn.com/content/v1/595a795e414fb53f397969f6/1560869332786-KEKUV9VZGA8T57XGES7C/ke17ZwdGBToddI8pDm48kFQQgP34qnCpeHaeAOzTt7pZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZamWLI2zvYWH8K3-s_4yszcp2ryTI0HqTOaaUohrI8PIedjZT6_OBzi2ofH1EqNdNeCRxNMlbxs9807lIebBlcA/productos-maria.png'
                            },
                        ]
                    },
                    {
                        local:'Git Store',
                        img:'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/gift-store-shop-logo-design-template-08547070312fe744ad0d17aaa549a9dc_screen.jpg?ts=1561472519',
                        productos:[
                            {
                                item:false,
                                precio:'5$',
                                nombre:'Cerveza Corona',
                                oferta:true,
                                img:'https://upload.wikimedia.org/wikipedia/commons/9/99/Cerveza-corona-bavaria-productos-colombianos.png'
                            },
                            {
                                item:true,
                                precio:'20$',
                                nombre:'Yogurt',
                                oferta:false,
                                img:'https://my7.digitalexperience.ibm.com/1285e1d2-5151-4eab-9da2-775291879cb9/dxresources/a03c/a03c0636-a5a0-4f4f-8e48-5b47a81b04a9.png?resize=450px%3A450px&crop=450%3A450%3B0%2C0'
                            },
                            {
                                item:true,
                                precio:'3$',
                                nombre:'Pepito Luchon',
                                oferta:true,
                                img:'http://www.totis.com.mx/wp-content/uploads/luchones-cat-mobile.png'
                            },
                            {
                                item:false,
                                precio:'3$',
                                nombre:'Galleta Maria',
                                oferta:false,
                                img:'https://images.squarespace-cdn.com/content/v1/595a795e414fb53f397969f6/1560869332786-KEKUV9VZGA8T57XGES7C/ke17ZwdGBToddI8pDm48kFQQgP34qnCpeHaeAOzTt7pZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZamWLI2zvYWH8K3-s_4yszcp2ryTI0HqTOaaUohrI8PIedjZT6_OBzi2ofH1EqNdNeCRxNMlbxs9807lIebBlcA/productos-maria.png'
                            },
                        ]
                    },
                    {
                        local:'Vinaya',
                        img:'https://images-platform.99static.com/ItiGoOLrW3CDJ4T7CurB3BFixUQ=/500x500/top/smart/99designs-contests-attachments/37/37329/attachment_37329415',
                        productos:[
                            {
                                item:false,
                                precio:'5$',
                                nombre:'Cerveza Corona',
                                oferta:true,
                                img:'https://upload.wikimedia.org/wikipedia/commons/9/99/Cerveza-corona-bavaria-productos-colombianos.png'
                            },
                            {
                                item:true,
                                precio:'20$',
                                nombre:'Yogurt',
                                oferta:false,
                                img:'https://my7.digitalexperience.ibm.com/1285e1d2-5151-4eab-9da2-775291879cb9/dxresources/a03c/a03c0636-a5a0-4f4f-8e48-5b47a81b04a9.png?resize=450px%3A450px&crop=450%3A450%3B0%2C0'
                            },
                            {
                                item:true,
                                precio:'3$',
                                nombre:'Pepito Luchon',
                                oferta:true,
                                img:'http://www.totis.com.mx/wp-content/uploads/luchones-cat-mobile.png'
                            },
                            {
                                item:false,
                                precio:'3$',
                                nombre:'Galleta Maria',
                                oferta:false,
                                img:'https://images.squarespace-cdn.com/content/v1/595a795e414fb53f397969f6/1560869332786-KEKUV9VZGA8T57XGES7C/ke17ZwdGBToddI8pDm48kFQQgP34qnCpeHaeAOzTt7pZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZamWLI2zvYWH8K3-s_4yszcp2ryTI0HqTOaaUohrI8PIedjZT6_OBzi2ofH1EqNdNeCRxNMlbxs9807lIebBlcA/productos-maria.png'
                            },
                        ]
                    },
                    {
                        local:'Online Shopping',
                        img:'https://image.freepik.com/vector-gratis/tienda-online-logo_20448-98.jpg',
                        productos:[
                            {
                                item:false,
                                precio:'5$',
                                nombre:'Cerveza Corona',
                                oferta:true,
                                img:'https://upload.wikimedia.org/wikipedia/commons/9/99/Cerveza-corona-bavaria-productos-colombianos.png'
                            },
                            {
                                item:true,
                                precio:'20$',
                                nombre:'Yogurt',
                                oferta:false,
                                img:'https://my7.digitalexperience.ibm.com/1285e1d2-5151-4eab-9da2-775291879cb9/dxresources/a03c/a03c0636-a5a0-4f4f-8e48-5b47a81b04a9.png?resize=450px%3A450px&crop=450%3A450%3B0%2C0'
                            },
                            {
                                item:true,
                                precio:'3$',
                                nombre:'Pepito Luchon',
                                oferta:true,
                                img:'http://www.totis.com.mx/wp-content/uploads/luchones-cat-mobile.png'
                            },
                            {
                                item:false,
                                precio:'3$',
                                nombre:'Galleta Maria',
                                oferta:false,
                                img:'https://images.squarespace-cdn.com/content/v1/595a795e414fb53f397969f6/1560869332786-KEKUV9VZGA8T57XGES7C/ke17ZwdGBToddI8pDm48kFQQgP34qnCpeHaeAOzTt7pZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZamWLI2zvYWH8K3-s_4yszcp2ryTI0HqTOaaUohrI8PIedjZT6_OBzi2ofH1EqNdNeCRxNMlbxs9807lIebBlcA/productos-maria.png'
                            },
                        ]
                    },
                    {
                        local:'Git Store',
                        img:'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/gift-store-shop-logo-design-template-08547070312fe744ad0d17aaa549a9dc_screen.jpg?ts=1561472519',
                        productos:[
                            {
                                item:false,
                                precio:'5$',
                                nombre:'Cerveza Corona',
                                oferta:true,
                                img:'https://upload.wikimedia.org/wikipedia/commons/9/99/Cerveza-corona-bavaria-productos-colombianos.png'
                            },
                            {
                                item:true,
                                precio:'20$',
                                nombre:'Yogurt',
                                oferta:false,
                                img:'https://my7.digitalexperience.ibm.com/1285e1d2-5151-4eab-9da2-775291879cb9/dxresources/a03c/a03c0636-a5a0-4f4f-8e48-5b47a81b04a9.png?resize=450px%3A450px&crop=450%3A450%3B0%2C0'
                            },
                            {
                                item:true,
                                precio:'3$',
                                nombre:'Pepito Luchon',
                                oferta:true,
                                img:'http://www.totis.com.mx/wp-content/uploads/luchones-cat-mobile.png'
                            },
                            {
                                item:false,
                                precio:'3$',
                                nombre:'Galleta Maria',
                                oferta:false,
                                img:'https://images.squarespace-cdn.com/content/v1/595a795e414fb53f397969f6/1560869332786-KEKUV9VZGA8T57XGES7C/ke17ZwdGBToddI8pDm48kFQQgP34qnCpeHaeAOzTt7pZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZamWLI2zvYWH8K3-s_4yszcp2ryTI0HqTOaaUohrI8PIedjZT6_OBzi2ofH1EqNdNeCRxNMlbxs9807lIebBlcA/productos-maria.png'
                            },
                        ]
                    },
                ]
            }
        },
        methods: {
            push(val){
                router.push('/aliados/'+val);
            }
        },
    }
</script>

<style scoped>
    .space{
        height: 85px !important;
    }
</style>