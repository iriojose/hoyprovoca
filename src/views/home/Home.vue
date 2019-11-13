<template>
  <div>
    <AppBar />
    <Banner />
    <Categorias title="Categorias" :categorias="categor" v-if="activo" />

    <v-row v-else class="my-5">
      <v-col cols="12" md="3" v-for="n in 4" :key="n">
        <SkeletonCard />
      </v-col>
    </v-row>

    <Categorias title="Sugerencias" :categorias="categor" v-if="activo" />

    <v-row v-else class="my-5">
      <v-col cols="12" md="3" v-for="n in 4" :key="n">
        <SkeletonCard />
      </v-col>
    </v-row>
    <Footer />
  </div>
</template>

<script>
import { mapState } from "vuex";
import AppBar from "@/components/navbar/AppBar";
import Footer from "@/components/footer/Footer";
import Banner from "@/components/vistaHome/Banner";
import Categorias from "@/components/vistaHome/Categorias";
import SkeletonCard from "@/components/layouts/SkeletonCard";
import firebase from "firebase";

export default {
  name: "home",
  components: {
    AppBar,
    Footer,
    Banner,
    Categorias,
    SkeletonCard
  },
  data() {
    return {
      categor: [],
      activo: false
    };
  },

  created() {
    this.getCategorias();
  },

  watch: {
    categor() {
      this.activo = true;
    }
  },

  methods: {
    async getCategorias() {
      var ref = await firebase.firestore().collection("categorias");

      ref.onSnapshot(snap => {
        snap.forEach(doc => {
          this.categor.push({
            nombre: doc.data().nombre,
            imagen: doc.data().imagen
          });
        });
      });
    }
  }
};
</script>
