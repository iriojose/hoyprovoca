<template>
  <!--error en el servidor -->
  <error500 v-if="error"/>

  <div v-else>
    <AppBar />

    <Banner />

    <MasVendidos :conceptos="conceptos" />

    <v-divider class="my-12"></v-divider>

    <MasVendidos :conceptos="conceptos"/>

    <Categorias title="Categorias" :categorias="categorias" v-if="activoCategoria" />
    <SkeletonCard v-else/>

    <Sugerencias :sugerencias="sugerencias" v-if="activoSugerencia" />
    <SkeletonCard v-else/>

    <!-- <BannerAbajo />-->
    <Footer />
  </div>
</template>

<script>
//store
import { mapState } from "vuex";
//components
import AppBar from "@/components/navbar/AppBar";
import Footer from "@/components/footer/Footer";
import Banner from "@/components/vistaHome/Banner";
import Categorias from "@/components/vistaHome/Categorias";
import Sugerencias from "@/components/vistaHome/Sugerencias";
import SkeletonCard from "@/components/layouts/SkeletonCard";
import BannerAbajo from '@/components/vistaHome/Banner2';
import MasVendidos from '@/components/vistaHome/MasVendidos';
import error500 from '@/views/s500';
//servicios
import Conceptos from '@/services/Conceptos';
import Grupos from '@/services/Grupos';
import Empresa from '@/services/Empresa';
//router
import router from '@/router';

export default {
  name: "home",
  components: {
    AppBar,
    Footer,
    Banner,
    Categorias,
    Sugerencias,
    SkeletonCard,
    BannerAbajo,
    MasVendidos,
    error500,
  },
  data() {
    return {
      error:false,
      categorias: [],
      sugerencias:[],
      conceptos:[],
      activoConcepto:false,
      activoCategoria:false,
      activoSugerencia:false,
    };
  },

  created() {
      this.getEmpresas();
      this.getConceptos();
      this.getGrupos();
  },

  watch: {
    //cuando las variables cambien se quita el modo de espera
    conceptos(){
      this.activoConcepto=true;
    },
    categorias() {
      this.activoCategoria = true;
    },
    sugerencias(){
      this.activoSugerencia=true;
    }
  },

  methods: {
    getGrupos(){//trae las categorias (grupos)
        Grupos().get('/?limit=8').then((response) => {
          this.categorias = response.data.data;
          console.log(response.data.data);
        }).catch(e => {
          console.log(e);
        });
    },

    getEmpresas(){//trae empresas (sugerencias)
        Empresa().get('/?limit=8').then((response) => {
            this.sugerencias= response.data.data;
            console.log(response.data.data);
        }).catch(e => {
          console.log(e);
        });
    },
    
    getConceptos(){//trae conceptos (productos/servicios)
        Conceptos().get('/?limit=15').then((response) => {
            this.conceptos = response.data.data;
            console.log(response.data.data);
        }).catch(e => {
            console.log(e);
        });
    }
  }
};
</script>
