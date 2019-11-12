<template>
  <div>
      <AppBar />
      <Banner />
      <Categorias />
      <Categorias />
      <Footer />
  </div>
</template>

<script>
import {mapState} from 'vuex';
import AppBar from '@/components/navbar/AppBar';
import Footer from '@/components/footer/Footer';
import Banner from '@/components/vistaHome/Banner';
import Categorias from '@/components/vistaHome/Categorias';

export default {
  name:"home",
  components:{
      AppBar,
      Footer,
      Banner,
      Categorias
  },
  computed: {
    
  },

};
</script>
