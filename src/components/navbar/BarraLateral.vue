<template>
    <v-navigation-drawer 
      app
      v-model="drawers" 
      :transition="transition()"  
      temporary
      hide-overlay
      width="300"
      :style="$vuetify.breakpoint.smAndDown ? 'margin-top:122px;':'margin-top:66px'"
    >
      <v-list v-if="show">
          <v-subheader>Comprar por categorias</v-subheader>
          <v-divider></v-divider>
          <v-list-item 
              link 
              v-for="item in items" 
              :key="item.title"
              @click="list(item)"
          >
              <v-list-item-content>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>

              <v-list-item-icon>
                  <v-icon>keyboard_arrow_right</v-icon>
              </v-list-item-icon>
          </v-list-item>
      </v-list>
      <v-list v-else>
          <v-subheader v-ripple @click="show=true" class="">
            <v-icon class="mx-3">arrow_back</v-icon>  Volver al menu principal
          </v-subheader>
          <v-divider></v-divider>
      </v-list>
      <v-divider></v-divider>
    </v-navigation-drawer>
</template>

<script>
import {mapState,mapActions} from 'vuex';

    export default {
        name: 'BarraLateral',
        data(){
          return{
            show:true,
          }
        },
        computed: {
          ...mapState(['items','drawer']),

            drawers:{
                get(){
                    return this.drawer;
                },
                set(val){
                    this.setDrawer(val);
                }
            }
        },
        methods:{
            ...mapActions(['setDrawer']),

            list(val){
              this.show=false;
            },

            transition(){
              if(this.drawer){
                return "slide-x-transition";
              }else{
                return "slide-y-transition";
              }
            }
        }
    }
</script>