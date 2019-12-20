<template>
    <v-navigation-drawer 
      app
      v-model="drawers" 
      :transition="transition()"  
      temporary
      hide-overlay
      width="300"
      :style="$vuetify.breakpoint.smAndDown ? 'margin-top:115px;':'margin-top:58px'"
    >
        <div class="text-center mt-12" v-if="loading">
            <v-progress-circular
                :size="50"
                color="#005598"
                :indeterminate="loading"
                class="mt-12"
            ></v-progress-circular>
        </div>
        <v-list v-else>
            <v-subheader>Comprar por categorias</v-subheader>
            <v-divider></v-divider>
            <v-list-item 
                link 
                v-for="item in grupos" 
                :key="item.id"
                @click="push(item)"
            >
                <v-list-item-content>
                    <v-list-item-title class="text-lowercase">{{ item.nombre }}</v-list-item-title>
                </v-list-item-content>

                <v-list-item-icon>
                    <v-icon>keyboard_arrow_right</v-icon>
                </v-list-item-icon>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
//vuex, state globales
import {mapState,mapActions} from 'vuex';
//services
import Grupos from '@/services/Grupos';
//router
import router from '@/router';

    export default {
        name: 'BarraLateral',
        data(){
            return{
                grupos:[],
                loading:true
            }
        },
        computed: {
          ...mapState(['drawer']),
            //cambiar el drawer de la navegacion
            drawers:{
                get(){
                    return this.drawer;
                },
                set(val){
                    this.setDrawer(val);
                }
            }
        },
        mounted(){//se trae los grupos al montarse el componente
            this.getGrupos();
        },
        methods:{
            ...mapActions(['setDrawer']),

            push(item){//empuja a la vista 
                this.setDrawer(false);
                router.push({name:'grupos', params:{text: item.nombre , id:item.id}});
            },

            transition(){//metodo para animacion de transition
                if(this.drawer){
                  return "slide-x-transition";
                }else{
                  return "slide-y-transition";
                }
            },

            getGrupos(){//trae los grupos
                Grupos().get('/').then((response) => {
                    this.grupos = response.data.data;
                    this.loading=false;
                }).catch(e => {
                    console.log(e);
                });
            },
        }
    }
</script>

