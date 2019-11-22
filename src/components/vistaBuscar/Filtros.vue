<template>
    <div>
        <v-row class="mx-3">
            <v-col cols="12" md="6" lg="12" sm="6">
                <v-card class="pa-4" elevation="3">
                    <h3 class="my-4">Buscar por:</h3>
                    <v-select 
                        :items="items"
                        label="Categorias"
                        chips 
                        v-model="items[0].text"
                        color="#005598"
                        hide-details
                        small-chips
                        dense
                        outlined
                        hide-selected
                    >
                        <template v-slot:item="{item,attrs,on}">
                            <v-list-item v-bind="attrs" v-on="on" dense>
                                <v-list-icon>
                                    <v-icon>{{item.icon}}</v-icon>
                                </v-list-icon>
                                <v-list-item-title :id="attrs['aria-labelledby']">
                                    {{item.text}}
                                </v-list-item-title>
                            </v-list-item>
                        </template>
                    </v-select>
                </v-card>
            </v-col>

            <v-col cols="12" md="6" lg="12" sm="6">
                <v-card class="pa-4" elevation="3">
                    <h3 class="my-4">Ordenar por:</h3>
                    <v-select 
                        :items="items2"
                        label="Categorias"
                        chips 
                        v-model="items2[0].text"
                        color="#005598"
                        hide-details
                        small-chips
                        dense
                        outlined
                        hide-selected
                    >
                        <template v-slot:item="{item,attrs,on}">
                            <v-list-item v-bind="attrs" v-on="on" dense>
                                <v-list-icon>
                                    <v-icon>{{item.icon}}</v-icon>
                                </v-list-icon>
                                <v-list-item-title :id="attrs['aria-labelledby']">
                                    {{item.text}}
                                </v-list-item-title>
                            </v-list-item>
                        </template>
                    </v-select>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                i:0,
                def:'Restaurantes',
                def2:'Mayor precio',
                items:[
                    {icon:'restaurant',text:'Restaurantes'},
                    {icon:'store_mall_directory',text:'Tiendas'},
                    {icon:'headset',text:'Tecnologia'},
                    {icon:'store',text:'Supermercados'},
                ],
                items2:[
                    {icon:'arrow_right',text:'Mayor precio'},
                    {icon:'arrow_left',text:'Menor precio'},
                    {icon:'text_format',text:'Alfabeto'},
                    {icon:'local_atm',text:'Promociones'},
                ]
            }
        },
    }
</script>