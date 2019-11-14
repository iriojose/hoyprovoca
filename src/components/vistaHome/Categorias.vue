<template>
  <div class="my-8 mx-10">
    <div class="headline">{{title}}</div>
    <v-sheet class="mx-auto my-4" elevation="0" max-width="1100" color="f5f5f5">
        <v-slide-group v-model="model" class="pa-4" mandatory show-arrows>
            <v-slide-item v-for="categoria in categorias" :key="categoria.nombre" class="mx-2">
                <v-hover v-slot:default="{hover}">
                    <v-card
                        :color="hover ? 'grey lighten-1':'#fff'"
                        height="250"
                        width="200"
                        class="pa-2"
                        elevation="0"
                        :to="{name:'aliados', params:{text:categoria.nombre,id:1}}"
                    >
                        <v-img :src="categoria.imagen" height="220" width="220" />
                        <strong class="pa-3">{{categoria.nombre}}</strong>
                    </v-card>
                </v-hover>
            </v-slide-item>
        </v-slide-group>
    </v-sheet>
  </div>
</template>

<script>
export default {
  props: ["categorias", "title"],
  data() {
    return {
      model: 1,
    };
  },
};
</script>