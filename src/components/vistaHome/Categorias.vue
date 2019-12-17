<template>
    <div :class="$vuetify.breakpoint.smAndDown ? null:'my-8 mx-10'">
      <v-divider class="my-12"></v-divider>
        <div class="headline ml-12 mt-12 font-weight-black">Categorias mas buscadas</div>
        <v-slide-group
            show-arrows
            class="my-5 py-5"
        >
            <v-slide-item
                v-for="categoria in  categorias"
                :key="categoria.id"
                class="mx-4"
            >
                <v-hover v-slot:default="{hover}">
                    <v-card height="250" width="300" elevation="10" v-ripple :to="{name:'tipo', params:{text:categoria.nombre}}">
                        <v-card-text>
                            <v-img contain :src="categoria.imagen"/>
                        </v-card-text>
                    </v-card>
                </v-hover>
            </v-slide-item>
        </v-slide-group>
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