<template>
    <div>
        <div class="subtitle-1 font-weight-medium">
            Historial
        </div>
        <v-container fluid>
            <v-data-iterator
                :items="items"
                :items-per-page.sync="itemsPerPage"
            >
                <template v-slot:header>
                    <v-toolbar class="mb-2" color="#005598" dark flat>
                        <v-toolbaar-title>
                            Pedidos
                        </v-toolbaar-title>
                    </v-toolbar>
                </template>

                <template v-slot:default="props">
                    <v-row>
                        <v-col v-for="item in props.items" :key="item.name" cols="12" sm="6" md="6" lg="6">
                            <v-card elevation="3">
                                <v-card-title class="subheading font-weight-bold">
                                    {{item.fecha}}
                                </v-card-title>
                                <v-divider/>

                                <v-list dense>
                                    <v-list-item>
                                        <v-list-item-content>
                                            item
                                        </v-list-item-content>

                                        <v-list-item-content>
                                            cantidad
                                        </v-list-item-content>

                                        <v-list-item-content>
                                            precio
                                        </v-list-item-content>
                                    </v-list-item> 

                                    <v-list-item v-for="producto in item.productos" :key="producto.name">
                                        <v-list-item-content class="align-end">
                                            {{producto.name}}
                                        </v-list-item-content>
                                        <v-list-item-content class="align-end">
                                           {{producto.cantidad}}
                                        </v-list-item-content>
                                        <v-list-item-content class="align-end">
                                           {{producto.precio}}
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-list>
                                <v-divider/>
                                <v-card-content class="pa-5">
                                    <span class="headline font-weight-bold ">Total:{{item.total}}</span>
                                </v-card-content>
                            </v-card>
                        </v-col>
                    </v-row>
                </template>
            </v-data-iterator>
        </v-container>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                itemsPerPage:3,
                items:[
                    {
                        fecha:'18/09/2019',
                        productos:[
                            {name:'agua',cantidad:2,precio:'5$'},
                            {name:'agua',cantidad:2,precio:'5$'},
                            {name:'agua',cantidad:2,precio:'5$'},
                            {name:'agua',cantidad:2,precio:'5$'},
                        ],
                        total:'330$'
                    },
                    {
                        fecha:'18/09/2019',
                        productos:[
                            {name:'agua',cantidad:2,precio:'5$'},
                            {name:'agua',cantidad:2,precio:'5$'},
                            {name:'agua',cantidad:2,precio:'5$'},
                        ],
                        total:'230$'
                    },
                    {
                        fecha:'18/09/2019',
                        productos:[
                            {name:'agua',cantidad:2,precio:'5$'},
                            {name:'agua',cantidad:2,precio:'5$'},
                            {name:'agua',cantidad:2,precio:'5$'},
                        ],
                        total:'130$'
                    },
                    {
                        fecha:'18/09/2019',
                        productos:[
                            {name:'agua',cantidad:2,precio:'5$'},
                            {name:'agua',cantidad:2,precio:'5$'},
                        ],
                        total:'130$'
                    },
                    {
                        fecha:'18/09/2019',
                        productos:[
                            {name:'agua',cantidad:2,precio:'5$'}
                        ],
                        total:'130$'
                    },
                ]
            }
        }
    }
</script>