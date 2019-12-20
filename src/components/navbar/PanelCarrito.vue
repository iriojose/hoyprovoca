<template>
    <v-navigation-drawer
        app
        right
        temporary
        v-model="panels" 
        hide-overlay
        :transition="transition()"  
        width="500"
    >
        <v-card color="#f7f7f7" elevation="0" height="100%">
            <!--HEADER DEL PANEL -->
            <v-toolbar elevation="0">
                <div class="title">
                    HoyProvoca 
                </div>
                <v-subheader>
                    compra ahora mismo
                </v-subheader>
                <v-spacer></v-spacer>
                <v-btn icon text depressed @click="change">
                    <v-icon>close</v-icon>
                </v-btn>
            </v-toolbar>
            <v-divider class="mb-2"></v-divider>

            <!--si no hay pedidos se muestra un svg -->
            <div v-if="!pedidos">
                <v-img contain width="100%" height="100%" :src="require('@/assets/undrawempty.svg')"></v-img>
                <p class="mt-5 text-center font-weight-bold">su carrito esta vacio</p>
            </div>

            <!--pedidos-->
            <v-expansion-panels v-else>
                <v-expansion-panel
                    v-for="(item,i) in 5"
                    :key="i"
                    class="my-1"
                >
                    <v-expansion-panel-header>
                        <v-toolbar elevation="0" height="60">
                            <v-avatar class="elevation-10" color="#eee" size="50">
                                <v-img src="https://urbancomunicacion.com/wp-content/uploads/2016/11/LOGOTIPOS-BARATOS-URBAN-COMUNICACION.jpg"></v-img>
                            </v-avatar>
                            <v-spacer></v-spacer>
                            <div class="font-weight-bold">Empresa</div>
                            <v-spacer></v-spacer>
                            <div class="font-weight-black">Bss. 4000000</div>
                        </v-toolbar>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <v-divider></v-divider>
                        <v-toolbar elevation="0" height="60" v-for="n in 3" :key="n">
                            <v-img 
                                width="50" 
                                height="50" 
                                contain 
                                src="https://eidetesa.com/wp-content/uploads/2019/01/producto-eidetesa-linea-palmera-salvado-trigo-full.png"
                            />

                            <v-spacer></v-spacer>

                                <v-btn class="mx-2" tile icon>
                                    <v-icon dark>delete</v-icon>
                                </v-btn>

                                <div class="mx-2 font-weight-black subtitle-1">1</div>

                                <v-btn class="mx-2" tile icon>
                                    <v-icon dark>plus_one</v-icon>
                                </v-btn> 
                            <v-spacer></v-spacer>

                            <div class="font-weight-black">Bss. 400000</div>
                        </v-toolbar>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>

            <!--Totales-->
            <v-divider></v-divider>
            <v-toolbar elevation="0" height="100">
                <div>
                    <div class="py-2 text-center">Bss.</div>
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
                </div>
                <v-spacer></v-spacer>
                <div class="px-2">
                    <div class="py-2 text-center">$</div>
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
                </div>
            </v-toolbar>
            <v-divider></v-divider>

            <div class="mt-3 py-3 text-center">
                <v-btn to="/checkout" color="#005598" disabled class="white--text" width="50%" rounded>
                    Ir a pagar
                </v-btn>
            </div>
        </v-card>
    </v-navigation-drawer>
</template>

<script>
import {mapState,mapActions} from 'vuex';
import Pedidos from './Pedidos';

    export default {
        data(){
            return{
                pedidos:2,
                bolivar:20000000,
                dolares:53
            }
        },
        components:{
            Pedidos
        },
        computed: {
            ...mapState(['panel']),

            panels:{
                get(){
                    return this.panel; 
                },
                set(val){
                    this.setPanel(val);
                }
            }
        },
        methods: {
            ...mapActions(['setPanel']),

            transition(){
              if(this.panel){
                return "slide-x-transition";
              }else{
                return "slide-y-transition";
              }
            },
            change(){
                if(this.panel==true){
                    this.setPanel(false);
                }else{
                    this.setPanel(true);
                }
            }
        },
    }
</script>