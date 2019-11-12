<template>
    <v-navigation-drawer 
      app
      v-model="drawers" 
      hide-overlay
      :transition="transition()"  
      temporary
      style="margin-top:65px;"
    >
      <v-list dense right offset-x rounded>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>

        </v-list-item>

      </v-list>
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