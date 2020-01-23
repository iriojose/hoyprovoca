import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state:{
    user:{
      token:null,
      loggedIn:false,
    },
    busqueda:'',
    drawer:false,
    grupos:[],
    dialog:false,
    panel:false,
    validarBusqueda:false,
    validacionConcep:false,
    producto:{},
    pedidos:[],
    totalCarrito:0,
    totalPedido:[],
    conceptosId:[]
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

    REFRESH_SUMA(state){//refresca el total del pedido y de los pedidos en total
      state.totalCarrito = null;
      state.totalPedido = [];

      for(let i = 0; i < state.pedidos.length; i++){
        let suma = 0;
        state.pedidos[i].detalles.filter(a => suma+=Number.parseFloat(a.precio)*a.cantidad);
        state.totalCarrito+=suma;
        state.totalPedido.push(suma); 
      }
    },
    
    SET_PEDIDOS_SERVICES(state,val){//cuando viene de la api
      state.pedidos=val;
      state.pedidos.filter(a => a.detalles.filter(b => state.conceptosId.push(b.conceptos_id)));
    },

    SET_DETALLE_PEDIDOS(state,val){//empuja el detalle al pedido deseado
      //agarra el id de los conceptos agregados
      state.conceptosId.push(val.conceptos_id);
      state.pedidos.filter(a => a.id == val.rest_pedidos_id ? a.detalles.push(val):null);
    },

    DELETE_DETALLE_PEDIDOS(state,val){//elimina el detalle de un pedido
      const a = state.pedidos.filter(a => a.detalles.filter(b => b.id !== val.id));
      state.conceptosId = state.conceptosId.filter(a => a !== val.conceptos_id);
      state.pedidos = a;

      /*for (let i = 0; i < state.pedidos.length; i++){
        for (let e = 0; e < state.pedidos[i].detalles.length; e++){
          if(state.pedidos[i].detalles[e].id == val.id){
            if(state.pedidos[i].detalles.length == 1){
              //elimina el id del arreglo conceptosId (sigue siendo un solo detalle)
              for (let f = 0; f < state.conceptosId.length; f++){
                if(state.conceptosId[f] == state.pedidos[i].detalles[e].conceptos_id){
                  state.conceptosId.splice(f,1);
                  break;
                }
              }
              state.pedidos.splice(i,1);
              break;
            }else{
              //elimina el id del arreglo conceptosId
              for (let f = 0; f < state.conceptosId.length; f++) {
                if(state.conceptosId[f] == state.pedidos[i].detalles[e].conceptos_id){
                  state.conceptosId.splice(f,1);
                  break;
                }
              }

              state.pedidos[i].detalles.splice(e,1);
              break;
            }
          }
        }
      }*/
    },

    DELETE_PEDIDOS(state,val){//elimina un pedido
      let aux = null;
      state.pedidos= state.pedidos.filter(a => {
        if(a.id == val){
          aux = a;
          return null;
        }
      });
      console.log(aux);
    },

    UPDATE_PEDIDOS(state,val){//actualiza el pedido (cantidad)
      state.pedidos = state.pedidos.filter(a => a.detalles.filter(b => {
        if(b.id == val.id){
          if(val.suma == 1){
            return b.cantidad = Number.parseInt(b.cantidad) + 1;
          }else{
            return b.cantidad = Number.parseInt(b.cantidad) - 1;
          } 
        }
      }));
    },

    UPDATE_STATUS(state,val){//actualiza el estatus del pedido de 1 a 2 (2 = por facturar)
      for (let i = 0; i < state.pedidos.length; i++) {
        if(state.pedidos[i].id == val.id){
          state.pedidos[i].rest_estatus.id=2;
          state.pedidosProcesados.push(state.pedidos[i]);
          state.pedidos.splice(i,1);
          break;
        }
      }
    },
    
    SET_VALIDA_BUSQUEDA(state,val){
      state.validarBusqueda=val;
    },

    SET_BUSQUEDA(state,val){
      state.busqueda=val;
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
    setBusqueda({commit},val){//cambia la variable busqueda
      commit("SET_BUSQUEDA",val);
    },

    setDrawer({commit},val){//abre el drawer lateral izquierdo
      commit("SET_DRAWER",val);
    },

    setPanel({commit},val){//abre el carrito
      commit("SET_PANEL",val);
    },

    setDialog({commit},val){//not used
      commit("SET_DIALOG",val);
    },

    setValidacionConcepto({commit},val){//abre el modal del concepto cuando necesita acotacion
      commit("SET_VALIDACION_CONCEP",val);
    },

    setProducto({commit},val){//guarda producto seleccionado 
      commit("SET_PRODUCTO",val);
    },
    
    logout({commit}){//logout de la cuenta
      commit("LOGOUT");
    },

    logged({commit},value){//logea al usuario
        commit("SET_LOGGED_IN",value);
    },

    setValidaBusqueda({commit},val){
      commit("SET_VALIDA_BUSQUEDA",val);
    },
    
    //pedidos actions
    setPedidos({commit},val){//crea encabezado pedido por empresa
        commit("SET_PEDIDOS",val);
    },

    setPedidosServices({commit},val){//en caso de haber recargado la pagina se traen desde la api
        commit("SET_PEDIDOS_SERVICES",val);
        commit("REFRESH_SUMA");
    },

    setDetallePedidos({commit},val){//se agrega detalle/concepto a un pedido
        commit("SET_DETALLE_PEDIDOS",val);
        commit("REFRESH_SUMA");
    },

    deleteDetallePedidos({commit},val){//se borra el detalle de un concepto
        commit("DELETE_DETALLE_PEDIDOS",val);
        commit("REFRESH_SUMA");
    },

    deletePedidos({commit},val){//elimina un pedido completo
      commit("DELETE_PEDIDOS",val);
      commit("REFRESH_SUMA");
    },

    updateDetallePedidosLocal({commit},val){//edita el pedido
      commit("UPDATE_PEDIDOS",val);
      commit("REFRESH_SUMA");
    },

    updateEstatusPedido({commit},val){//edita el estatus del pedido
      commit("UPDATE_STATUS",val);
      commit("REFRESH_SUMA");
    }
  }
});
