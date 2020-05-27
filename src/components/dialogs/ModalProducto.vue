<template>
    <v-dialog v-model="productos" close-delay width="500" transition="dialog-bottom-transition">
        <v-card height="500" class="px-2 border">
            <v-card-title>
                <v-spacer></v-spacer>
                <v-hover v-slot:default="{hover}">
                    <v-btn fab text :elevation="hover ? 0:0" @click="close" small>
                        <v-icon :color="hover ? '#D32F2F':'#232323'">mdi-close</v-icon>
                    </v-btn>
                </v-hover>
            </v-card-title>
            <v-card-text>
                <v-img contain height="250" width="100%"
                :src="typeof producto.imagen === 'undefined'  || producto.imagen === 'default.png' ? require('@/assets/box.svg') : image + producto.imagen"
                >
                    <v-row class="mx-2" justify="end" v-if="parseExistencia(producto) <= 0" style="height:100%">
                        <v-img 
                            contain 
                            :width="$vuetify.breakpoint.smAndDown ? 150:200" 
                            :height="$vuetify.breakpoint.smAndDown ? 100:150" 
                            :src="require('@/assets/agotado.png')"
                            class="pb-3"
                            style="position: absolute;top: 50%;left: 50%;transform: translate(-50%,-52%);width:17em;"
                        />   
                    </v-row>
                </v-img>
                <div class="text-truncate text-center body-1 font-weight-black text-capitalize">{{precioDolar}}</div>
                <div class="text-truncate text-center body-1 font-weight-black text-capitalize">{{precioBolivar}}</div>
                <div class="text-truncate text-center font-weight-medium text-capitalize">{{producto.nombre}}</div>
                <div class="text-truncate body-2 text-center grey--text text-capitalize">{{producto.descripcion}}</div>
            </v-card-text>
            <v-card-actions class="mx-10">
                <v-btn 
                    :disabled="producto.agregado || parseExistencia(producto) <= 0 ? true:false"
                    :loading="loading"
                    block 
                    @click="modal(producto)"
                    color="#0f2441" 
                    class="white--text text-capitalize" 
                >
                    Agregar
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import {mapState,mapActions} from 'vuex';
import variables from '@/services/variables_globales';
import accounting from 'accounting';
import Conceptos from '@/services/Conceptos';
import Pedidos from '@/services/Pedidos';
import Empresa from '@/services/Empresa';

    export default {    
        computed:{
            ...mapState(['modalProducto','producto','user','pedidos']),

            productos:{
                get(){ return this.modalProducto},
                set(val){ this.setModalProducto(val)},
            }
        },
        data(){
            return {
                ...variables,
                precioDolar:null,
                precioBolivar:null,
                loading:false,
                encontradoPedido:0,
                data:{
                    usuario_id:0,
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
        watch:{
            producto(){
                this.precioDolar = accounting.formatMoney(+this.producto.precio_dolar,{symbol:"$ ",thousand:',',decimal:'.'});
                this.precioBolivar = accounting.formatMoney(+this.producto.precio_a,{symbol:"Bs ",thousand:'.',decimal:','});
            }
        },
        methods: {
            ...mapActions(['setModalProducto','addPedidos','addDetalle','setModalSesion']),

            close(){
                this.setModalProducto(false);
            },
            success(mensaje){
                this.$toasted.success(mensaje, { 
                    theme: "toasted-primary", 
                    position: "top-right", 
                    duration : 2000,
                    icon : "done",
                });
                this.loading = false;
            },
            error(mensaje){
                this.$toasted.error(mensaje, { 
                    theme: "toasted-primary", 
                    position: "top-right", 
                    duration : 2000,
                    icon : "error",
                });
                this.loading = false;
            },
            modal(concepto){
                if(this.user.loggedIn){
                    this.getExistencia(concepto);
                }else{
                    this.setModalProducto(false);
                    this.setModalSesion(true);
                }
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
                    this.error("Error al obtener existencia.");
                });
            },
            getEmpresa(item){
                Empresa().get(`/${item.adm_empresa_id}`).then((response) => {
                    this.data.imagen =response.data.data.imagen; 
                    this.data.adm_empresa_id = item.adm_empresa_id;
                    this.validacion(item);
                }).catch(e => {
                    console.log(e);
                    this.error("Error al obtener empresa.");
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
                this.data.usuario_id = this.user.data.id;
                this.data1[0].adm_conceptos_id = item.id;
                this.data1[0].precio = item.precio_a;
                this.data1[0].imagen = item.imagen;

                Pedidos().post("/",{data: this.data , data1: this.data1 }).then((response) => {
                    this.addPedidos(response.data.data);
                    this.success("Agregado exitosamente.");
                }).catch(e => {
                    console.log(e);
                    this.error("Error al crear pedido.");
                });
            },
            postPedidosDetalle(item){
                this.data1[0].adm_conceptos_id = item.id;
                this.data1[0].precio = item.precio_a;
                this.data1[0].imagen = item.imagen;
                let data = this.data1[0];
                
                Pedidos().post(`/${this.encontradoPedido}/detalles`,{data:data}).then((response) => {
                    this.encontradoPedido = 0;
                    this.addDetalle(response.data.data);
                    this.success("Agregado exitosamente.");
                }).catch(e => {
                    console.log(e);
                    this.error("Error al crear detalle de pedido..");
                });
            },
            parseExistencia(concepto){
                return (Array.isArray(concepto.existencias) ? concepto.existencias.length > 0 ? concepto.existencias.map(a => Math.trunc(+a.existencia)).reduce((a, b) => a + b) : 0 : concepto.existencias)
            }
        },
    }
</script>

<style lang="scss" scoped>
    .border{
        border-radius:30px;
    }
</style>