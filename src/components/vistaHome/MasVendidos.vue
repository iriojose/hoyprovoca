<template>
    <v-sheet
        class="my-10 mx-6"
        elevation="0"
        width="95%"
        height="270"
    >
        <p class="px-5 title font-weight-medium">
            {{title}}
        </p>
        <v-slide-group
            v-model="model"
            show-arrows
        >
            <v-slide-item
                v-for="item in sabled"
                :key="item.id"
            >
                <v-hover v-slot:default="{ hover }">
                    <v-img width="200" height="200" :src="item.img" contain>
                        <v-fade-transition>
                            <v-overlay
                                v-if="hover"
                                absolute
                                color="#036358"
                            >
                                <div class="mb-5 text-center">
                                    <v-btn class="text-capitalize">Vista ràpida</v-btn>
                                </div>
                                <div>
                                    <v-btn class="text-capitalize">Agregar al carrito</v-btn>
                                </div>
                            </v-overlay>
                        </v-fade-transition>
                    </v-img>
                </v-hover>
            </v-slide-item>
        </v-slide-group>
    </v-sheet>
</template>

<script>
    export default {
        props:{
            conceptos:{
                type:Array,
                default:() => ([])
            },
            title:{
                type:String,
                default:''
            }
        },

        data() {
            return {
                model:1,
                dialog:false,
                sabled:[
                    {
                        id:1,
                        item:false,
                        precio:'5$',
                        nombre:'Cerveza Corona',
                        oferta:true,
                        img:'https://www.achocom.net/server/Portal_0015185/img/products/xiaomi-redmi-note-7-4gb64gb-dual-sim-negro_8265115_xxl.jpg'
                    },
                    {
                        id:2,
                        item:true,
                        precio:'20$',
                        nombre:'Yogurt',
                        oferta:false,
                        img:'https://www.stickpng.com/assets/images/588526fb6f293bbfae451a3a.png'
                    },
                    {
                        id:3,
                        item:true,
                        precio:'3$',
                        nombre:'Pepito Luchon',
                        oferta:true,
                        img:'https://www.fourjay.org/myphoto/f/0/3981_laptop-png.png'
                    },
                    {
                        id:4,
                        item:false,
                        precio:'3$',
                        nombre:'Galleta Maria',
                        oferta:false,
                        img:'https://www.partesdel.com/wp-content/uploads/Partes-del-Televisor...jpg'
                    },
                    {
                        id:5,
                        item:false,
                        precio:'5$',
                        nombre:'Desinfectante',
                        oferta:true,
                        img:'https://images-na.ssl-images-amazon.com/images/I/91DK0S6RvhL._SX425_.jpg'
                    },

                    {
                        id:6,
                        item:false,
                        precio:'5$',
                        nombre:'Grupo de limpieza',
                        oferta:false,
                        img:'https://http2.mlstatic.com/televisor-smartv-lg-32-pulgadas-D_NQ_NP_689874-MLV31253038511_062019-Q.jpg'
                    },
                    {
                        id:7,
                        item:false,
                        precio:'5$',
                        nombre:'Grupo de limpieza',
                        oferta:false,
                        img:'https://www.achocom.net/server/Portal_0015185/img/products/xiaomi-redmi-note-7-4gb64gb-dual-sim-negro_8265115_xxl.jpg'
                    },
                ]
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>