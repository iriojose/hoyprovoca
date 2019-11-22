<template>
    <div>
        <div class="subtitle-1 font-weight-medium mb-3">
            Historial
        </div>
        
        <v-alert
            border="left"
            colored-border
            color="grey accent-4"
            elevation="2"
        >
            <v-card-title>
                Pedidos
            </v-card-title>

            <v-data-table
                :headers="headers"
                :items="desserts"
            >
                <template v-slot:item.action="{ item }">
                    <v-icon class="mr-2" @click="verItem(item)"> 
                        remove_red_eye
                    </v-icon>
                </template>
            </v-data-table>
        </v-alert>
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
                ]
            }
        }
    }
</script>