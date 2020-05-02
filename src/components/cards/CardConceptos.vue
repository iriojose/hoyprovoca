<template>
    <v-hover v-slot:default="{hover}">
        <v-card 
            :width="$vuetify.breakpoint.smAndDown ? 150:200" 
            :height="$vuetify.breakpoint.smAndDown ? 200:250" 
            class="pa-3" elevation="2"
            @click="modalDetalle"
        >
            <v-img 
                contain 
                :width="$vuetify.breakpoint.smAndDown ? 150:200" 
                :height="$vuetify.breakpoint.smAndDown ? 100:150" 
                :src="image+concepto.imagen" class="pb-3"
            >
                <v-fade-transition>
                    <v-row justify="center" align="end" class="fill-height" v-show="hover">
                        <v-btn 
                            :disabled="concepto.agregado"
                            :loading="loading" 
                            @click.stop.prevent="modal(concepto)" 
                            block color="#D32F2F" 
                            class="white--text text-capitalize"
                        >
                            Agregar
                        </v-btn>
                    </v-row>
                </v-fade-transition>
            </v-img>
            <div class="text-truncate body-1 font-weight-black text-capitalize">{{precioDolar}}</div>
            <div class="text-truncate body-1 font-weight-black text-capitalize">{{precio}}</div>
            <div class="text-truncate font-weight-medium text-capitalize">{{concepto.nombre}}</div>
            <div class="text-truncate body-2 grey--text text-capitalize">{{concepto.descripcion}}</div>
        </v-card>
    </v-hover>
</template>

<script>
import variables from '@/services/variables_globales';
import {mapState,mapActions} from 'vuex';
import Conceptos from '@/services/Conceptos';
import Pedidos from '@/services/Pedidos';
import Empresa from '@/services/Empresa';
import accounting from 'accounting';

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
                precio:'',
                precioDolar:'',
                loading:false,
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
        mounted() {
            this.precioDolar = accounting.formatMoney(+this.concepto.precio_dolar,{symbol:"$ ",thousand:',',decimal:'.'});
            this.precio = accounting.formatMoney(+this.concepto.precio_a,{symbol:"Bs ",thousand:'.',decimal:','});
        },
        computed:{
            ...mapState(['user','pedidos'])
        },
        methods: {
            ...mapActions(['addPedidos','addDetalle','setModalSesion','setModalProducto','setProducto']),

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
                    if(Number.parseInt(response.data.data[0].existencia) < 1){
                        this.error('Quedan '+response.data.data[0].existencia+' unidades en el stock.');
                    }else{
                        this.getEmpresa(item);
                    }
                }).catch(e =>{
                    console.log(e);
                    this.error("Ooops, Intente mas tarde.");
                });
            },
            getEmpresa(item){
                Empresa().get(`/${item.adm_empresa_id}/?fields=imagen`).then((response) => {
                    this.data.imagen =response.data.data.imagen; 
                    this.data.adm_empresa_id = item.adm_empresa_id;
                    this.validacion(item);
                }).catch(e => {
                    console.log(e);
                    this.error("Ooops, Intente mas tarde.");
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

                Pedidos().post("/",{data:this.data,data1:this.data1}).then((response) => {
                    this.addPedidos(response.data.data);
                    this.success("Agregado exitosamente.");
                }).catch(e => {
                    console.log(e);
                    this.error("Ooops, Intente mas tarde.");
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
                    this.error("Ooops, Intente mas tarde.");
                });
            }
        },
    }
</script>