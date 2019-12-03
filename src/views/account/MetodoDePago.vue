<template>
    <div>
        <v-card width="100%" height="510" elevation="2">
            <v-card-title class="title font-weight-bold back">
                Metodos de pago
            </v-card-title>

            <v-card-actions class="py-4">
                <v-btn rounded color="#005598" dark @click="dialog =!dialog"> 
                    Agregar metodo de pago
                </v-btn>
            </v-card-actions>
            <v-divider></v-divider>

            <v-card-text>

            </v-card-text>
        </v-card>
       
        <v-dialog v-model="dialog" close-delay width="500">
            <v-card color="trasnparent">
                <v-card-title class="back">

                    Elegir metodo de pago
                    <v-spacer></v-spacer>

                    <v-btn icon fab @click="dialog= !dialog">
                        <v-icon small>
                            close
                        </v-icon>
                    </v-btn>
                </v-card-title>
                <v-divider></v-divider>

                <v-card-actions>
                    <v-col cols="12" md="8" sm="8" lg="8" offset="2">
                        <v-select
                            label="Elegir"
                            :items="selects"
                            prepend-inner-icon="payment"
                            color="#005598"
                            hide-selected
                            outlined
                            chips
                            dense
                            @change="change($event)"
                        />
                    </v-col>
                </v-card-actions>
                <v-divider></v-divider>

                <v-card-text>
                    <v-row v-if="credito">
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
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                dialog:false,
                movil:true,
                debito:false,
                credito:false,
                selects:[
                    { text: 'Pago Movil' },
                    { text: 'Tarjeta de credito'},
                    { text: 'Tarjeta de debito' },
                ],
            }
        },

        methods: {
            change(evt){
                if(evt == 'Pago Movil'){
                    this.movil=true;
                    this.debito=false;
                    this.credito=false;
                }else if(evt == 'Tarjeta de credito'){
                    this.movil=false;
                    this.debito=false;
                    this.credito=true;
                }else{
                    this.movil=false;
                    this.debito=true;
                    this.credito=false;
                }
            }
        },
    }
</script>

<style scope>
  .back{
    background: #eee;
  }
</style>