<template>
  <!--error en el servidor -->
  <error500 v-if="error"/>

  <div v-else>
    <AppBar />

    <Banner />

    <MasVendidos title="Lo más vendido" />

    <MasVendidos title="Ofertas de la semana" />

    <Categorias title="Categorias" :categorias="categorias" v-if="activoCategoria" />
    <SkeletonCard v-else/>

    <Sugerencias title="Sugerencias" :sugerencias="aliados" v-if="activoAliado" />
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
      aliados:[],
      conceptos:[],
      activoConcepto:false,
      activoCategoria:false,
      activoAliado:false,
      //formato de las variables categorias y aliados
      //imagen,nombre,id
    };
  },

  created() {
     /*this.aliados= */this.getEmpresas();
     /*this.conceptos = */ this.getConceptos();
    /*this.categorias= */ this.getGrupos();
    //this.conceptos = //this.getConceptos();
  },

  watch: {
    //cuando las variables cambien se quita el modo de espera
    conceptos(){
      this.activoConcepto=true;
    },
    categorias() {
      this.activoCategoria = true;
    },
    aliados(){
      this.activoAliado=true;
    }
  },

  methods: {
    async getGrupos(){//trae las categorias (grupos)
        await Grupos().get('/?limit=8').then((response) => {
            console.log(response.data.data);
            //return response.data.data;
        }).catch(e => {
          console.log(e);
        });
    },

    async getEmpresas(){//trae empresas (sugenrencias)
        await Empresa().get('/?limit=8').then((response) => {
            console.log(response.data.data);
        }).catch(e => {
          console.log(e);
        });
    },
    async getConceptos(){//trae conceptos
        await Conceptos().get('/?limit=15').then((response) => {
            console.log(response.data);
        }).catch(e => {
            console.log(e);
        });
    }
  }
};
</script>
