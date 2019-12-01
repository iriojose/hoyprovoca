<template>
    <div>
        <div v-for="n in 4" :key="n">
            <div class="font-weight-bold title mt-5 mx-8">
                Promociones
            </div>
            <v-sheet
                elevation="0"
                color="#f5f5f5"
            >
                <v-slide-group
                    center-active
                    show-arrows
                    class="pa-2"
                    v-model="model"
                >
                    <v-slide-item
                        v-for="item in sabled"
                        :key="item.nombre"
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
                                    :src="item.img" 
                                    contain 
                                    width="200" 
                                    height="200"
                                    :gradient="hover ? ' rgba(255,255,255,0.2), rgba(215,215,215,0.9)':null"
                                >
                                    <div class="mt-5 mx-2 divsito  text-center" v-if="item.item">
                                        <span class="white--text caption">Agotado</span>
                                    </div>
                                    <div class="mt-5 mx-2 divsito2  text-center" v-if="!item.item && item.oferta">
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
                                                :disabled="item.item "
                                                @click="change(item)"
                                            >
                                                Agregar
                                            </v-btn>
                                        </v-scale-transition>
                                    </v-row>
                                </v-img>
                                <div>
                                    <span :class="item.oferta ? 'font-weight-bold subtitle mx-2 decoration grey--text':'font-weight-bold subtitle mx-2'">{{item.precio}}</span>
                                    <span class="font-weight-bold subtitle mx-2 red--text" v-if="item.oferta">1$</span>
                                </div>
                                <div>
                                    <span class="font-weight-bold body-1 mx-2">{{item.nombre}}</span>
                                </div>
                                <div>
                                    <span class="font-weight-bold caption grey--text mx-2">Descripcion del producto</span>
                                </div>
                            </v-card>
                        </v-hover>
                    </v-slide-item>
                </v-slide-group>
            </v-sheet>
        </div>

        <DialogProducto />
    </div>
</template>

<script>
import DialogProducto from '@/components/vistaAliados/DialogProducto';
import {mapState,mapActions} from 'vuex';

    export default {
        components:{
            DialogProducto
        },
        data() {
            return {
                item:null,
                model:1,
                sabled:[
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
                    {
                        item:false,
                        precio:'5$',
                        nombre:'Desinfectante',
                        oferta:true,
                        img:'https://png.pngtree.com/png-clipart/20190225/ourmid/pngtree-cleaning-products-on-transparent-background-png-image_704301.jpg'
                    },

                    {
                        item:false,
                        precio:'5$',
                        nombre:'Grupo de -1',
                        oferta:false,
                        img:'https://png.pngtree.com/png-clipart/20190225/ourmid/pngtree-cleaning-products-on-transparent-background-png-image_704301.jpg'
                    },
                    {
                        item:true,
                        precio:'5$',
                        nombre:'Grupo de 0',
                        oferta:false,
                        img:'http://sophimania.pe/media/images/2016/08/limpieza.png'
                    },
                    {
                        item:true,
                        precio:'5$',
                        nombre:'Grupo de 1',
                        oferta:false,
                        img:'http://sophimania.pe/media/images/2016/08/limpieza.png'
                    },
                    {
                        item:false,
                        precio:'5$',
                        nombre:'Grupo de 2',
                        oferta:false,
                        img:'http://sophimania.pe/media/images/2016/08/limpieza.png'
                    },
                    {
                        item:false,
                        precio:'5$',
                        nombre:'Grupo de 3',
                        oferta:false,
                        img:'http://sophimania.pe/media/images/2016/08/limpieza.png'
                    },
                ]
            }
        },
        computed: {
            ...mapState(['dialog']),
        },
        methods: {
            ...mapActions(['setDialog','setProducto']),

            change(item){
                this.setProducto(item);
                this.setDialog(true);
            },
        },
    }
</script>

<style scoped>
    .back{
        background-color:white;
    }
    .divsito{
        background-color: #E57373;
        border-radius: 40%;
        width: 44%;
    }

    .divsito2{
        background-color: rgba(44, 46, 48, 0.801);
        border-radius: 40%;
        width: 40%;
    }

    .decoration{
        text-decoration: line-through;
    }
</style>