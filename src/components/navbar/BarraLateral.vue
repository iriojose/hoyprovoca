<template>
    <v-navigation-drawer 
      app
      v-model="drawers" 
      hide-overlay
      :transition="transition()"  
      temporary
      style="margin-top:65px;"
    >
      <v-menu 
        open-on-hover 
        right 
        offset-x 
        transition="slide-x-transition" 
        v-for="item in items"
        :key="item.title"
      >
          <template v-slot:activator="{ on }">
              <v-list dense>
                  <v-list-item
                    link
                    v-on="on"
                  >
                      <v-list-item-icon>
                          <v-icon>{{ item.icon }}</v-icon>
                      </v-list-item-icon>

                      <v-list-item-content>
                          <v-list-item-title>{{ item.title }}</v-list-item-title>
                      </v-list-item-content>
                  </v-list-item>
              </v-list>
          </template>
          <v-card 
            color="rgba(255,255,255,0.9)" 
            width="800" 
            height="467" 
          >
              <v-card-title>
                  {{item.title}}
              </v-card-title>
              <v-divider></v-divider>

              <v-row>
                  <v-col cols="12" md="3" offset="1">
                      <v-img height="90" src="https://www.stickpng.com/assets/images/58428cc1a6515b1e0ad75ab1.png" contain/>
                  </v-col>
                  <v-col cols="12" md="3" offset="1">
                      <v-img height="90" src="https://www.stickpng.com/assets/images/58428cc1a6515b1e0ad75ab1.png" contain/>
                  </v-col>
                  <v-col cols="12" md="3" offset="1">
                      <v-img height="90" src="https://www.stickpng.com/assets/images/58428cc1a6515b1e0ad75ab1.png" contain/>
                  </v-col>
                  <v-col cols="12" md="3" offset="1">
                      <v-img height="90" src="https://www.stickpng.com/assets/images/58428cc1a6515b1e0ad75ab1.png" contain/>
                  </v-col>
              </v-row>
          </v-card>
      </v-menu>
      <v-divider></v-divider>
    </v-navigation-drawer>
</template>

<script>
import {mapState,mapActions} from 'vuex';

    export default {
        name: 'BarraLateral',
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

<style scope>
    .index{
      z-index:100;
    }
</style>