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
    dialog:false,
    panel:false,
    producto:{},
    items: [
      { title: "Promociones"},{ title: "Restaurantes"},
      { title: "Tiendas"},{ title: "Bebidas"},
      { title: "Artes"},{ title: "Artesanias"},
      { title: "Computadoras"},{ title: "Electronicos"},
      { title: "Vehiculos"},{ title: "Motos"},
      { title: "Animales"},{ title: "Antenas"},
    ],
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

    SET_PANEL(state,val){
      if(val == true){
        state.panel = true;
      }else{
        state.panel = false;
      }
    },

    SET_DIALOG(state,val){
      if(val == true){
        state.dialog=true;
      }else{
        state.dialog=false;
      }
    },

    SET_PRODUCTO(state,val){
      state.producto=val;
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

    setPanel({commit},val){
      commit("SET_PANEL",val);
    },

    setDialog({commit},val){
      commit("SET_DIALOG",val);
    },

    setProducto({commit},val){
      commit("SET_PRODUCTO",val);
    },
    
    logout({commit}){
      commit(" SET_LOGGED_IN",false);
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
