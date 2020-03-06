<template>
  <v-row
    justify="center"
    align="center"
    :class="$vuetify.breakpoint.smAndDown ? 'fill-height mx-5':'fill-height'"
  >
    <v-col cols="12" md="4" lg="4" class="hidden-sm-and-down">
      <v-img contain width="100%" height="300" :src="require('@/assets/undrawregistro2.svg')"></v-img>
    </v-col>
    <v-col cols="12" md="3" sm="10">
      <v-card elevation="5" class="py-5" width="100%" height="500">
        <div class="text-center my-5 font-weight-black subtitle-1">Registrate en Aftim</div>
        <v-card-text>
          <FormCliente />
        </v-card-text>
        <div class="mx-10 my-5">
          <v-divider></v-divider>
        </div>
        <v-hover v-slot:default="{hover}">
          <div
            :class="hover ? 'mx-2 subtitle-2 text-color decoracion text-center':'mx-2 subtitle-2 text-color text-center'"
          >ya tienes una cuenta? inicie sesión</div>
        </v-hover>
      </v-card>
    </v-col>
    <v-col cols="12" md="4" lg="4" class="hidden-sm-and-down"></v-col>
  </v-row>
  <!--div-- class="mt-12">
        <v-row :class="$vuetify.breakpoint.smAndDown ? 'mx-4':null">
            <v-col cols="12" md="6" lg="6" sm="12" :offset="$vuetify.breakpoint.smAndDown ? null:1">
                <v-card elevation="15" class="pa-5 my-5">
                    <div class="text-center">
                        <v-btn text>
                            <v-img src="@/assets/log.png"></v-img>
                        </v-btn>
                    </div>
                    <v-card-text>
                        <FormCliente/>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" md="5" lg="5" class="margen hidden-sm-and-down">
                <v-img :src="require('@/assets/undrawregistro2.svg')" contain></v-img>
            </v-col>
        </v-row>
  </!--div-->
</template>

<script>
import FormCliente from "@/components/vistaAuth/FormCliente";

export default {
  components: {
    FormCliente
  }
};
</script>

<style scoped>
.background {
  background-color: rgba(0, 82, 152, 0.8);
  height: 30%;
  width: 100%;
}
.margen {
  margin-top: 250px;
}
.text-color {
  color: #005598;
}
.decoracion {
  text-decoration: underline;
  text-decoration-color: #005598;
  transition-delay: 2s;
  transition-duration: 1s;
}
</style>