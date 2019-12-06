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
        <v-card elevation="0">
            <!--titulo del carrito y boton de cierre -->
            <v-card-title>
                <div class="title">
                    Hoy provoca 
                </div>
                <div>
                    <v-subheader>
                        compra ahora mismo
                    </v-subheader>
                </div>

                <v-spacer></v-spacer>

                <v-btn icon @click="change()">
                    <v-icon>
                        close
                    </v-icon>
                </v-btn>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <!--si no hay pedidos se muestra un svg -->
                <div v-if="pedidos==null">
                    <v-img contain width="100%" height="350" :src="require('@/assets/undrawempty.svg')"></v-img>
                    <p class="mt-5 text-center">su carrito esta vacio</p>
                </div>
                <!--componente que maneja los pedidos -->
                <Pedidos v-else />
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-row>
                    <v-col cols="12" md="12" lg="12" sm="12">
                        <!--componente da el total de los pedidos
                            en diferentes monedas
                         -->
                        <CalculadoraAftim />
                    </v-col>
                    <v-col cols="12" md="12" lg="12" sm="12">
                        <!--boton para ir al checkout del pago-->
                        <v-btn block disabled rounded>
                            continuar
                        </v-btn>
                    </v-col>
                </v-row>
            </v-card-actions>
        </v-card>
    </v-navigation-drawer>
</template>

<script>
import {mapState,mapActions} from 'vuex';
import CalculadoraAftim from './CalculadoraAftim';
import Pedidos from './Pedidos';

    export default {
        data(){
            return{
                pedidos:2,
            }
        },
        components:{
            CalculadoraAftim,
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