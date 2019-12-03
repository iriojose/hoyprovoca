
<template>
    <div>
        <v-row class="mx-2 mt-5">
            <v-col cols="12" md="4" lg="4" sm="4">
                <CardGraphic 
                    :labels="labels"
                    title="Ventas de la semana"
                    :value="value"
                    last="Ultima venta realizada hace 15 minutos"
                    performance="texto predictivo"
                    color="blue darken-2"
                    tipo="bar"
                />
            </v-col>

            <v-col cols="12" md="4" lg="4" sm="4">
                <CardGraphic 
                    :labels="labels"
                    title="Ventas de la semana"
                    :value="value"
                    last="Ultima venta realizada hace 20 minutos"
                    performance="texto predictivo"
                    color="green"
                />
            </v-col>

             <v-col cols="12" md="4" lg="4" sm="4">
                <CardGraphic 
                    tipo="bar"
                    :labels="labels1"
                    title="Ventas de la semana"
                    :value="value1"
                    last="Ultimo usuario registrado hace 10 minutos"
                    performance="texte predictivo"
                />
            </v-col>

            <v-col cols="12" md="8" offset="2">
                <v-card
                    dark
                >
                    <v-card-text>
                        <v-sheet color="rgba(0, 0, 0, .12)">
                            <v-sparkline
                                :value="value2"
                                color="rgba(255, 255, 255, .7)"
                                height="100"
                                padding="24"
                                stroke-linecap="round"
                                smooth
                            >
                            <template v-slot:label="item">
                                ${{ item.value }}
                            </template>
                            </v-sparkline>
                        </v-sheet>
                    </v-card-text>

                    <v-card-text>
                        <div class="display-1 font-weight-thin">Ventas mensuales</div>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import CardGraphic from '@/components/vistaAdmin/CardGraphic'

    export default {
        components:{
            CardGraphic,
        },
        data(){
            return{
                labels: ['L','M','M','J','V','S','D',],
                value:[100,300,600,310,460,0,400],
                labels1: ['12am','3am','6am','9am','12pm','3pm','6pm','9pm',],
                value1: [200,675,410,390,310,460,250,240,],
                value2: [423,446,675,510,590,610,7,500,1100,2000]
            }
        },
    }
</script>
