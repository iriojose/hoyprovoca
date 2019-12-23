<template>
    <div>
        <div v-for="subgrupo in sgrupos" :key="subgrupo.id">
            <div class="headline ml-12 mt-12 font-weight-black">{{subgrupo.nombre}}</div>
            <v-slide-group
                show-arrows
                class="my-5"
            >
                <v-slide-item
                    v-for="concepto in  conceptos"
                    :key="concepto.id"
                    class="mx-2 mb-10 mt-5"
                >
                    <v-hover v-slot:default="{hover}"  
                        v-if="concepto.subgrupos_id == subgrupo.id"
                    >
                        <v-card 
                            :title="concepto.nombre" 
                            tile 
                            height="300" 
                            width="200" 
                            :elevation="hover ? 15:5"
                        >
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
import {mapState,mapActions} from 'vuex';

    export default {
        props:{//props que vienen de empresaData
            conceptos:{
                type:Array,
                dafault:() => []
            },
            subgrupos:{
                type:Array,
                default: () => []
            },
            grupos:{
                type:Array,
                default: () => []
            },
            selectGrupo:{
                type:Number,
                default:0
            },
            selectSubgrupo:{
                type:Number,
                default:0
            }
        },
        watch:{
            selectGrupo(){
                this.sgrupos= [];//reincio de variable

                for (let i=0; i < this.subgrupos.length; i++) {
                    if(this.subgrupos[i].grupos_id == this.selectGrupo){
                       this.sgrupos.push(this.subgrupos[i]);
                   }
                }
                console.log(this.sgrupos);
            },

            selectSubgrupo(){
                this.sgrupos= [];//reincio de variable
                
                for (let i = 0; i < this.subgrupos.length; i++) {
                    if(this.selectSubgrupo == this.subgrupos[i].id){
                        this.sgrupos.push(this.subgrupos[i]); 
                    }
                }
                console.log(this.sgrupos);
            },

            subgrupos(){
                this.sgrupos=this.subgrupos;
            }
        },
        components:{
            DialogConceptos
        },
        data() {
            return {
                item:null,
                model:1,
                sgrupos:[]
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

<style lang="css" scope>
    .ribbon {
        width: 0px;
        height: 80px;
        border-left: 50px solid #d9534f;
        border-right: 50px solid #d9534f;
        border-bottom: 35px solid transparent;
    }
</style>