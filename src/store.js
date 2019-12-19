import Vue from "vue";
import Vuex from "vuex";

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
    validacionConcep:false,
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

    SET_VALIDACION_CONCEP(state,val){
      if(val == true){
        state.validacionConcep = true;
      }else{
        state.validacionConcep = false;
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
      window.localStorage.setItem('user',value);
    },

    SET_USER(state, data) {
      state.user.data = data;
    },

    LOGOUT(state){
      state.user.loggedIn=false;
      window.localStorage.setItem('user',false);
    }
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

    setValidacionConcepto({commit},val){
      commit("SET_VALIDACION_CONCEP",val);
    },

    setProducto({commit},val){
      commit("SET_PRODUCTO",val);
    },
    
    logout({commit}){
      commit("LOGOUT");
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
