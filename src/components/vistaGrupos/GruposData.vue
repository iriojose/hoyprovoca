<template>
    <div :class="$vuetify.breakpoint.smAndDown ? 'mx-2 pt-10':'mx-10'">
        <div v-for="(subgrupo,i) in subgrupos" :key="subgrupo.id">
            <div class="headline ml-12 mt-12 font-weight-black">{{subgrupo.nombre}}</div>
            <v-slide-group
                show-arrows
                class="my-5"
            >
                <v-slide-item
                    v-for="concepto in conceptos[i]"
                    :key="concepto.id"
                    class="mx-2 mb-10 mt-5"
                >
                    <v-hover v-slot:default="{hover}">
                        <v-card :title="concepto.nombre" tile height="300" width="200" :elevation="hover ? 15:5">
                            <v-img 
                                v-if="!concepto.imagen"
                                height="220" 
                                width="200" 
                                contain 
                                :src="concepto.imagen"
                                :gradient="hover ? 'to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)':null"
                            >
                                <!-- <div class="ribbon" v-if="concepto.agotado">
                                    <v-icon color="#fff">schedule</v-icon>
                                </div>-->
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
                            <!--cuando no tiene imagen -->
                            <v-img  
                                v-else
                                height="220" 
                                width="200" 
                                contain 
                                src="@/assets/noimage.png"
                                :gradient="hover ? 'to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)':null"
                            >
                                <!-- <div class="ribbon" v-if="concepto.agotado">
                                    <v-icon color="#fff">schedule</v-icon>
                                </div>-->
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
                                    BsS. {{concepto.precio_a}}
                                </div>
                                <div class="body display-inline text-truncate font-weight-bold">
                                    {{concepto.nombre}}
                                </div>
                                <div class="caption grey--text display-inline text-truncate font-weight-bold">
                                    {{concepto.descripcion}}
                                </div>
                            </div>
                        </v-card>  
                    </v-hover>
                </v-slide-item>
            </v-slide-group>  
        </div> 
        <DialogConceptos />
    </div>
</template>

<script>
import DialogConceptos from '@/components/dialogs/DialogConceptos';

    export default {
        components:{
            DialogConceptos
        },
        props:{
            subgrupos:{
                type:Array,
                default: () => ([])
            },
            conceptos:{
                type:Array,
                default: () => ([])
            }
        },
        data() {
            return {
                model:1,
                loading:true
            }
        },
    }
</script>
