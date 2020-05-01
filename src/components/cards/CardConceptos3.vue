<template>
    <v-card width="350" height="300" elevation="2" class="mb-4">
        <v-card-text>
            <v-row justify="center">
                <v-col cols="12" sm="6"> 
                    <v-img 
                        :src="image+concepto.imagen"
                        contain
                        width="100%"
                        height="150"
                    ></v-img>
                </v-col>
                <v-col cols="12" sm="6">
                    <div class="text-truncate caption font-weight-black text-capitalize">{{precioDolar}}</div>
                    <div class="text-truncate caption font-weight-black text-capitalize">{{precio}}</div>
                    <div class="text-truncate font-weight-medium text-capitalize">{{concepto.nombre}}</div>
                    <div class="text-truncate body-2 grey--text text-capitalize">{{concepto.descripcion}}</div>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script>
import variables from '@/services/variables_globales';
import accounting from 'accounting';

    export default {
        props:{
            concepto:{
                type:Object,
                default:() => ({})
            }
        },
        data(){
            return {
                ...variables,
                precio:'',
                precioDolar:'',
            }
        },
        mounted(){
            this.precioDolar = accounting.formatMoney(+this.concepto.precio_dolar,{symbol:"$ ",thousand:',',decimal:'.'});
            this.precio = accounting.formatMoney(+this.concepto.precio_a,{symbol:"Bs ",thousand:'.',decimal:','});
        }      
    }
</script>
