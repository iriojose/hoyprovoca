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
//vuex, state globales
import {mapState,mapActions} from 'vuex';
//services
import Grupos from '@/services/Grupos';
import SubGrupos from '@/services/SubGrupos';

    export default {
        name: 'BarraLateral',
        data(){
          return{
            show:true,
            grupos:[],
            //se guardan todos los subgrupos
            subgrupos:[],
            //esta arreglo es donde se guarda la lista que aparecera luego 
            //de darle click al grupo principal
            listaSubgrupos:[]
          }
        },
        computed: {
          ...mapState(['items','drawer']),
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
        mounted(){//se trae los grupos y subgrupos al montarse el componente
          //this.getGrupos();
          //this.getSubGrupos();
        },
        methods:{
            ...mapActions(['setDrawer']),

            list(val){//metodo para seleccionar subgrupo
            //PD:falta validar y guardar en variable (listasubgrupo)
                this.show=false;
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
                    console.log(response.data.data);
                }).catch(e => {
                    console.log(e);
                });
            },

            getSubGrupos(){//trae subgrupos
                SubGrupos().get('/').then((response)=> {
                    console.log(response.data.data);
                }).cathc(e => {
                    console.log(e);
                });
            }
        }
    }

//Nota para irio:
//cambiar de categorias a subcategorias con el condicional del id
</script>