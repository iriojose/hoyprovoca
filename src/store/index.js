import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
        //aplicacion:true,//determina la sesion para poder renderizar los componentes
		user:{//variabla de sesion
            token:null,
            data:{imagen:"default.png",fecha_nac:new Date().toDateString()},
            cliente:null,
            loggedIn:false
        },
        carrito:false,
        modalcarrito:false,
        modalsesion:false,
        modalProducto:false,
        bloqueado:false,
        search:'',
        bandera:false,
		//data global (grupos,empresas)
        grupos:[],
        empresas:[],
        ultimasOrdenes:[],
        //arrays
        pedidos:[],//guarda los pedidos
        agregados:[],//guarda ids de los conceptos agregados a pedidos
        totalPedidos:[],//guarda el total de cada pedido
        municipios:[],
        producto:{
            existencias:[
                {existencia:0}
            ]
        }//bandera para un producto seleccionado
	},
	mutations: {
        //data global
        SET_MUNICIPIOS(state,val){
            state.municipios = val;
        },
        SET_BANDERA(state,val){
            state.bandera = val;
        },
        SET_GRUPOS(state,val){
            state.grupos = val;
        },
        SET_EMPRESAS(state,val){
            state.empresas = val;
        },
        SET_BUSCAR(state,val){
            state.search = val;
        },
        SET_MODAL_CARRITO(state,val){
            val ? state.modalcarrito = true:state.modalcarrito = false;
        },
        SET_MODAL_SESION(state,val){
            val ? state.modalsesion = true:state.modalsesion = false;
        },
        SET_MODAL_BLOQUEADO(state,val){
            val ? state.bloqueado = true:state.bloqueado = false;
        },
        SET_MODAL_PRODUCTO(state,val){
            val ? state.modalProducto = true:state.modalProducto = false;
        },
        SET_CARRITO(state,val){
            val ? state.carrito = true:state.carrito = false;
        },
        SET_FOTO_PROFILE(state,val){
            state.user.data.imagen = val;
        },
		//autenticacion
        SET_LOGGED(state,val){//logea al usuario
            let data = {//se hizo asi para que los watch puedan escuchar el cambio de la variable user al iniciar sesion
                loggedIn:true,
                token:val.token,
                data:val.data,
                cliente:val.cliente
            };
            state.user = data;
            window.sessionStorage.setItem('token_client',JSON.stringify(val.token));
        },
        LOGOUT(state){//cierra la sesion
            state.snackbar = false;
            state.user.token=null;
            state.user.data={};
            state.user.loggedIn=false;
            state.pedidos = [];//se elimina los pedidos en local
            state.agregados = [];//se elemina los ids de los pedidos guardados
            state.totalPedidos = [];//se elimina los totales
            window.sessionStorage.clear();//se elimina la data de la sesion
            window.localStorage.setItem("pedidos","");//se elimina la data del localstorage
            window.localStorage.setItem("ultimasOrdenes","");
		},
		SET_PRODUCTO(state,val){
            state.producto=val;
		},
		SET_DATA(state,val){
            state.user.data = val;
        },
        SET_ULTIMAS_ORDENES(state,val){
            state.ultimasOrdenes = val;
        },

		//pedidos
        CALCULATOR(state){//calcula segun los cambios que se aplican en los pedidos
            state.totalPedidos = [];
            for (let i = 0; i < state.pedidos.length; i++) {
                let suma = 0;
                for (let e = 0; e < state.pedidos[i].detalles.length; e++) {
                    suma+= +state.pedidos[i].detalles[e].precio * +state.pedidos[i].detalles[e].cantidad;
                }
                state.totalPedidos.push(suma);
            }
        },
        SET_PEDIDOS(state,val){//añade todos los pedidos que vengan de la api
            state.pedidos = val;
            state.pedidos.filter(a => a.detalles.filter(b => state.agregados.push(b.adm_conceptos_id)));
            window.localStorage.setItem("pedidos",JSON.stringify(state.pedidos));
        },
        ADD_PEDIDOS(state,val){//añade un pedido (solo cuando se crea el pedido se usa)
            state.agregados.push(val.detalles[0].adm_conceptos_id);//se añade el id del producto
            state.pedidos.push(val);
            window.localStorage.setItem("pedidos",JSON.stringify(state.pedidos));
        },
        ADD_DETALLE(state,val){//se añade un detalle a un pedido existente
            state.agregados.push(val.adm_conceptos_id);
            state.pedidos.filter(a=> a.id == val.detalle.rest_pedidos_id ? a.detalles.push(val):null);
            state.pedidos.filter(a => a.id == val.detalle.rest_pedidos_id ? a.conceptos.push(val.concepto):null);
            window.localStorage.setItem("pedidos",JSON.stringify(state.pedidos));
        },
        DELETE_CARRITO(state){
            state.pedidos = [];
            state.agregados = [];
            window.localStorage.setItem("pedidos",JSON.stringify(state.pedidos));
        },
        DELETE_PEDIDO(state,index){//se elimina un pedido
            let aux=[],aux2=[];
            //se guarda los ids de los conceptos en aux[]
            state.pedidos[index].detalles.filter(a => aux.push(a.adm_conceptos_id));
            //se revisa si los ids estan en agregados para eliminarlos
            state.agregados.filter(a => aux.filter(b => !a == b ? aux2.push(a):null));
            state.agregados = aux2;//se asigna los ids que quedan
            state.pedidos.splice(index,1);//se elimna el pedido
            window.localStorage.setItem("pedidos",JSON.stringify(state.pedidos));
        },
        DELETE_DETALLE(state,data){//se elimina el detalle de un pedido
            //se consigue el concepto a eliminar
            let val = state.pedidos[data.indexPedido].detalles[data.indexDetalle].adm_conceptos_id;
            //se elimina antes del array de agregados
            state.agregados.splice(state.agregados.indexOf(val),1);
            //se elimina del array de detalles del pedido
            state.pedidos[data.indexPedido].detalles.splice(data.indexDetalle,1);
            window.localStorage.setItem("pedidos",JSON.stringify(state.pedidos));
        },
        UPDATE_DETALLE(state,data){//actualiza la cantidad de un detalle
            state.pedidos[data.indexPedido].detalles[data.indexDetalle].cantidad = data.cantidad;
            window.localStorage.setItem("pedidos",JSON.stringify(state.pedidos));
        },
	},
	actions: {
        setMunicipios({commit},val){
            commit("SET_MUNICIPIOS",val);
        },
        setCarrito({commit},val){
            commit('SET_CARRITO',val);
        },
        setModalCarrito({commit},val){
            commit('SET_MODAL_CARRITO',val);
        },
        setBandera({commit},val){
            commit('SET_BANDERA',val);
        },
        setBuscar({commit},val){
            commit('SET_BUSCAR',val);
        },
		setGrupos({commit},val){
            commit('SET_GRUPOS',val);
        },
        setEmpresas({commit},val){
            commit('SET_EMPRESAS',val);
		},
		setProducto({commit},val){
            commit('SET_PRODUCTO',val);
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
        },
        deleteCarrito({commit}){
            commit('DELETE_CARRITO');
		},
		setData({commit},val){
            commit('SET_DATA',val);
        },
        setFotoProfile({commit},val){
            commit('SET_FOTO_PROFILE',val);
        },
        setUltimasOrdenes({commit},val){
            commit("SET_ULTIMAS_ORDENES",val);
        },
        setModalBloqueado({commit},val){
            commit('SET_MODAL_BLOQUEADO',val);
        },
        setModalProducto({commit},val){
            commit('SET_MODAL_PRODUCTO',val);
        },
        setModalSesion({commit},val){
            commit('SET_MODAL_SESION',val);
        },
	},
	modules: {
	}
});
