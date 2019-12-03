<template>
    <v-card class="mt-4" elevation="3">
        <v-sheet
            class="v-sheet--offset mx-auto white--text headline text-center pt-5"
            :color="color"
            elevation="2"
            height="80"
            max-width="calc(100% - 32px)"
        >
            {{title}}
        </v-sheet>
        <v-card-text>
            <v-data-table
                :headers="headers"
                :items="desserts"
                :search="search"
                :page.sync="page"
                :items-per-page="itemsPerPage"
                hide-default-footer
                class="elevation-0"
                @page-count="pageCount = $event"
                no-results-text="No se encontraron resultados..."
            >
                <template v-slot:item.action="{item}">
                    <v-tooltip right>
                        <template v-slot:activator="{ on }">
                            <v-icon class="mr-2" v-on="on" small v-if="ver" v-ripple @click="ver"> 
                                remove_red_eye
                            </v-icon>
                        </template>
                        <span>Ver</span>
                    </v-tooltip>

                    <v-tooltip right>
                        <template v-slot:activator="{ on }">
                            <v-icon v-if="borrar" v-on="on" small class="mr-2" v-ripple @click="ver">
                                delete
                            </v-icon>
                        </template>
                        <span>Borrar</span>
                    </v-tooltip>
                    
                    <v-tooltip right>
                        <template v-slot:activator="{ on }">
                            <v-icon v-if="ventas" v-on="on" small class="mr-2" v-ripple @click="ver">
                            monetization_on
                        </v-icon>
                        </template>
                        <span>Compras</span>
                    </v-tooltip>
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
</template>

<script>
    export default {
        props:{
            title:{
                type:String,
                default:'Title'
            },
            color:{
                type:String,
                default:'blue'
            },
            headers:{
                type:Object,
                default:() => ({})
            },
            desserts:{
                type:Object,
                default:() => ({})
            },
            ventas:{
                type:Boolean,
                default:false
            },
            ver:{
                type:Boolean,
                default:false
            },
            borrar:{
                type:Boolean,
                default:false
            }
        },
        data () {
            return {
                search: '',
                page: 1,
                pageCount: 0,
                itemsPerPage: 7,
            }
        },
        methods: {
            ver(){
                console.log('vista');
            }
        },
    }
</script>

<style>
    .v-sheet--offset {
        top: -24px;
        position: relative;
    }
</style>