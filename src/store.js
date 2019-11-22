import Vue from "vue";
import Vuex from "vuex";
import router from './router';
import firebase from 'firebase';

Vue.use(Vuex);

export default new Vuex.Store({
  state:{
    user:{
      loggedIn:false,
      data:null,
    },
    drawer:false,
    items: [
      { title: "Promociones", icon: "monetization_on" },
      { title: "Restaurantes", icon: "restaurant" },
      { title: "Tiendas", icon: "store_mall_directory" },
      { title: "Bebidas", icon: "local_bar" },
    ],
    frecuenciaLlegada:4,
    tiempoSistema:5,
    repeticiones:10,
    data:[],
    dataSelected:[]
  },

  getters: {
    user(state){
      return state.user;
    }
  },

  mutations: {
    SET_DRAWER(state,val){
      if(val == true){
        state.drawer = true;
      }else{
        state.drawer = false;
      }
    },

    SET_LOGGED_IN(state, value) {
      state.user.loggedIn = value;
    },

    SET_USER(state, data) {
      state.user.data = data;
    },
  },

  actions: {
    setDrawer({commit},val){
      commit("SET_DRAWER",val);
    },

    fetchUser({ commit }, user) {
      commit("SET_LOGGED_IN", user !== null);
      if (user) {
        commit("SET_USER", {
          displayName: user.displayName,
          email: user.email
        });
      } else {
        commit("SET_USER", null);
      }
    }
  }
});
