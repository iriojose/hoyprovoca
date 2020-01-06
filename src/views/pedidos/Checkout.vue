<template>
    <div>
        <v-toolbar width="100%" height="50" color="#005598">
           <v-btn text to="/" disabled>
               <v-img width="120" height="120" src="@/assets/logo2.png" contain></v-img>
           </v-btn>
           <v-spacer></v-spacer>
           <v-btn to="/" text elevation="0" dark class="caption text-capitalize">
               Seguir Comprando
           </v-btn>
        </v-toolbar>

        <v-row :class="$vuetify.breakpoint.smAndDown ? 'mx-3':null"> 
           <v-col cols="12" :offset="$vuetify.breakpoint.smAndDown ? null:1" md="6"> 
               <v-sheet
                    class="mt-10 py-3"
                    elevation="10"
                >
                    <v-slide-group show-arrows>
                        <v-slide-item
                            v-for="n in 0"
                            :key="n"
                            v-slot:default="{ active, toggle }"
                        >
                            <v-btn
                                class="mx-2"
                                :input-value="active"
                                active-class="purple white--text"
                                depressed
                                rounded
                                @click="toggle"
                            >
                                Empresa
                            </v-btn>
                        </v-slide-item>
                    </v-slide-group>
                </v-sheet>

                <v-card elevation="10" class="mt-10 text-center" width="100%">
                    <v-subheader class="title px-10">Articulos</v-subheader>
                    <v-toolbar elevation="0" v-for="n in 0" :key="n">
                        <v-img 
                            width="50" 
                            height="50" 
                            contain 
                            src="@/assets/noimage.png"
                        />
                        <v-spacer></v-spacer>

                        <v-toolbar-title>
                            xiaomi redmi note 7 plus
                        </v-toolbar-title>

                        <v-spacer></v-spacer>

                        <v-btn  class="mx-2" tile icon>
                            <v-icon dark>delete</v-icon>
                        </v-btn>

                        <div class="mx-2 font-weight-black subtitle-1">1</div>

                        <v-btn class="mx-2" tile icon>
                            <v-icon dark>plus_one</v-icon>
                        </v-btn> 
                        <v-spacer></v-spacer>

                        <v-toolbar-title>
                            300000 BsS 
                        </v-toolbar-title>
                        
                        <v-spacer></v-spacer>

                        <v-btn fab color="#005598" width="40" height="40">
                            <v-icon color="#fff">delete</v-icon>
                        </v-btn>
                    </v-toolbar>
                </v-card>
            </v-col>

            <v-col cols="12" md="4" class="mx-3 mt-10">
                <v-card 
                    elevation="10" 
                    :class="$vuetify.breakpoint.smAndDown ? 'py-4':'fix mx-5 py-4'"
                >
                    <div class="text-center title mb-3">
                        Bolivares/Dolares
                    </div>
                    <v-divider></v-divider>
                    <v-row class="px-5">
                        <v-col cols="12" md="6" sm="6">
                            <div class="py-2">0$</div>
                            <v-text-field 
                                solo
                                v-model="bolivar"
                                dense
                                color="#000"
                                hide-details
                                disabled
                                single-line
                                type="number"
                            />
                        </v-col>
                        <v-col cols="12" md="6" sm="6">
                            <div class="py-2">0Bs.</div>
                            <v-text-field 
                                solo
                                v-model="dolares"
                                dense
                                color="#000"
                                hide-details
                                disabled
                                single-line
                                type="number"
                            />
                        </v-col>
                    </v-row>
                    <v-divider class="mt-2"></v-divider>
                    <v-card-actions class="mx-auto px-5 my-2">
                        <v-row>
                            <v-col cols="12" md="12" sm="12">
                                <v-file-input
                                    label="Abjuntar Pago"
                                    counter
                                    @change="change($event)"
                                    dense
                                    color="#005598"
                                    outlined
                                />
                            </v-col>
                            <v-col cols="12" md="12" sm="12" justify-self="center">
                                <v-img width="450" height="200" contain v-if="bauche" :src="bauche" />
                            </v-col>
                        </v-row>
                    </v-card-actions>
                </v-card>
            </v-col>
       </v-row>
    </div>
</template>

<script>
import Pedidos from '@/services/Pedidos';
import Usuario from '@/services/Usuario';
import {mapState, mapActions,mapGetters} from 'vuex';

    export default {
        data() {
            return {
                bolivar:0,
                dolares:0,
                bauche:null
            }
        },

        computed: {
            ...mapState(['pedidos','totalCarrito','totalPedido']),
            ...mapGetters(['user']),
        },

        methods: {
            ...mapActions(['deleteDetallePedidos','setPedidosServices','setDetallePedidos']),

            change(evt){
                this.bauche=null;
                if(evt){
                    var reader = new FileReader();
                    reader.onload = (e) => {
                        this.bauche = e.target.result;
                    }
                    reader.readAsDataURL(evt);
                }
            },

            mounted(){
               
            },

            //metodos en local
            
            //LLAMADAS A LA API
           
            updateDetallesPedidos(id,id2){//actualiza el detalle del pedido
                Pedidos().post(`/${id}/detalles/${id2}`).then((response) => {
                    console.log(response);
                }).catch(e => {
                    console.log(e);
                })
            },

            deleteDetallePedidos(id,id2){//elimina el detalle de un pedido
                Pedidos().delete(`/${id}/detalles/${id2}`).then((response) => {
                    console.log(response);
                }).catch(e => {
                    console.log(e);
                });
            }

        },

    }
</script>

<style scoped>
    .fix{
        position:fixed;
        top: 102px;
        width: 500px;
    }
    .cuadro{
        border: 1px solid #eee;
        border-radius: 100%;
        width: 50px;
        height: 50px;
    }
</style>