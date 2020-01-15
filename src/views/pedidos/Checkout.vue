<template>
    <div v-if="pedidos.length==0">
        <v-toolbar width="100%" height="50" color="#005598">
           <v-btn text to="/" disabled>
               <v-img width="120" height="120" src="@/assets/logo2.png" contain></v-img>
           </v-btn>
           <v-spacer></v-spacer>
           <v-btn to="/" text elevation="0" dark class="caption text-capitalize">
               Seguir Comprando
           </v-btn>
        </v-toolbar>

        <div class="text-center mt-10">
            <strong class="grey--text">No tienes pedidos pendientes...</strong>
            <v-row justify="center" align="center">
                <v-col cols="12" md="6">
                    <v-img src="@/assets/nodata.svg" height="500" contain />
                </v-col>
            </v-row>
        </div>
    </div>
    <div v-else>
        <v-toolbar width="100%" height="50" color="#005598">
           <v-btn text to="/" disabled>
               <v-img width="120" height="120" src="@/assets/logo2.png" contain></v-img>
           </v-btn>
           <v-spacer></v-spacer>
           <v-btn to="/" text elevation="0" dark class="caption text-capitalize">
               Seguir Comprando
           </v-btn>
        </v-toolbar>

        <v-row :class="$vuetify.breakpoint.smAndDown ? 'mx-3':null"> 
           <v-col cols="12" :offset="$vuetify.breakpoint.smAndDown ? null:1" md="6"> 
               <div class="text-center title mt-5">
                   Pedidos
               </div>

               <v-sheet
                    class="mt-5 py-3"
                    elevation="10"
                >
                    <v-slide-group show-arrows>
                        <v-slide-item
                            v-for="(pedido,i) in pedidos"
                            :key="pedido.id"
                            v-slot:default="{active}"
                        >
                            <v-btn
                                class="mx-2"
                                :active-class="active ? 'purple white--text':null"
                                depressed
                                rounded
                                @click="selectPedido(pedido,i),active"
                            >
                                {{pedido.id}}
                            </v-btn>
                        </v-slide-item>
                    </v-slide-group>
                </v-sheet>

                <v-card elevation="10" class="mt-10 text-center" width="100%" v-if="detalles">
                    <v-subheader class="title px-10">Articulos</v-subheader>
                    <v-toolbar elevation="0"
                        v-for="(detalle,i) in detalles"
                        :key="i"
                    >
                        <v-img 
                            width="50" 
                            height="50" 
                            contain 
                            src="@/assets/noimage.png"
                        />
                        <v-spacer></v-spacer>

                        <v-toolbar-title>
                            xiaomi redmi note 7 plus
                        </v-toolbar-title>

                        <v-spacer></v-spacer>

                        <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                                <v-btn  class="mx-2" tile icon :disabled="detalle.cantidad==1 ? true:false" @click="restar(detalle)" v-on="on">
                                    <v-icon dark>exposure_neg_1</v-icon>
                                </v-btn>
                            </template>
                            <span>Restar</span>
                        </v-tooltip>

                        <div class="mx-2 font-weight-black subtitle-1">{{Number.parseInt(detalle.cantidad)}}</div>

                        <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                                <v-btn class="mx-2" tile icon @click="sumar(detalle)" v-on="on">
                                    <v-icon dark>plus_one</v-icon>
                                </v-btn>
                            </template>
                            <span>Sumar</span>
                        </v-tooltip>
     
                        <v-spacer></v-spacer>

                        <v-toolbar-title>
                            Bs. {{detalle.precio}} 
                        </v-toolbar-title>
                        
                        <v-spacer></v-spacer>

                        <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                                <v-btn 
                                    fab 
                                    color="#005598" 
                                    width="40" 
                                    height="40" 
                                    @click="deletePedidosDetail(detalle,pedido)" 
                                    :loading="loading"
                                    v-if="detalles.length !== 1"
                                    v-on="on"
                                >
                                    <v-icon color="#fff">delete</v-icon>
                                </v-btn>
                            </template>
                            <span>Borrar Detalle</span>
                        </v-tooltip>
                    </v-toolbar>
                </v-card>
            </v-col>

            <v-col cols="12" md="4" class="mt-10">
                <v-card 
                    elevation="10" 
                    :class="$vuetify.breakpoint.smAndDown ? 'py-4':'fix mx-5 py-4'"
                >
                    <div class="text-center title mb-3">
                        Bolivares/Dolares
                    </div>
                    <v-divider></v-divider>
                    <v-row class="px-5">
                        <v-col cols="12" md="6" sm="6">
                            <div class="py-2 text-center">$</div>
                            <v-text-field 
                                solo
                                v-model="bolivar"
                                dense
                                color="#000"
                                hide-details
                                disabled
                                single-line
                                type="number"
                            />
                        </v-col>
                        <v-col cols="12" md="6" sm="6">
                            <div class="py-2 text-center">Bs.</div>
                            <v-text-field 
                                solo
                                v-model="totalPedido[index]"
                                dense
                                color="#000"
                                hide-details
                                disabled
                                single-line
                                type="number"
                            />
                        </v-col>
                    </v-row>
                    <v-divider class="mt-2"></v-divider>
                    <v-card-actions class="mx-auto px-5 my-2">
                        <v-row>
                            <v-col cols="12" md="12" sm="12">
                                <v-file-input
                                    label="Abjuntar Pago"
                                    counter
                                    @change="change($event)"
                                    dense
                                    color="#005598"
                                    outlined
                                />
                            </v-col>
                            <v-col cols="12" md="12" sm="12" justify-self="center" align-self="center" class="fill-height">
                                <v-img :width="$vuetify.breakpoint.smAndDown ? 330:450" height="200" contain v-if="bauche" :src="bauche" />
                            </v-col>
                            <v-col cols="12" md="12" sm="12" v-if="bauche">
                                <v-btn block color="#005598" class="text-capitalize white--text" rounded @click="pagar">
                                    Confirmar
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-card-actions>
                </v-card>
            </v-col>
       </v-row>

        <v-snackbar v-model="snackbar" color="red" right class="white--text">
           Existencia maxima alcanzada.
        </v-snackbar>
    </div>
</template>

<script>
//services
import Pedidos from '@/services/Pedidos';
import Usuario from '@/services/Usuario';
import Conceptos from '@/services/Conceptos';
//state
import {mapState, mapActions,mapGetters} from 'vuex';

    export default {
        data() {
            return {
                imagen:null,
                bolivar:0,
                dolares:0,
                bauche:null,
                detalles:null,
                pedido:null,
                loading:false,
                index:null,
                snackbar:false
            }
        },

        mounted() {
            if(this.pedidos.lenght == 0){
                this.getUsuario();
            }
        },

        computed: {
            ...mapState(['pedidos','totalCarrito','totalPedido']),
            ...mapGetters(['user']),
        },

        methods: {
            ...mapActions(['deleteDetallePedidos','setPedidosServices','setDetallePedidos','deletePedidos','updateDetallePedidosLocal']),

            change(evt){
                this.bauche=null;

                if(evt){
                    var reader = new FileReader();
                    reader.onload = (e) => {
                        this.bauche = e.target.result;
                        this.imagen = evt;
                    }
                    reader.readAsDataURL(evt);
                }
            },

            selectPedido(val,i){//selecciona el pedido y sus detalles + el index del arreglo de pedidos
                this.detalles=val.detalles;
                this.pedido=val;
                this.index=i;
            },

            pagar(file){
                let data={
                    "empresa_id": 3,
                    "codigo": "0308942",
                    "referencia": "F0221",
                    "nombre": "rueda e carne",
                    "descripcion": "rueda de carne elistica",
                    "talla": null,
                    "color": null,
                    "descuento": null,
                    "serial_estatico": 0,
                    "serial_dinamico": 0,
                    "existencia_minima": "20.000",
                    "existencia_maxima": "500.000",
                    "tipos_conceptos_id": 2,
                    "ubicacion_id": 1,
                    "costo": null,
                    "ultimo_costo": "69500.00",
                    "costo_mayor": "68000.00",
                    "costo_promedio": "68000.00",
                    "fecha_at": "2019-07-11T04",
                    "fecha_in": "2019-08-13T04",
                    "fecha_uc": "2019-08-12T04",
                    "grupos_id": 3,
                    "subgrupos_id": 5,
                    "presentacion": null,
                    "unidades_id": 3,
                    "fecha_hora": null,
                    "marcas_id": null,
                    "estado": 1,
                    "pvp": null,
                    "precio_a": "200000.00",
                    "precio_b": "69500.00",
                    "precio_c": "69500.00",
                    "precio_dolar": "5.75",
                    "utilidad": null,
                    "utilidad_a": "17.54",
                    "utilidad_b": "2.21",
                    "utilidad_c": "2.21",
                    "utilidad_dolar": "15",
                    "costo_dolar": "5.00",
                    "precio_variable": 0,
                    "retiene": 0,
                    "farm_principio_activo_id": null,
                    "costo_adicional": "0.00",
                    "costo_adicional2": "0.00",
                    "cant_ensamblado": "0.00",
                    "licor": 0,
                    "porcentaje": null,
                    "visible_pv": 1,
                    "visible_web": null,
                    "rest_areas_id": null,
                    "setcortesia": 0,
                    "exento": null,
                    "merma": 1,
                    "existencia_c": null,
                    "obviar_ajuste": 1,
                    "iva": 1
                }
                let image=this.imagen;

                Conceptos().post("/",{data,image}).then((response) => {
                    console.log(response);
                }).catch(e => {
                    console.log(e);
                })
            },  

            sumar(detalle){
                this.getConceptoExistencia(detalle,1);
            },
            restar(detalle){
                this.getConceptoExistencia(detalle,0);
            },

            //llamadas a la api
            getUsuario(){
                Usuario().post("/validate",{user_token:this.user.token}).then((response) => {
                    this.getPedidosUsuario(response.data.data.id);
                }).catch(e => {
                    console.log(e);
                });
            },

            getPedidosUsuario(id){
                Usuario().get(`/${id}/pedidos`).then((response) =>{
                    if(response.data !== 'This entity is empty'){
                        this.setPedidosServices(response.data.data);//local method

                        if(this.index){//si ya existe un index  
                            this.selectPedido(this.pedidos[this.index],this.index);//metodo interno del componente
                        }else{
                            this.selectPedido(this.pedidos[0],0);
                        }
                    }else{
                        console.log('no tienes pedidos');
                    }
                }).catch(e => {
                    console.log(e);
                });
            },

            deletePedidosDetail(detalle,pedido){//elimina el detalle de un pedido
                this.loading=true;
                Pedidos().delete(`/${pedido.id}/detalles/${detalle.id}`).then((response) => {
                    this.deleteDetallePedidos(detalle);//local method
                    this.loading=false;
                }).catch(e => {
                    console.log(e);
                    this.loading=false;
                });
            },

            updateDetallesPedidos(detalle,val){//actualiza el detalle del pedido a suma o resta
                let data = {
                    cantidad:detalle.cantidad,
                    conceptos_id:detalle.conceptos_id
                };
                let detalle1 = detalle;
                detalle1.suma=val;//los metodos del store solo admiten una variable por parametro de otra forma llega undefined

                if(val == 1){
                    data.cantidad = Number.parseInt(detalle.cantidad) + 1;
                }else{
                    data.cantidad = detalle.cantidad - 1 ;
                }

                Pedidos().post(`/${detalle1.rest_pedidos_id}/detalles/${detalle1.id}`,{data}).then((response) => {
                    console.log(response.data);
                    this.updateDetallePedidosLocal(detalle1);//local method
                }).catch(e => {
                    console.log(e);
                })
            },

            getConceptoExistencia(detalle,val){//trae la existencia del concepto
                Conceptos().get(`/${detalle.conceptos_id}/depositos`).then((response) => {
                    if(Number.parseInt(response.data.data[0].existencia) > 0 && Number.parseInt(detalle.cantidad) <= Number.parseInt(response.data.data[0].existencia)){
                        this.updateDetallesPedidos(detalle,val);
                    }else{
                        this.snackbar=true;
                    }
                }).catch(e => {
                    console.log(e);
                });
            }
        },

    }
</script>

<style scoped>
    .fix{
        position:fixed;
        top: 102px;
        width: 500px;
    }
   
</style>