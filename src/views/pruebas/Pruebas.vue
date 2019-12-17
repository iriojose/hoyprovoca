<template>
    <div>
    <!--Navbar -->
        <v-app-bar :elevation="$vuetify.breakpoint.smAndDown ? 0:null" :elevate-on-scroll="$vuetify.breakpoint.smAndDown ? false:true" fade-img-on-scroll app color="#005598">

            <v-app-bar-nav-icon dark @click="method"></v-app-bar-nav-icon>

            <v-toolbar-title class="mx-5" to="/">
                <v-img contain width="120" height="120" src="@/assets/logo2.png"></v-img>
            </v-toolbar-title>

            <v-text-field
                v-model="busqueda"
                label="Buscar producto..."
                prepend-inner-icon="search"
                clearable
                hide-details
                dense 
                outlined
                class="hidden-sm-and-down ml-10"
                background-color="#f7f7f7"
                color="#006788"
                single-line
            />

            <v-spacer></v-spacer>
            <v-divider dark vertical class="hidden-sm-and-down mx-2"></v-divider>
            
            <v-btn icon class="mx-2">
                <v-badge transition="fade-transition" color="teal" left overlap>
                    <v-icon size="25" color="#fff">notifications</v-icon>
                    <template v-slot:badge>
                        0
                    </template>
                </v-badge>
            </v-btn>


            <v-btn icon class="mx-2">
                <v-badge transition="fade-transition" color="teal" left overlap>
                    <v-icon size="25" color="#fff">shopping_cart</v-icon>
                    <template v-slot:badge>
                        0
                    </template>
                </v-badge>
            </v-btn>


            <v-avatar color="#f5f5f5" size="40" class="mx-2 elevation-3">
                <v-btn icon>
                    <v-icon>person</v-icon>
                </v-btn>
            </v-avatar>
        </v-app-bar>
    <!--buscador window sm -->
        <v-toolbar color="#005598" width="100%" class="px-5 fix" v-if="$vuetify.breakpoint.smAndDown">
            <v-text-field
                v-model="busqueda"
                label="Buscar producto..."
                prepend-inner-icon="search"
                clearable
                hide-details
                dense 
                outlined
                background-color="#f7f7f7"
                color="#005598"
                single-line
            />
        </v-toolbar>
    <!--Banner inicial -->
        <Banner />

    <!--Productos mas vendidos -->
        <div class="headline ml-12 mt-12 font-weight-black">Productos mas vendidos</div>
        <v-slide-group
            show-arrows
            class="my-5"
        >
            <v-slide-item
                v-for="concepto in  conceptos"
                :key="concepto.id"
                class="mx-4"
            >
                <v-hover v-slot:default="{hover}">
                    <v-card height="200" width="200" :elevation="hover ? 10:4">
                        <v-img contain height="200" width="200" :src="concepto.img">
                            <div v-if="!hover" class="modif text-center">{{concepto.nombre+' '}}{{concepto.precio}}</div>
                            <transition class="scale-transition" v-else>
                                <v-overlay
                                    absolute
                                    color="#036358"
                                >
                                    <div class="mb-5 text-center">
                                        <v-btn 
                                            class="text-capitalize caption"
                                        >
                                            Vista ràpida
                                        </v-btn>
                                    </div>
                                    <div>
                                        <v-btn  
                                            class="text-capitalize caption"
                                        >
                                            Agregar al carrito
                                        </v-btn>
                                    </div>
                                </v-overlay>
                            </transition>
                        </v-img>
                    </v-card>
                </v-hover>
            </v-slide-item>
        </v-slide-group>

    <!--Promociones -->
        <v-divider class="my-12"></v-divider>
        <div class="headline ml-12 mt-12 font-weight-black">Promociones de la semana</div>
        <v-slide-group
            show-arrows
            class="my-5"
        >
            <v-slide-item
                v-for="promocion in  promociones"
                :key="promocion.id"
                class="mx-4"
            >
                <v-hover v-slot:default="{hover}">
                    <v-card tile color="transparent" height="250" width="400" elevation="0">
                        <v-img contain height="250" width="400" :src="promocion.img"/>
                    </v-card>
                </v-hover>
            </v-slide-item>
        </v-slide-group>
    
    <!--Categorias-->
        <v-divider class="my-12"></v-divider>
        <div class="headline ml-12 mt-12 font-weight-black">Categorias mas buscadas</div>
        <v-slide-group
            show-arrows
            class="my-5 py-5"
        >
            <v-slide-item
                v-for="categoria in  categorias2"
                :key="categoria.id"
                class="mx-4"
            >
                <v-hover v-slot:default="{hover}">
                    <v-card height="250" width="300" elevation="10">
                        <v-card-text>
                            <v-img contain :src="categoria.img"/>
                        </v-card-text>
                    </v-card>
                </v-hover>
            </v-slide-item>
        </v-slide-group>

    <!--Sugerencias de tiendas-->
        <v-divider class="my-12"></v-divider>
        <div class="headline ml-12 mt-12 font-weight-black">Visita nuestras tiendas</div>
        <v-slide-group
            show-arrows
            class="my-5 py-5"
        >
            <v-slide-item
                v-for="categoria in  categorias2"
                :key="categoria.id"
                class="mx-4"
            >
                <v-hover v-slot:default="{hover}">
                    <v-card height="250" width="300" elevation="10">
                        <v-card-text>
                            <v-img contain :src="categoria.img"/>
                        </v-card-text>
                    </v-card>
                </v-hover>
            </v-slide-item>
        </v-slide-group>

        
    </div>
</template>

<script>
import Banner from '@/components/vistaHome/Banner';

    export default {
        components:{
            Banner,
        },
        data() {
            return {
                model:0,
                busqueda:'',
                conceptos:[
                    {
                        id:1,
                        precio:'5$',
                        nombre:'Cerveza Corona',
                        img:'https://www.achocom.net/server/Portal_0015185/img/products/xiaomi-redmi-note-7-4gb64gb-dual-sim-negro_8265115_xxl.jpg'
                    },
                    {
                        id:2,
                        precio:'20$',
                        nombre:'Yogurt',
                        img:'https://www.stickpng.com/assets/images/588526fb6f293bbfae451a3a.png'
                    },
                    {
                        id:3,
                        precio:'3$',
                        nombre:'Pepito Luchon',
                        img:'https://www.fourjay.org/myphoto/f/0/3981_laptop-png.png'
                    },
                    {
                        id:4,
                        precio:'3$',
                        nombre:'Galleta Maria',
                        img:'https://www.partesdel.com/wp-content/uploads/Partes-del-Televisor...jpg'
                    },
                    {
                        id:5,
                        precio:'5$',
                        nombre:'Desinfectante',
                        img:'https://images-na.ssl-images-amazon.com/images/I/91DK0S6RvhL._SX425_.jpg'
                    },

                    {
                        id:6,
                        precio:'5$',
                        nombre:'Grupo de limpieza',
                        img:'https://http2.mlstatic.com/televisor-smartv-lg-32-pulgadas-D_NQ_NP_689874-MLV31253038511_062019-Q.jpg'
                    },
                ],
                promociones:[
                    {
                        id:1,
                        img:'https://pbs.twimg.com/media/ELByGkbX0AMtMrh.jpg'
                    },
                    {
                        id:2,
                        img:'https://comoorganizarlacasa.com/wp-content/uploads/2018/04/ofertas-en-tiendas-1.jpg'
                    },
                    {
                        id:3,
                        img:'https://i1.wp.com/webadictos.com/media/2019/08/tienda-de-huawei-en-linio.png?fit=800%2C381&ssl=1'
                    },
                    {
                        id:4,
                        img:'https://cdn.pixabay.com/photo/2016/03/21/20/04/black-1271449_960_720.png'
                    },
                    {
                        id:5,
                        img:'http://www.gruges.com.mx/wordpress/wp-content/uploads/2018/05/PROMOCION-TIENDAS-COCA-SIN-AZULCAR-web.jpg'
                    },
                    {
                        id:6,
                        img:'https://thumbs.dreamstime.com/z/etiquetas-de-la-venta-de-la-navidad-fijadas-para-las-promociones-de-la-tienda-de-la-estaci%C3%B3n-de-la-navidad-74217278.jpg'
                    },
                ],
                categorias2:[
                    {
                        id:1,
                        nombre:'Ropa',
                        img:'https://cdn.pixabay.com/photo/2015/03/26/09/41/tie-690084_960_720.jpg'
                    },
                    {
                        id:2,
                        nombre:'Tecnologia',
                        img:'https://cdn.pixabay.com/photo/2015/12/27/05/48/turntable-1109588_960_720.jpg'
                    },
                    {
                        id:3,
                        nombre:'Supermercado',
                        img:'https://cdn.pixabay.com/photo/2014/10/28/22/19/supermarket-507295_960_720.jpg'
                    },
                    {
                        id:4,
                        nombre:'Restaurantes',
                        img:'https://cdn.pixabay.com/photo/2017/12/09/08/18/pizza-3007395_960_720.jpg'
                    },
                ]
            }
        },
        methods: {
            method(){

            }
        },
    }
</script>

<style scope>
    .color{
        color:#fff;
    }

    .fix{
        position:fixed;
        z-index:3;
        top: 56px;
    }

    .modif{
        width: 100%;
        height: 40px;
        background: rgba(0,0,0,0.5);
        color: #fff;
        padding-top: 10px;
    }
</style>