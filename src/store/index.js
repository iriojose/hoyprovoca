import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        user:{
            token:null,
            data:{},
            loggedIn:false
        },
        search:'',
        drawer:false,
        snackbar:false,
        carrito:false,
        pedidos:[],
        agregados:[],
        totalPedidos:[],
        producto:{}
    },
    getters: {
        
    },
    mutations: {
        //banderas
        SET_DRAWER(state,val){
            val ? state.drawer = true:state.drawer = false;
        },
        SET_CARRITO(state,val){
            val ? state.carrito = true:state.carrito = false;
        },
        SET_SNACKBAR(state,val){
            val ? state.snackbar = true:state.snackbar = false;
        },
        SET_BUSCAR(state,val){
            state.search = val;
        },
        SET_PRODUCTO(state,val){
            state.producto=val;
        },

        //autenticacion
        SET_LOGGED(state,val){
            state.user.loggedIn = true;
            state.user.token= val.token;
            state.user.data = val.data;
            window.localStorage.setItem('token',val.token);
        },
        LOGOUT(state){
            state.user.token=null;
            state.user.data={};
            state.user.loggedIn=false;
            state.pedidos = [];
            window.localStorage.setItem('token',"");
        },

        //pedidos
        CALCULATOR(state){
            state.totalPedidos = [];
            for (let i = 0; i < state.pedidos.length; i++) {
                let suma = 0;
                for (let e = 0; e < state.pedidos[i].detalles.length; e++) {
                    suma+= +state.pedidos[i].detalles[e].precio * +state.pedidos[i].detalles[e].cantidad;
                }
                state.totalPedidos.push(suma);
            }
        },
        SET_PEDIDOS(state,val){
            state.pedidos = val;
            state.pedidos.filter(a => a.detalles.filter(b => state.agregados.push(b.adm_conceptos_id)));
        },
        ADD_PEDIDOS(state,val){
            state.agregados.push(val.detalles[0].adm_conceptos_id);
            state.pedidos.push(val);
        },
        ADD_DETALLE(state,val){
            state.agregados.push(val.adm_conceptos_id);
            state.pedidos.filter(a=> a.id == val.rest_pedidos_id ? a.detalles.push(val):null);
        },
        DELETE_PEDIDO(state,index){
            let aux=[],aux2=[];
            state.pedidos[index].detalles.filter(a => aux.push(a.adm_conceptos_id));
            state.agregados.filter(a => aux.filter(b => !a == b ? aux2.push(a):null));
            state.agregados = aux2;
            state.pedidos.splice(index,1);
        },
        DELETE_DETALLE(state,data){
            let val = state.pedidos[data.indexPedido].detalles[data.indexDetalle].adm_conceptos_id;
            state.agregados.splice(state.agregados.indexOf(val),1);
            state.pedidos[data.indexPedido].detalles.splice(data.indexDetalle,1);
        },
        UPDATE_DETALLE(state,data){
            state.pedidos[data.indexPedido].detalles[data.indexDetalle].cantidad = data.cantidad;
        },

    },
    actions: {
        setDrawer({commit},val){
            commit('SET_DRAWER',val);
        },
        setCarrito({commit},val){
            commit('SET_CARRITO',val);
        },
        setSnackbar({commit},val){
            commit('SET_SNACKBAR',val);
        },
        setBuscar({commit},val){
            commit('SET_BUSCAR',val);
        },
        setProdcuto({commit},val){
            commit('SET_PRODCUTO',val);
        },
        logged({commit},val){
            commit('SET_LOGGED',val);
        },
        logout({commit}){
            commit('LOGOUT');
        },
        setPedidos({commit},val){
            commit('SET_PEDIDOS',val);
            commit('CALCULATOR');
        },
        deletePedidoStore({commit},index){
            commit('DELETE_PEDIDO',index);
            commit('CALCULATOR');
        },
        deleteDetalleStore({commit},data){
            commit('DELETE_DETALLE',data);
            commit('CALCULATOR');
        },
        updateDetalleStore({commit},data){
            commit('UPDATE_DETALLE',data);
            commit('CALCULATOR');
        },
        addPedidos({commit},val){
            commit('ADD_PEDIDOS',val);
            commit('CALCULATOR');
        },
        addDetalle({commit},val){
            commit('ADD_DETALLE',val);
            commit('CALCULATOR');
        }
    }
});
