<template>
    <div>
        <v-row>
            <v-col cols="12" md="6" offset="1">
                <v-select
                    :items="items"
                    small-chips
                    color="#005598"
                    @change="cambioPrecio($event)"
                    dense
                    outlined
                    hide-selected
                    hide-details
                    label="Total"
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
            </v-col>
            <v-col cols="12" md="3" offset="1">
                <p class="font-weight-black">{{total}}</p>
            </v-col>
        </v-row>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                total:'0',
                items:[
                    {icon:'money',text:'Bolivares'},
                    {icon:'money',text:'Petro'},
                    {icon:'attach_money',text:'Dolares'},
                    {icon:'local_atm',text:'Bitcoin'},
                    {icon:'monetization_on',text:'Rublos'},
                    {icon:'euro',text:'Euros'},
                ],
            }
        },
        methods: {
            cambioPrecio(event){
                if(event == 'Bolivares'){
                    this.total='500 Bss.';
                }else if(event=='Dolares'){
                    this.total='300 $';
                }else if(event =='Rublos'){
                    this.total='200 Rb';
                }else if(event == 'Bitcoin'){
                    this.total = '20000 sato';
                }else{
                    this.total='1.60 P'
                }
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>