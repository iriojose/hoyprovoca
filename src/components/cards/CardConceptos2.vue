<template>
    <v-card class="hover" width="350" elevation="0" @click="modalDetalle" active-class="active">
        <v-card-text>
            <v-row justify="center">
                <v-col cols="12" sm="6"> 
                    <v-img 
                        :src="typeof concepto.imagen === 'undefined'  || concepto.imagen === 'default.png' ? require('@/assets/box.svg') : image + concepto.imagen"
                        contain
                        width="100%"
                        height="150"
                    >
                        <v-row class="mx-2" justify="end" v-if="parseExistencia(concepto) <= 0" style="height:100%">
                            <v-img 
                                contain 
                                :width="$vuetify.breakpoint.smAndDown ? 150:200" 
                                :height="$vuetify.breakpoint.smAndDown ? 100:150" 
                                :src="require('@/assets/agotado.png')"
                                class="pb-3"
                                style="position: absolute;top: 50%;left: 50%;transform: translate(-50%,-52%);"
                            />  
                        </v-row>
                    </v-img>
                </v-col>
                <v-col cols="12" sm="6">
                    <div class="text-truncate body-1 font-weight-black">{{precioDolar}}</div>
                    <div class="text-truncate body-1 font-weight-black">{{precio}}</div>
                    <div class="text-truncate font-weight-medium text-capitalize">{{concepto.nombre}}</div>
                    
                    <v-row justify="center" align="center" class="mt-5" v-if="!$vuetify.breakpoint.smAndDown">
                        <v-btn 
                            :disabled="concepto.agregado || parseExistencia(concepto) <= 0"
                            :loading="loading" 
                            @click.stop.prevent="modal(concepto)" 
                            block color="#0f2441" 
                            class="white--text text-capitalize"
                        >
                            Agregar
                        </v-btn>
                    </v-row>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script>
import variables from '@/services/variables_globales';
import accounting from 'accounting';
import {mapState,mapActions} from 'vuex';
import Conceptos from '@/services/Conceptos';
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
                ...variables,
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
                data1:[
                    {
                        adm_conceptos_id:0,
                        cantidad:1,
                        precio:0,
                        imagen:'',
                        fecha_at:new Date().toISOString().substr(0,10),
                        fecha_in:new Date().toISOString().substr(0,10)
                    }
                ]
            }
        },
        computed:{
            ...mapState(['user','pedidos']),

            precio(){
                return accounting.formatMoney(+this.concepto.precio_a,{symbol:"Bs ",thousand:'.',decimal:','});
            },
            precioDolar(){
                return accounting.formatMoney(+this.concepto.precio_dolar,{symbol:"$ ",thousand:',',decimal:'.'});
            }
        },
        methods:{
            ...mapActions(['setModalSesion','setModalProducto','setProducto','addPedidos','addDetalle']),

            modalDetalle(){
                this.setProducto(this.concepto);
                this.setModalProducto(true);
            },
            parseExistencia(concepto){
                return (Array.isArray(concepto.existencias) ? concepto.existencias.length > 0 ? concepto.existencias.map(a => Math.trunc(+a.existencia)).reduce((a, b) => a + b) : 0 : concepto.existencias)
            },
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
                    this.getExistencia(concepto);
                }else{
                    this.setModalSesion(true);
                }
            },
            modalDetalle(){
                this.setProducto(this.concepto);
                this.setModalProducto(true);
            },
            getExistencia(item){
                this.loading = true;
                Conceptos().get(`/${item.id}/depositos`).then((response) => {
                    if(this.parseExistencia(response.data.data) < 1){
                        this.error('Quedan '+this.parseExistencia(response.data.data)+' unidades en el stock.');
                    }else{
                        this.getEmpresa(item);
                    }
                }).catch(e =>{
                    console.log(e);
                    this.error("Error al procesar existencia.");
                });
            },
            getEmpresa(item){
                Empresa().get(`/${item.adm_empresa_id}?fields=imagen`).then((response) => {
                    this.data.imagen = response.data.data.imagen; 
                    this.data.adm_empresa_id = item.adm_empresa_id;
                    this.validacion(item);
                }).catch(e => {
                    console.log(e);
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
                this.data1[0].precio = item.precio_a;
                this.data1[0].imagen = item.imagen;
                Pedidos().post("/",{data:this.data,data1:this.data1}).then((response) => {
                    response.data.data.conceptos = [];
                    response.data.data.conceptos.push(this.concepto);
                    this.addPedidos(response.data.data);
                    this.success("Agregado exitosamente.");
                }).catch(e => {
                    console.log(e);
                    this.error("Error al procesar pedido.");
                });
            },
            postPedidosDetalle(item){
                this.data1[0].adm_conceptos_id = item.id;
                this.data1[0].precio = item.precio_a;
                this.data1[0].imagen = item.imagen;
                let data = this.data1[0];
                
                Pedidos().post(`/${this.encontradoPedido}/detalles`,{data:data}).then((response) => {
                    this.pedidos.filter(a => a.id ==  this.encontradoPedido ?  a.conceptos.push(this.concepto):null);
                    this.encontradoPedido = 0;
                    let data2 = {detalle:response.data.data,concepto:this.concepto};
                    this.addDetalle(data2);
                    this.success("Agregado exitosamente.");
                }).catch(e => {
                    console.log(e);
                    this.error("Error al procesar detalles del pedido.");
                });
            },
        }   
    }
</script>

<style lang="scss">
    .active, .hover:hover{
        background: #ECEFF1 !important;
    }
</style>