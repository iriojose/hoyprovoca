<template>
  <div>
    <Toolbar />
    <v-divider></v-divider>
    <v-card class="mx-2">
      <v-card-title class="title my-10">1.- Acerca de Hoyprovoca</v-card-title>
      <v-row class="py-10 rows" justify="center" align="center">
        <v-col md="3">
          <v-img class="mx-3 my-1" src="./../../assets/humanos.svg"></v-img>
        </v-col>
        <v-col md="8" class="align-self-center" justify="center">
          <v-card-title
            class="description-title wrap text-left font-weight-black"
          >Se parte del equipo que Transforma venezuela</v-card-title>
          <v-divider></v-divider>
          <v-card-text class="font text-left">
            HoyProvoca es un sitio de consumo de alto crecimiento,
            enfocada a la oferta de servicios que permitan conectar
            a consumidores, transportistas y distribuidores en una
            plataforma que permita la oferta de productos
            alimenticios, tecnológicos, y mucho más. Provenientes de
            nuestros aliados locales.
          </v-card-text>
          <v-card-text class="font text-left">
            El sitio ha sido desarrollado por la empresa Somos
            Sistemas C.A, operando en el Estado Nueva Esparta,
            Venezuela. Nuestra misión es la de ofrecer una
            plataforma de confianza donde se pueda virtualizar el
            mercado venezolano, y donde cada empresa pueda ofrecer
            diferentes bienes para el consumo final.
          </v-card-text>
          <v-card-text class="font text-left">¡No te pierdas de una experiencia inolvidable!</v-card-text>
        </v-col>
      </v-row>

      <v-card-title class="title py-6">2.- Requisitos</v-card-title>
      <v-row  sm="10" justify="center" class="align-md-center py-9 rows">
        <v-col sm="10" md="5" justify="center">
          <v-col md="4" class="circle" style="margin:auto!important" >
            <v-img style="z-index:1;margin-left:20px" src="./../../assets/empresario.png"></v-img>
          </v-col>
          <v-card-text class="requisitos-text text-left font">
            somos una empresa abierta a nuevas solicitudes si deseas
            trabajar con nosotros envianos un correo a
            <strong>SomosSistemas@gmail.com</strong> con los siguientes requisitos mostrados en la lista y estaremos en contacto
          </v-card-text>
        </v-col>

        <v-col sm="10" md="6" justify="center">
          <v-timeline :align-top="alignTop" :dense="dense" :reverse="reverse">
            <v-timeline-item
              v-for="requisito in requisitos"
              :key="requisito"
              :fill-dot="fillDot"
              :hide-dot="hideDot"
              :icon="icon ? 'mdi-check' : 'mdi-check'"
              :icon-color=" iconColor ? 'deep-orange' : ''"
              :left="left"
              :right="right"
              :small="small"
            >
              <template v-slot:icon>
                <v-avatar >
                  <img src="./../../assets/tick.png" />
                </v-avatar>
              </template>
              <v-card class="elevation-2">
                <v-card-text>{{requisito}}</v-card-text>
              </v-card>
            </v-timeline-item>
          </v-timeline>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import Toolbar from "./../terminos/Toolbar";

export default {
  components: {
    Toolbar
  },
  data: () => {
    return {
      holi: "holi",
      alignTop: false,
      avatar: true,
      dense: false,
      fillDot: true,
      hideDot: false,
      iconColor: false,
      left: false,
      reverse: false,
      right: false,
      small: true,
      requisitos: [
        "Numero de Cedula",
        "Nombre Completo",
        "Rif",
        "Curriculum",
        "Direccion",
        "sus expectativas con la empresa"
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.margen-top {
  margin-top: 75px;
}
.margen-movil {
  margin-top: 100px;
}
.container {
  padding: 0 !important;
}
.circle{
  position: relative;
  z-index: 2;
  &:before{
    position: absolute;
    content:"";
    width: 100%;
    height: 100%;
    top:0;
    bottom:0;
    left: 0;
    right: 0;
    z-index: 0;
 //   margin-right: 10px;
    border-radius: 50%;
    background-color: #ebded1;
  }
}
.imagen {
  width: 10px;
  height: 10px;
}
.wrap {
  flex-wrap: wrap !important;
}
.description-title {
  font-size: 3rem !important;
  letter-spacing: 0.1rem;
}
.requisito {
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}
.font {
  font-size: 1rem !important;
  letter-spacing: 0.1rem;
}

</style>
