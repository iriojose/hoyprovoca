import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        user:{//variabla de sesion
            token:null,
            data:{},
            loggedIn:false
        },
        foto: '',
        fotoChanged: false,
        fotoFile: null,
        bloqueado:false,
        search:'',
        foto: '',
        fotoChanged:false,
        fotoFile: null,
        //banderas
        drawer:false,
        snackbar:false,
        carrito:false,
        modalsesion:false,
        modalcarrito:false,
        bandera:false,
        modalUbicacion:false,
        modalProducto:false,
        modalImagen:false,
        //arrays
        pedidos:[
            {
                id:1,
                usuario_id:7,
                rest_mesas_id:0,
                rest_estatus_id:1,
                estado:"PRUEBA",
                cant_personas:1,
                nom_empresa:'SomosSistemas',
                imagen:"default.png",
                adm_empresa_id:2,
                detalles:[
                    {
                        id:1,
                        rest_pedidos_id:1,
                        adm_conceptos_id:2,
                        cantidad:"1",
                        precio:"200000",
                        imagen:"default.png",
                        rest_estatus_id:1,
                        stock:0,
                        estado:"PRUEBA"
                    },
                    {
                        id:2,
                        rest_pedidos_id:1,
                        adm_conceptos_id:3,
                        cantidad:"1",
                        precio:"220000",
                        stock:0,
                        imagen:"default.png",
                        rest_estatus_id:1,
                        estado:"ACTIVO"
                    }
                ]
            },
            {
                id:2,
                usuario_id:7,
                rest_mesas_id:0,
                rest_estatus_id:1,
                estado:"PRUEBA",
                cant_personas:1,
                nom_empresa:'SomosSistemas',
                imagen:"default.png",
                adm_empresa_id:1,
                detalles:[
                    {
                        id:3,
                        rest_pedidos_id:2,
                        adm_conceptos_id:4,
                        cantidad:"1",
                        precio:"240000",
                        imagen:"default.png",
                        stock:0,
                        rest_estatus_id:1,
                        estado:"ACTIVO"
                    },
                    {
                        id:4,
                        rest_pedidos_id:2,
                        adm_conceptos_id:5,
                        cantidad:"1",
                        precio:"230000",
                        imagen:"default.png",
                        stock:0,
                        rest_estatus_id:1,
                        estado:"INACTIVO"
                    }, {
                        id:5,
                        rest_pedidos_id:2,
                        adm_conceptos_id:4,
                        cantidad:"1",
                        precio:"240000",
                        imagen:"default.png",
                        stock:0,
                        rest_estatus_id:1,
                        estado:"ACTIVO"
                    }, {
                        id:6,
                        rest_pedidos_id:2,
                        adm_conceptos_id:4,
                        cantidad:"1",
                        precio:"240000",
                        imagen:"default.png",
                        rest_estatus_id:1,
                        stock:0,
                        estado:"ACTIVO"
                    }, {
                        id:37,
                        rest_pedidos_id:2,
                        adm_conceptos_id:4,
                        cantidad:"1",
                        precio:"240000",
                        imagen:"default.png",
                        stock:0,
                        rest_estatus_id:1,
                        estado:"ACTIVO"
                    },
                ]
            }
        ],//guarda los pedidos
        agregados:[],//guarda ids de los conceptos agregados a pedidos
        totalPedidos:[
            4500000,
            49000000
        ],//guarda el total de cada pedido
        producto:{
            existencias:[
                {existencia:0}
            ]
        }//bandera para un producto seleccionado
    },
    getters: {
        
    },
    mutations: {
        //banderas
        SET_FOTO(state, val) {
            state.foto = val;
        },
        SET_FOTOFILE(state, val) {
            state.fotoFile = val;
        },
        SET_CHANGEFOTO(state, val) {
            state.fotoChanged = val;
        },
        SET_BANDERA(state,val){
            state.bandera = val;
        },
        SET_DRAWER(state,val){
            val ? state.drawer = true:state.drawer = false;
        },
        SET_MODAL_SESION(state,val){
            val ? state.modalsesion = true:state.modalsesion = false;
        },
        SET_MODAL_BLOQUEADO(state,val){
            val ? state.bloqueado = true:state.bloqueado = false;
        },
        SET_MODAL_UBICACION(state,val){
            val ? state.modalUbicacion = true:state.modalUbicacion = false;
        },
        SET_MODAL_IMAGEN(state,val){
            val ? state.modalImagen = true:state.modalImagen = false;
        },
        SET_MODAL_PRODUCTO(state,val){
            val ? state.modalProducto = true:state.modalProducto = false;
        },
        SET_MODAL_CARRITO(state,val){
            val ? state.modalcarrito = true:state.modalcarrito = false;
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
        SET_LOGGED(state,val){//logea al usuario
            console.log(val);
            window.localStorage.clear();//se elimina el cache guardado
            state.user.loggedIn = true;
            state.user.token = val.token;
            state.user.data = val.response.data;
            window.sessionStorage.setItem('token_client',val.token);
        },
        LOGOUT(state){//cierra la sesion
            state.snackbar = false;
            state.user.token=null;
            state.user.data={};
            state.user.loggedIn=false;
            state.pedidos = [];//se elimina los pedidos en local
            window.sessionStorage.clear();//se elimina la data de la sesion
            window.localStorage.clear();//se elimina la data del localstorage
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
        },
        ADD_PEDIDOS(state,val){//añade un pedido (solo cuando se crea el pedido se usa)
            state.agregados.push(val.detalles[0].adm_conceptos_id);//se añade el id del producto
            state.pedidos.push(val);
        },
        ADD_DETALLE(state,val){//se añade un detalle a un pedido existente
            state.agregados.push(val.adm_conceptos_id);
            state.pedidos.filter(a=> a.id == val.rest_pedidos_id ? a.detalles.push(val):null);
        },
        DELETE_CARRITO(state){
            state.pedidos = [];
            state.agregados = [];
        },
        DELETE_PEDIDO(state,index){//se elimina un pedido
            let aux=[],aux2=[];
            //se guarda los ids de los conceptos en aux[]
            state.pedidos[index].detalles.filter(a => aux.push(a.adm_conceptos_id));
            //se revisa si los ids estan en agregados para eliminarlos
            state.agregados.filter(a => aux.filter(b => !a == b ? aux2.push(a):null));
            state.agregados = aux2;//se asigna los ids que quedan
            state.pedidos.splice(index,1);//se elimna el pedido
        },
        DELETE_DETALLE(state,data){//se elimina el detalle de un pedido
            //se consigue el concepto a eliminar
            let val = state.pedidos[data.indexPedido].detalles[data.indexDetalle].adm_conceptos_id;
            //se elimina antes del array de agregados
            state.agregados.splice(state.agregados.indexOf(val),1);
            //se elimina del array de detalles del pedido
            state.pedidos[data.indexPedido].detalles.splice(data.indexDetalle,1);
        },
        UPDATE_DETALLE(state,data){//actualiza la cantidad de un detalle
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
        setBandera({commit},val){
            commit('SET_BANDERA',val);
        },
        setModalCarrito({commit},val){
            commit('SET_MODAL_CARRITO',val);
        },
        setModalBloqueado({commit},val){
            commit('SET_MODAL_BLOQUEADO',val);
        },
        setModalProducto({commit},val){
            commit('SET_MODAL_PRODUCTO',val);
        },
        setModalImagen({commit},val){
            commit('SET_MODAL_IMAGEN',val);
        },
        setModalSesion({commit},val){
            commit('SET_MODAL_SESION',val);
        },
        setModalUbicacion({commit},val){
            commit('SET_MODAL_UBICACION',val);
        },
        setSnackbar({commit},val){
            commit('SET_SNACKBAR',val);
        },
        setBuscar({commit},val){
            commit('SET_BUSCAR',val);
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
        setFoto({ commit }, val) {
            commit('SET_FOTO', val);
        },
        setFotoChanged({ commit }, val) {
            commit('SET_CHANGEFOTO', val);
        },
        setFotoFile({ commit }, val) {
            commit('SET_FOTOFILE', val);
        },
    }
});
