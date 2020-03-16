<template>
    <v-hover v-slot:default="{hover}">
        <v-card width="200" height="250" class="ma-2" elevation="0">
            <v-img contain width="200" height="150" :src="ruta+concepto.imagen"></v-img>
            <div class="text-truncate font-weight-medium text-capitalize">{{concepto.nombre}}</div>
            <div class="text-truncate body-2 grey--text text-capitalize">{{concepto.descripcion}}</div>
            <div class="text-truncate  font-weight-black text-capitalize">Bs {{concepto.precio_a}}</div>
            <v-fade-transition>
                <v-btn :disabled="concepto.agregado" block color="#005598" v-show="hover" class="white--text text-capitalize" @click="agregar(concepto)">
                    <div v-if="concepto.agregado">Agregar</div>
                    <div v-else>Agregado</div>   
                </v-btn>
            </v-fade-transition>
        </v-card>
    </v-hover>          
</template>

<script>
import url from '@/services/ruta';
import {mapState,mapActions} from 'vuex';
import router from '@/router';
import Conceptos from '@/services/Conceptos';
import Pedidos from '@/services/Pedidos';
import Auth from '@/services/Auth';

    export default {
        props:{
            concepto:{
                type:Object,
                default:() => ({})
            }
        },
        data(){
            ruta:null,
            existencia:null
        },
        mounted() {
            this.ruta = url;
        },
        computed: {
            ...mapState(['validacionConcep','user','producto','pedidos']),
        },
        methods: {
            ...mapActions(['setProducto','setValidacionConcepto','setPedidos','setDetallePedidos']),

            agregar(item){

            },

            getExistencia(item){
                Conceptos().get(`/${item.id}/depositos`).then((response) => {
                    this.existencia = response.data.data[0];
                }).catch(e => {
                    console.log(e);
                });
            },
            getUsuario(){
                Auth().post("/sesion", {token:this.user.token}).then((response) => {
                    this.postPedidos(response.data.data.id);
                }).catch(e => {
                    console.log(e);
                    this.loading=false;
                });
            },
            postPedidos(){
                
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>