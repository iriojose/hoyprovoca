<template>
  <div>
    <AppBar />

    <Banner />

    <MasVendidos title="Lo más vendido" />

    <MasVendidos title="Ofertas de la semana" />

    <Categorias title="Categorias" :categorias="categor" v-if="activo" />

    <v-row v-else class="my-5 mx-3">
      <v-col cols="12" md="3" sm="6" lg="3" v-for="n in 4" :key="n">
        <SkeletonCard />
      </v-col>
    </v-row>

    <Sugerencias title="Sugerencias" :sugerencias="aliados" v-if="activo" />

    <v-row v-else class="my-5 mx-3">
      <v-col cols="12" md="3" sm="6" lg="3" v-for="n in 4" :key="n">
        <SkeletonCard />
      </v-col>
    </v-row>

    <BannerAbajo />
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
import firebase from "firebase";

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
      categor: [],
      activo: false,
      aliados:[],
    };
  },

  created() {
    this.getCategorias();
    this.getAliados();
  },

  watch: {
    categor() {
      this.activo = true;
    },
    aliados(){
      this.activo=true;
    }
  },

  methods: {
    async getCategorias() {
      var ref = await firebase.firestore().collection("categorias");
      var count=0;
      ref.onSnapshot(snap => {
        snap.forEach(doc => {
          this.categor.push({
            nombre: doc.data().nombre,
            imagen: doc.data().imagen,
            uid:count++,
          });
        });
      });
    },

    async getAliados(){
      var ref = await firebase.firestore().collection('aliados');

      ref.onSnapshot(snap => {
        snap.forEach(doc => {
          this.aliados.push({
            imagen:doc.data().imagen,
            nombre:doc.data().nombre,
            uid:doc.data().id
          });
        });
      });
    }
  }
};
</script>
