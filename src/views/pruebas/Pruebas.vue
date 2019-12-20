<template>
    <div>
    <!--nuevo slider -->
        <v-divider class="my-12"></v-divider>
        <div class="headline ml-12 mt-12 font-weight-black">Categoria</div>
        <v-slide-group
            show-arrows
            class="my-5"
        >
            <v-slide-item
                v-for="concepto in  conceptos"
                :key="concepto.id"
                class="mx-2 mb-10 mt-5"
            >
                <v-hover v-slot:default="{hover}">
                    <v-card :title="concepto.nombre" tile height="300" width="200" :elevation="hover ? 15:5">
                        <v-img 
                            height="220" 
                            width="200" 
                            contain 
                            :src="concepto.imagen"
                            :gradient="hover ? 'to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)':null"
                        >
                            <v-row
                                v-if="hover"
                                class="fill-height"
                                align="center"
                                justify="center"
                            >
                                <v-scale-transition>
                                    <v-btn  
                                        color="#005598"
                                        dark
                                        width="50%"
                                        class="text-capitalize body font-weight-bold"
                                    >
                                        Agregar
                                    </v-btn>
                                </v-scale-transition>
                            </v-row>
                        </v-img>
                        <v-divider></v-divider>
                        <div class="text-center mt-2">
                            <div class="body display-inline text-truncate font-weight-black">
                                Bss. {{concepto.precio}}
                            </div>
                            <div class="body display-inline text-truncate font-weight-bold">
                                {{concepto.nombre}}
                            </div>
                            <div class="caption grey--text display-inline text-truncate font-weight-bold">
                                {{concepto.nombre}}
                            </div>
                        </div>
                    </v-card>  
                </v-hover>
            </v-slide-item>
        </v-slide-group>    
    </div>
</template>

<script>
    export default {
        data() {
            return {
                conceptos:[
                    {
                        id:1,
                        tipo_conceptos:1,
                        nombre:'Producto especial',
                        precio:200000,
                        grupos_id:1,
                        subgrupos_id:1,
                        imagen:'https://www.quillayes.cl/wp-content/uploads/2019/04/producto-2019-1.jpg',
                    },
                    {
                        id:2,
                        tipo_conceptos:1,
                        nombre:'Producto mas especial',
                        precio:100000,
                        grupos_id:1,
                        subgrupos_id:1,
                        imagen:'https://www.yakult.com.mx/wp-content/uploads/2018/04/productos-banner-1.jpg',
                    },
                    {
                        id:3,
                        tipo_conceptos:1,
                        nombre:'Producto',
                        precio:40000,
                        grupos_id:1,
                        subgrupos_id:1,
                        imagen:'https://eidetesa.com/wp-content/uploads/2019/01/producto-eidetesa-linea-palmera-salvado-trigo-full.png',
                    },
                    {
                        id:4,
                        tipo_conceptos:1,
                        nombre:'Producto especial',
                        precio:25000,
                        grupos_id:1,
                        subgrupos_id:1,
                        imagen:'https://www.instyle.es/medio/2018/03/13/nivea-body-milk-nutritivo-piel-seca-y-muy-seca_2e229f7e.jpg',
                    },
                    {
                        id:5,
                        tipo_conceptos:1,
                        nombre:'Producto especial',
                        precio:13000,
                        grupos_id:1,
                        subgrupos_id:1,
                        imagen:'https://www.lamoderna.com.mx/components/com_catalogo/images/producto-pastas.png',
                    },
                    {
                        id:6,
                        tipo_conceptos:1,
                        nombre:'Producto especial',
                        precio:56000,
                        grupos_id:1,
                        subgrupos_id:1,
                        imagen:'https://bimbousa.com/sites/default/files/styles/teaser_products/public/product_sweet_bread_bimbo/Productos-donas-azucaradas-12-unidades-Bimbo-2.png?itok=D256mxJf',
                    },
                    {
                        id:7,
                        tipo_conceptos:1,
                        nombre:'Producto especial',
                        precio:32000,
                        grupos_id:1,
                        subgrupos_id:1,
                        imagen:'https://www.hola.com/imagenes/belleza/caraycuerpo/20191204155526/farmaceuticas-cremas-cosmeticos-favoritos/0-754-733/mar-productos-z.jpg',
                    },
                    {
                        id:8,
                        tipo_conceptos:1,
                        nombre:'Producto especial',
                        precio:29000,
                        grupos_id:1,
                        subgrupos_id:1,
                        imagen:'https://bellezacheck.com/wp-content/uploads/0750955245555-2-300x300.jpg',
                    },
                ]
            }
        },
    }
</script>