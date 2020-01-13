<template>
    <div>
        <v-card width="100%" elevation="2">
            <v-card-title class="title font-weight-bold back">
                Historial de compras
            </v-card-title>
            <v-divider></v-divider>

            <v-card-text>
                <v-card-title>
                    <v-text-field
                        v-model="search"
                        append-icon="search"
                        label="Buscar registro..."
                        dense
                        color="#005598"
                        single-line
                        hide-details
                    />
                    <v-spacer></v-spacer>
                </v-card-title>
                <v-data-table
                    no-results-text="No se encontraron resultados..."
                    :headers="headers"
                    :items="pedidosStados"
                    :search="search"
                    :page.sync="page"
                    :items-per-page="itemsPerPage"
                    hide-default-footer
                    class="elevation-0"
                    @page-count="pageCount = $event"
                >
                    <template v-slot:item.action="{ item }">
                        <v-icon class="mr-2" @click="verItem(item)"> 
                            remove_red_eye
                        </v-icon>
                    </template>
                </v-data-table>
                <div class="text-center pt-3">
                    <v-pagination 
                        v-model="page" 
                        :length="pageCount" 
                        color="teal"
                        circle
                    />
                </div>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
import {mapState,mapActions} from 'vuex';

    export default {
        data(){
            return{
                page: 1,
                pageCount: 0,
                itemsPerPage: 5,
                search:'',
                headers: [
                    {
                        text: 'id',
                        align: 'left',
                        sortable: true,
                        value: 'id',
                    },
                    {text: 'Detalles',sortable: false,value: 'detalles'},
                    { text: 'Articulos', value: 'articulos',sortable: false},
                    { text: 'Total', value: 'total',sortable: false},
                    { text: 'estado', value: 'estado',sortable: false},
                    { text: 'Acciones', value: 'action', sortable: false },
                ],
                pedidosStados:[],
            }
        },
        mounted() {
            this.ordenarPedidos();
        },
        computed:{
            ...mapState(['pedidos','totalPedido'])
        },
        methods: {            ordenarPedidos(){
                this.pedidosStados=[];
                console.log("holll");

                for (let i = 0; i < this.pedidos.length; i++) {
                    let articulos=0;
                    for (let e = 0; e < this.pedidos[i].detalles.length; e++) {
                        articulos += Number.parseInt(this.pedidos[i].detalles[e].cantidad);
                    }
                    let data={
                        id:this.pedidos[i].id,
                        detalles:this.pedidos[i].detalles.length,
                        articulos:articulos,
                        total:"BsS."+this.totalPedido[i],
                        estado:"Por Facturar"
                    }
                    this.pedidosStados.push(data);
                }
            },
            verItem(item){
                console.log("hola");
            }
        },
    }
</script>

<style scope>
    .back{
        background: #f5f5f5;
    }
</style>