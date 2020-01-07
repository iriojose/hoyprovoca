import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state:{
    user:{
      token:null,
      loggedIn:false,
    },
    drawer:false,
    grupos:[],
    dialog:false,
    panel:false,
    validacionConcep:false,
    producto:{},
    pedidos:[],
    totalCarrito:0,
    totalPedido:[]
  },

  getters: {//devuelve la sesion 
    user(state){
      return state.user;
    }
  },

  mutations: {
    SET_PEDIDOS(state,val){//este es por agregacion por parte de los usuarios
      state.pedidos.push(val);
    },
    
    SET_PEDIDOS_SERVICES(state,val){//cuando viene de la api
      state.pedidos=val;
      
      state.totalCarrito = 0;
      state.totalPedido = [];

      for(let i = 0; i < state.pedidos.length; i++){
        let suma=0;
        for (let e = 0; e < state.pedidos[i].detalles.length; e++) {
          suma=suma+Number.parseFloat(state.pedidos[i].detalles[e].precio);
        }
        state.totalPedido.push(suma); 
        state.totalCarrito = state.totalCarrito+suma;
      }

    },

    SET_DETALLE_PEDIDOS(state,val){

      for (let i = 0; i < state.pedidos.length; i++){
        if(state.pedidos[i].id == val.rest_pedidos_id){
          state.pedidos[i].detalles.push(val); 
        }
      }

      state.totalCarrito = 0;
      state.totalPedido = [];

      for(let i = 0; i < state.pedidos.length; i++){
        let suma=0;
        for (let e = 0; e < state.pedidos[i].detalles.length; e++) {
          suma=suma+Number.parseFloat(state.pedidos[i].detalles[e].precio);
        }
        state.totalPedido.push(suma); 
        state.totalCarrito = state.totalCarrito+suma;
      }

    },

    DELETE_DETALLE_PEDIDOS(state,val){//elimina el concepto de un pedido
      for (let i = 0; i < state.pedidos.length; i++){
        for (let e = 0; e < state.pedidos[i].detalles.length; e++){
          if(state.pedidos[i].detalles.length == 1){
            state.pedidos.splice(i,1);
            return //asi no sigue buscando
          }else{
            if(state.pedidos[i].detalles[e].id == val.id){
              state.pedidos[i].detalles.splice(e,1);
              return //asi no sigue buscando
            }
          }
        }
      }
    },

    DELETE_PEDIDOS(state,val){//elimina un pedido
      for (let i = 0; i < state.pedidos.length; i++) {
        if(state.pedidos[i].id == val){
          state.pedidos.splice(i,1);
          return //asi no sigue buscando
        }
      }
      
      state.totalCarrito = 0;
      state.totalPedido = [];

      for(let i = 0; i < state.pedidos.length; i++){
        let suma=0;
        for (let e = 0; e < state.pedidos[i].detalles.length; e++) {
          suma=suma+Number.parseFloat(state.pedidos[i].detalles[e].precio);
        }
        state.totalPedido.push(suma); 
        state.totalCarrito = state.totalCarrito+suma;
      }

    },

    UPDATE_PEDIDOS(state,val){//actualiza el pedido //POR HACER*

    },

    SET_DRAWER(state,val){//abre el panel del home de grupos
      if(val == true){
        state.drawer = true;
      }else{
        state.drawer = false;
      }
    },

    SET_VALIDACION_CONCEP(state,val){//abre el de conceptos cuando require una acotacion de usuario
      if(val == true){
        state.validacionConcep = true;
      }else{
        state.validacionConcep = false;
      }
    },

    SET_PANEL(state,val){//abre el panel de carrito de compras
      if(val == true){
        state.panel = true;
      }else{
        state.panel = false;
      }
    },

    SET_DIALOG(state,val){//dejado de usar
      if(val == true){
        state.dialog=true;
      }else{
        state.dialog=false;
      }
    },

    SET_PRODUCTO(state,val){//bandera para ver el producto seleccionado por usuario
      state.producto=val;
    },

    SET_LOGGED_IN(state,value) {//metodo de login
      state.user.loggedIn = true;
      state.user.token=value;
      window.localStorage.setItem('token',value);
    },

    LOGOUT(state){//logout del usuario
      state.user.loggedIn=false;
      window.localStorage.setItem('token',"");
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

    logged({commit},value,value2){
        commit("SET_LOGGED_IN",value,value2);
    },
    
    //pedidos actions
    setPedidos({commit},val){//crea encabezado pedido por empresa
        commit("SET_PEDIDOS",val);
    },

    setPedidosServices({commit},val){//en caso de haber recargado la pagina se traen desde la api
        commit("SET_PEDIDOS_SERVICES",val);
    },

    setDetallePedidos({commit},val){//se agrega detalle/concepto a un pedido
        commit("SET_DETALLE_PEDIDOS",val);
    },

    deleteDetallePedidos({commit},val){//se borra el detalle de un concepto
        commit("DELETE_DETALLE_PEDIDOS",val);
    },

    deletePedidos({commit},val){//elimina un pedido completo
      commit("DELETE_PEDIDOS",val);
    },

    updateDetallePedidos({commit},val){//edita el pedido
      commit("UPDATE_PEDIDOS",val);
    }
  }
});
