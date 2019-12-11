<template>
  <div>
    <AppBar />

    <Banner />

    <MasVendidos title="Lo más vendido" />

    <MasVendidos title="Ofertas de la semana" />

    <!--
      <Categorias title="Categorias" :categorias="categorias" v-if="activo" />
    -->
    <!--agregar v-else luego -->
    <v-row class="my-5 mx-3">
      <v-col cols="12" md="3" sm="6" lg="3" v-for="n in 4" :key="n">
        <SkeletonCard />
      </v-col>
    </v-row>

    <!--
      <Sugerencias title="Sugerencias" :sugerencias="aliados" v-if="activo" />
    -->
    <!--agregar v-else luego -->
    <v-row class="my-5 mx-3">
      <v-col cols="12" md="3" sm="6" lg="3" v-for="n in 4" :key="n">
        <SkeletonCard />
      </v-col>
    </v-row>

    <!-- <BannerAbajo />-->
    <Footer />
  </div>
</template>

<script>
import { mapState } from "vuex";
import AppBar from "@/components/navbar/AppBar";
import Footer from "@/components/footer/Footer";
import Banner from "@/components/vistaHome/Banner";
import Categorias from "@/components/vistaHome/Categorias";
import Sugerencias from "@/components/vistaHome/Sugerencias";
import SkeletonCard from "@/components/layouts/SkeletonCard";
import SkeletonImage from '@/components/layouts/SkeletonImage'
import BannerAbajo from '@/components/vistaHome/Banner2';
import MasVendidos from '@/components/vistaHome/MasVendidos';
import Api from '@/services/Api';
import axios from 'axios';

export default {
  name: "home",
  components: {
    AppBar,
    Footer,
    Banner,
    Categorias,
    Sugerencias,
    SkeletonCard,
    SkeletonImage,
    BannerAbajo,
    MasVendidos
  },
  data() {
    return {
      categorias: [],
      activo: false,
      aliados:[],
      //formato de las variables categorias y aliados
      //imagen,nombre,id
    };
  },

  created() {
    //this.getCategorias();
    //this.getAliados();

    Api().get('/').then((response) => {
      console.log(response.data);
    }).catch(e => {
      console.log(e);
    });
  },

  watch: {
    //cuando las variables cambien se quita el modo de espera
    categor() {
      this.activo = true;
    },
    aliados(){
      this.activo=true;
    }
  },

  methods: {
    //methods
  }
};
</script>
