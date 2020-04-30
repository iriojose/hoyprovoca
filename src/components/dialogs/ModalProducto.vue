<template>
    <v-dialog v-model="productos" close-delay width="500" transition="dialog-bottom-transition">
        <v-card height="500" class="px-2">
            <v-card-title>
                <v-spacer></v-spacer>
                <v-hover v-slot:default="{hover}">
                    <v-btn fab text :elevation="hover ? 0:0" @click="close" small>
                        <v-icon :color="hover ? '#D32F2F':'#232323'">mdi-close</v-icon>
                    </v-btn>
                </v-hover>
            </v-card-title>
            <v-card-text>
                <v-img contain height="250" width="100%" :src="image+producto.imagen"></v-img>
                <div class="text-truncate text-center body-1 font-weight-black text-capitalize">{{precioDolar}}</div>
                <div class="text-truncate text-center body-1 font-weight-black text-capitalize">{{precioBolivar}}</div>
                <div class="text-truncate text-center font-weight-medium text-capitalize">{{producto.nombre}}</div>
                <div class="text-truncate body-2 text-center grey--text text-capitalize">{{producto.descripcion}}</div>
            </v-card-text>
            <v-card-actions class="mx-10">
                <v-btn 
                    :disabled="producto.agregado"
                    :loading="loading"
                    block 
                    @click="modal(producto)"
                    color="#D32F2F" 
                    class="white--text text-capitalize" 
                >
                    Agregar
                </v-btn>
            </v-card-actions>
        </v-card>

        <v-snackbar v-model="snackbar" :color="color" right :timeout="2000" absolute>
            <div>
                <v-icon color="#fff" class="mx-2">{{icon}}</v-icon>{{mensaje}}
            </div>
        </v-snackbar>
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
                snackbar:false,
                mensaje:'',
                icon:'',
                color:'',
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
            mensajeSnackbar(color,texto,icon){
                this.mensaje = texto;
                this.color=color;
                this.icon=icon;
                this.snackbar=true;
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
                    if(Number.parseInt(response.data.data[0].existencia) < 1){
                        this.mensajeSnackbar("#D32F2F",'Quedan '+response.data.data[0].existencia+' unidades en el stock.',"error");
                    }else{
                        this.getEmpresa(item);
                    }
                }).catch(e =>{
                    console.log(e);
                    this.mensajeSnackbar("#D32F2F","Ooops, Intente mas tarde.","error");
                });
            },
            getEmpresa(item){
                Empresa().get(`/${item.adm_empresa_id}/?fields=logo`).then((response) => {
                    this.data.imagen =response.data.data.logo; 
                    this.data.adm_empresa_id = item.adm_empresa_id;
                    this.validacion(item);
                }).catch(e => {
                    console.log(e);
                    this.mensajeSnackbar("#D32F2F","Ooops, Intente mas tarde.","error");
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
                    this.mensajeSnackbar("#388E3C","Agregado exitosamente.","done");
                }).catch(e => {
                    console.log(e);
                    this.mensajeSnackbar("#D32F2F","Ooops, Intente mas tarde.","error");
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
                    this.mensajeSnackbar("#388E3C","Agregado exitosamente.","done");
                }).catch(e => {
                    console.log(e);
                    this.mensajeSnackbar("#D32F2F","Ooops, Intente mas tarde.","error");
                });
            }
        },
    }
</script>