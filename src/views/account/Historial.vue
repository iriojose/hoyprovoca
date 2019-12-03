<template>
    <div>
        <v-card width="100%" height="510" elevation="2">
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
                    :items="desserts"
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
                    <v-pagination v-model="page" :length="pageCount" color="teal"></v-pagination>
                </div>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
    export default {
        methods: {
            verItem(item){

            }
        },

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
                    {text: 'Fecha',sortable: false,value: 'fecha'},
                    { text: 'Articulos', value: 'articulos',sortable: false},
                    { text: 'Total', value: 'total',sortable: false},
                    { text: 'Factura', value: 'factura',sortable: false},
                    { text: 'Acciones', value: 'action', sortable: false },
                ],

                desserts: [
                    {
                        id: 1,
                        fecha:'10/11/2019',
                        articulos:12,
                        total:'200$',
                        factura:'AS12J43M34'
                    },
                    {
                        id: 2,
                        fecha:'10/11/2019',
                        articulos:1,
                        total:'10$',
                        factura:'AS12J43M34'
                    },
                    {
                        id: 3,
                        fecha:'10/11/2019',
                        articulos:2,
                        total:'20$',
                        factura:'AS12J43M34'
                    },
                    {
                        id: 4,
                        fecha:'10/11/2019',
                        articulos:1,
                        total:'10$',
                        factura:'AS12J43M34'
                    },
                    {
                        id: 5,
                        fecha:'10/11/2019',
                        articulos:2,
                        total:'50$',
                        factura:'AS12J43M34'
                    },
                    {
                        id: 6,
                        fecha:'10/11/2019',
                        articulos:3,
                        total:'100$',
                        factura:'AS12J43M34'
                    },
                     {
                        id: 7,
                        fecha:'10/11/2019',
                        articulos:2,
                        total:'50$',
                        factura:'AS12J43M34'
                    },
                    {
                        id: 8,
                        fecha:'10/11/2019',
                        articulos:3,
                        total:'100$',
                        factura:'AS12J43M34'
                    },
                     {
                        id: 9,
                        fecha:'10/11/2019',
                        articulos:2,
                        total:'50$',
                        factura:'AS12J43M34'
                    },
                    {
                        id: 10,
                        fecha:'10/11/2019',
                        articulos:3,
                        total:'100$',
                        factura:'AS12J43M34'
                    },
                     {
                        id: 11,
                        fecha:'10/11/2019',
                        articulos:2,
                        total:'50$',
                        factura:'AS12J43M34'
                    },
                    {
                        id: 12,
                        fecha:'10/11/2019',
                        articulos:3,
                        total:'100$',
                        factura:'AS12J43M34'
                    },
                    
                ]
            }
        }
    }
</script>

<style scope>
    .back{
        background: #eee;
    }
</style>