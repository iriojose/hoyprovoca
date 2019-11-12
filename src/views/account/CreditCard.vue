<template>
    <div>
        <div class="subtitle-1 font-weight-medium">
            Tarjetas de credito
        </div>

        <v-layout row wrap>
            <v-flex md12 class="mx-5 mt-5">
                <v-subheader>
                    aun no posees ninguna tarjeta de credito asociada
                </v-subheader>

                <v-row justify="start">
                    <v-dialog v-model="dialog" max-width="420">
                        <template v-slot:activator="{on}">
                            <v-btn rounded color="#005598" dark @click="dialog =!dialog"> 
                                Agregar tarjeta de credito
                            </v-btn>
                        </template>

                        <v-card elevation="0" width="420" height="600" scrollable>
                            <div class="text-right">
                                <v-avatar @click="dialog =!dialog">
                                    <v-icon small>
                                        close
                                    </v-icon>
                                </v-avatar>
                            </div>   
                               
                            <v-card-title>
                                <div class="text-center">
                                    <span class="headline font-weight-medium">Tarjeta de credito</span>
                                </div>
                            </v-card-title>
                            <v-card-content>
                                <v-row>
                                    <v-col cols="12" md="10" xs="6" offset="1">
                                        <v-text-field
                                            type="text"
                                            label="Nombre como aparece en la tarjeta"
                                            color="#005598"
                                            dense
                                            hide-details
                                        />
                                    </v-col>

                                    <v-col cols="12" md="10" xs="6" offset="1">
                                        <v-text-field
                                            type="text"
                                            label="Apellido como aparece en la tarjeta"
                                            color="#005598"
                                            dense
                                            hide-details
                                        />
                                    </v-col>

                                    <v-col cols="12" md="10" xs="6" offset="1">
                                        <v-text-field
                                            type="number"
                                            label="numero de la tarjeta"
                                            color="#005598"
                                            dense
                                            hide-details
                                            prepend-icon="credit_card"
                                        />
                                    </v-col>

                                    <v-col cols="12" md="3" offset="1">
                                        <span class="subtitle-2 font-weight-medium">Año de vencimiento</span>
                                        <v-text-field
                                            type="number"
                                            dense
                                            color="#005598"
                                            label="AAAA"
                                        />
                                    </v-col>

                                    <v-col cols="12" md="3" >
                                        <span class="subtitle-2 font-weight-medium">Mes de vencimiento</span>
                                        <v-text-field
                                            type="number"
                                            dense
                                            color="#005598"
                                            label="MM"
                                        />
                                    </v-col>

                                    <v-col cols="12" md="3" >
                                        <span class="subtitle-2 font-weight-medium">CVC</span>
                                        <v-text-field
                                            type="number"
                                            dense
                                            color="#005598"
                                        />
                                    </v-col>

                                    <v-col cols="12" md="8" offset="2">
                                        <v-btn block rounded color="grey ligthen-1" dark>
                                            verificar
                                        </v-btn>
                                    </v-col>
                                    <v-col cols="12" md="8" offset="2">
                                        <v-btn block rounded text depressed @click="dialog= !dialog">
                                            cancelar
                                        </v-btn>
                                    </v-col>
                                </v-row>
                            </v-card-content>
                        </v-card>
                    </v-dialog>
                </v-row>
                
            </v-flex>
        </v-layout>  
    </div>
</template>

<script>
    export default {
        data(){
            return {
                dialog:false,
            }
        }
    }
</script>