<template>
  <div  >
    <Toolbar />
      <v-card-title :style="`color:${theme.background.font}`"  class="title my-10">
        1.
        <span :style="`background:${theme.background.font}`"></span> Acerca de Hoyprovoca
      </v-card-title>

      <div :style="`background:${theme.background.light_2}`" class="flex flex-center" >
        <div class="img-box">
          <div class="img-container">
            <div class="img" src="./../../assets/humanos.svg"></div>
          </div>
        </div>
        <div class="description-container" justify="center">
          <v-card-title :style="`color:${theme.background.font}`"  class="description-title wrap text-left font-weight-black">
            Se parte del equipo
            <br />que Transforma venezuela
          </v-card-title>
          <v-card-text :style="`color:${theme.background.font}`" class="font text-left">
            <strong>HoyProvoca</strong> ha sido desarrollado por la
            empresa Somos Sistemas C.A, operando en el Estado
            <strong>Nueva Esparta, Venezuela.</strong> Nuestra
            misión es la de ofrecer una plataforma de confianza
            donde se pueda virtualizar el mercado venezolano, y
            donde cada empresa pueda ofrecer diferentes bienes para
            el consumo final.
          </v-card-text>
          <v-card-text :style="`color:${theme.background.font}`" class="font text-left">
            Nuestra plataforma es un sitio de consumo de alto
            crecimiento, enfocada a la oferta de servicios que
            permitan conectar a consumidores, transportistas y
            distribuidores en un sitio que permita la oferta de
            <strong>
              productos alimenticios, tecnológicos, y mucho
              más.
            </strong>
            Provenientes de nuestros aliados locales.
          </v-card-text>
          <v-card-text :style="`color:${theme.background.font}`" class="font text-left">
            <strong>
              ¡No te pierdas de una experiencia
              inolvidable!
            </strong>
          </v-card-text>
        </div>
      </div>

      <div class="flex flex-center tiket">
        <v-card-title :style="`color:white`"  class="tiket-letters wrap text-left font-weight-black">¡Estamos reclutando!</v-card-title>
      </div>
      <v-card-title :style="`color:${theme.background.font}`"  class="title my-10">
        2.
        <span :style="`background:${theme.background.font}`"></span> Que Necesitas?
      </v-card-title>
      <div :style="`background:${theme.background.light_2}`" class="flex flex-center flex-row margin-bottom">
        <div class="flex flex-center flex-column max">
          <v-card-title :style="`color:${theme.background.font}`"  class="display-1">Envianos tu Solicitud</v-card-title>
          <v-card-text :style="`color:${theme.background.font}`" class="requisitos-text font text-left">
            Si deseas unirte a nuestra red de repartidores para <strong>hoyprovoca.com</strong>, puedes enviarnos un correo a <strong>somossistemas@gmail.com,</strong>  con los siguientes requisitos.
          </v-card-text>
          <v-card-text :style="`color:${theme.background.font}`" class="requisitos-text font text-left">
           <strong>¡Estaremos en contacto!</strong>
          </v-card-text>
        </div>

        <div class="requisitos-timeline">
          <v-timeline :dense="$vuetify.breakpoint.smAndDown">
            <v-timeline-item color="red lighten-1" hide-dot right small>
              <v-card color="red">
                <v-card-title :style="`color:${theme.background.font}`"  class="red p-0 lighten-1">
                  <v-icon dark class="mr-4 pl-2" size="20">mdi-home-outline</v-icon>
                  <h2 class="title white--text font-weight-light">Direccion</h2>
                </v-card-title>
              </v-card>
            </v-timeline-item>

            <v-timeline-item color="cyan lighten-1" hide-dot right small>
              <v-card color="red">
                <v-card-title :style="`color:${theme.background.font}`"  class="red p-0 lighten-1">
                  <v-icon dark class="mr-4 pl-2" size="20">mdi-email-outline</v-icon>
                  <h2 class="title white--text font-weight-light">Correo</h2>
                </v-card-title>
              </v-card>
            </v-timeline-item>

            <v-timeline-item color="red lighten-1" hide-dot right small>
              <v-card color="red">
                <v-card-title :style="`color:${theme.background.font}`"  class="red li p-0 lighten-1">
                  <v-icon dark class="mr-4 pl-2" size="20">mdi-account-multiple-outline</v-icon>
                  <h2 class="title mr-4 white--text font-weight-light">Cedula</h2>
                </v-card-title>
              </v-card>
            </v-timeline-item>

            <v-timeline-item color="red lighten-1" hide-dot right small>
              <v-card color="red">
                <v-card-title :style="`color:${theme.background.font}`"  class="red p-0 lighten-1">
                  <v-icon class="mr-4 pl-2" dark size="20">mdi-phone-in-talk</v-icon>
                  <h2 class="title white--text font-weight-light">Celular</h2>
                </v-card-title>
              </v-card>
            </v-timeline-item>
          </v-timeline>
        </div>
      </div>
      <Footer/>
  </div>
  
</template>

<script>
import Toolbar from "./../terminos/Toolbar";
import Footer from "@/components/footer/Footer";
import {mapState} from "vuex";
export default {
  components: {
    Toolbar,
    Footer
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
        "sus expectativas con la empresa",
      ],
    };
  },
  computed:{
    ...mapState(['theme'])
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
.relative {
  position: relative;
}
.svg {
  &-container {
    top: 0;
    right: 0;
    position: absolute;
    width: 80%;
    display: flex;
    height: 80vh;
    justify-content: flex-end;
    align-items: center;
    circle {
      width: 60%;
      fill: #c9242b;
      opacity: 0.4;
      stroke-width: 0;
    }
  }
}
.tiket {
  text-align: center;
  display: flex;
  align-items: center;
  background-color: #c9242b;
  height: 40vh;
  margin-top: 30vh;
  margin-bottom: 30vh;
  &-letters {
    color: white;
    font-size: 3rem;
    letter-spacing: 0.1rem;
    padding: 0;
    line-height: 1.2;
    max-height: 440px;
    @media only screen and (max-width: 800px) {
      flex-direction: column;
      font-size: 2rem;
    }
  }
}
.max {
  max-width: 400px;
}
.requisitos {
  max-width: 400px;
  
  &-text {
    padding: 1vh !important;
    width: 100%;
  }
  &-timeline {
    flex-grow: 1 !important;
    max-width: 300px;
    //max-height: 40vh;
    display: flex;
    width: 20%;
    justify-content: center;
    .v-card {
      width: 20vw;
       @media only screen and (max-width: 800px) {
     width: 50vw;
    }
    }
  }
}
.p-0 {
  padding: 1px !important;
}
.margin-bottom{
  margin-bottom:30vh;
  
}
.flex {
  display: flex;
  &-center {
    justify-content: center;
    align-items: center;
    @media only screen and (max-width: 800px) {
      flex-direction: column;
    }
  }
  &-space {
    align-items: center;
    justify-content: space-around;
  }
  &-column {
    flex-direction: column;
  }
  &-row {
    flex-direction: row;
     @media only screen and (max-width: 800px) {
      flex-direction: column!important;
    }
  }
}
.textred {
  color: #c9242b;
}
.title {
  display: flex;
  position: relative;
  span {
    width: 4%;
    height: 2px;
    margin-left: 3px;
    margin-right: 3px;
  }
}
.img {
  &-container {
    position: relative;
    padding-top: 72%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &-box {
    flex-grow: 1;
    width: 100%;
    height: 80%;
    padding: 1%;
    padding-top: 8%;
    flex-grow: 1;
    position: relative;
    @media only screen and (max-width: 800px) {
      max-width: 300px !important;
    }
    &:before {
      position: absolute;
      width: 80%;
      background-color: #c9242b;
      height: 100%;
      opacity: 0.2;
      left: 8%;
      top: 0;
      content: "";
    }
  }
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("./../../assets/holi.svg");
  top: 0;
  background-size: cover !important;
  background-position: center;
}
.description {
  &-container {
    flex-grow: 2;
    padding: 5vh;
  }
  &-title {
    font-size: 2.4rem;
    letter-spacing: 0.1rem;
    padding: 0;
    line-height: 1.2;
    margin-bottom: 8vh;
    max-height: 440px;
    @media only screen and (max-width: 800px) {
      flex-direction: column;
      font-size: 2rem;
    }
  }
}
.font {
  font-size: 18px;
  letter-spacing: 1px;
  padding: 0;
  margin-bottom: 2vh;
  text-align: justify !important;
}
</style>
