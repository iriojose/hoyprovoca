<template>
    <v-btn 
        :disabled="agregado || parseExistencia(concepto) <= 0"
        :loading="loading" 
        @click.stop.prevent="modal(concepto)" 
        block color="#0f2441" 
        class="white--text text-capitalize"
    >
        Agregar
    </v-btn>
</template>

<script>
import {mapState,mapActions} from 'vuex';
import Pedidos from '@/services/Pedidos';
import Empresa from '@/services/Empresa';

    export default {
        props:{
            concepto:{
                type:Object,
                default:() => ({})
            }
        },
        data(){
            return {
                encontradoPedido:0,
                loading:false,
                data:{
                    usuario_id:0,
                    adm_clientes_id:0,
                    adm_empresa_id:0,
                    imagen:'',
                    fecha_at:new Date().toISOString().substr(0,10),
                    fecha_in:new Date().toISOString().substr(0,10)
                },
                data1:[{
                    adm_conceptos_id:0,
                    cantidad:1,
                    precio:0,
                    imagen:'',
                    fecha_at:new Date().toISOString().substr(0,10),
                    fecha_in:new Date().toISOString().substr(0,10)
                }]
            }
        }, 
        computed:{
            ...mapState(['user','pedidos']),

            agregado(){
                return this.concepto.agregado;
            }
        },
        methods:{
            ...mapActions(['addPedidos','addDetalle','setModalSesion','setModalProducto','setProducto']),

            success(mensaje){
                this.$toasted.success(mensaje, { 
                    theme: "toasted-primary", 
                    position: "top-right", 
                    duration : 2000,
                    //icon : "done",
                });
                this.loading = false;
            },
            error(mensaje){
                this.$toasted.error(mensaje, { 
                    theme: "toasted-primary", 
                    position: "top-right", 
                    duration : 2000,
                    //icon : "error",
                });
                this.loading = false;
            },
            modal(concepto){
                if(this.user.loggedIn){
                    this.getEmpresa(concepto);
                }else{
                    this.setModalSesion(true);
                }
            },
            getEmpresa(item){
                this.loading = true;
                Empresa().get(`/${item.adm_empresa_id}?fields=imagen,nombre_comercial`).then((response) => {
                    this.data.imagen = response.data.data.imagen; 
                    this.data.adm_empresa_id = item.adm_empresa_id;
                    this.validacion(item);
                }).catch(e => {
                    this.error("Error al obtener Empresa.");
                });
            },
            validacion(item){
                this.pedidos.filter(a => a.adm_empresa_id == item.adm_empresa_id ? this.encontradoPedido=a.id:null);
                if(this.encontradoPedido > 0 ){
                    this.postPedidosDetalle(item);
                }else{
                    this.postPedidos(item);
                }
            },
            postPedidos(item){
                this.data.adm_clientes_id = this.user.cliente.id;
                this.data1[0].adm_conceptos_id = item.id;
                this.data1[0].precio = item.precio_dolar;
                this.data1[0].imagen = item.imagen;
                Pedidos().post("/",{data:this.data,data1:this.data1}).then((response) => {
                    response.data.data.conceptos = [];
                    response.data.data.conceptos.push(this.concepto);
                    this.addPedidos(response.data.data);
                    this.success("Nuevo pedido Agregado.");
                }).catch(e => {
                    this.error("Error al procesar pedido.");
                });
            },
            postPedidosDetalle(item){
                this.data1[0].adm_conceptos_id = item.id;
                this.data1[0].precio = item.precio_dolar;
                this.data1[0].imagen = item.imagen;
                let data = this.data1[0];
                
                Pedidos().post(`/${this.encontradoPedido}/detalles`,{data:data}).then((response) => {
                    this.pedidos.filter(a => a.id == this.encontradoPedido ?  a.conceptos.push(this.concepto):null);
                    this.encontradoPedido = 0;
                    let data2 = {detalle:response.data.data,concepto:this.concepto};
                    this.addDetalle(data2);
                    this.success("Detalle Agregado.");
                }).catch(e => {
                    this.error("Error al procesar detalles del pedido.");
                });
            },
            parseExistencia(concepto){
                return (Array.isArray(concepto.existencias) ? concepto.existencias.length > 0 ? concepto.existencias.map(a => Math.trunc(+a.existencia)).reduce((a, b) => a + b) : 0 : concepto.existencias)
            }
        }
    }
</script>