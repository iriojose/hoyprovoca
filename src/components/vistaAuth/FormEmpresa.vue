<template>
    <v-form v-model="valid" @submit.prevent="">
        <v-stepper v-model="e1">
            <v-stepper-header>
                <v-stepper-step 
                    :complete="valid1" 
                    :color="valid1 ? 'green':'#005598'" 
                    step="1"
                >

                </v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step  
                    :complete="valid2" 
                    :color="valid2 ? 'green':'#005598'" 
                    step="2"
                >

                </v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step 
                    :complete="valid3" 
                    :color="valid3 ? 'green':'#005598'" 
                    step="3"
                >

                </v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step  
                    :complete="valid4" 
                    :color="valid4 ? 'green':'#005598'" 
                    step="4"
                >

                </v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step 
                    :complete="valid5" 
                    :color="valid5 ? 'green':'#005598'"
                    step="5"
                >

                </v-stepper-step>
            </v-stepper-header>

            <v-stepper-items>
                <v-stepper-content step="1">
                    <v-form v-model="valid1" @submit.prevent="">

                    </v-form>
                    <div class="text-end">
                        <v-btn @click="e1=2" color="info" :disabled="!valid1">
                            Siguiente
                        </v-btn>
                    </div>
                </v-stepper-content>

                <v-stepper-content step="2">
                    <v-form v-model="valid2" @submit.prevent="">

                    </v-form>
                    <v-row>
                        <v-col cols="12" md="3" lg="3" sm="3">
                            <v-btn @click="e1=1" text icon>
                                <v-icon large>
                                    arrow_back
                                </v-icon>
                            </v-btn>
                        </v-col>
                        <v-col cols="12" md="3" lg="3" sm="3" offset="6">
                            <v-btn @click="e1=3" color="info" :disabled="!valid2">
                                Siguiente
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-stepper-content>

                <v-stepper-content step="3">
                    <v-form v-model="valid3" @submit.prevent="">

                    </v-form>
                    <v-row>
                        <v-col cols="12" md="3" lg="3" sm="3">
                            <v-btn @click="e1=2" text icon>
                                <v-icon large>
                                    arrow_back
                                </v-icon>
                            </v-btn>
                        </v-col>
                        <v-col cols="12" md="3" lg="3" sm="3" offset="6">
                            <v-btn @click="e1=4" color="info" :disabled="!valid3">
                                Siguiente
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-stepper-content>

                <v-stepper-content step="4">
                    <v-form v-model="valid4" @submit.prevent="">

                    </v-form>
                    <v-row>
                        <v-col cols="12" md="3" lg="3" sm="3">
                            <v-btn @click="e1=3" text icon>
                                <v-icon large>
                                    arrow_back
                                </v-icon>
                            </v-btn>
                        </v-col>
                        <v-col cols="12" md="3" lg="3" sm="3" offset="6">
                            <v-btn @click="e1=5" color="info" :disabled="!valid4">
                                Siguiente
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-stepper-content>

                <v-stepper-content step="5">
                    <v-form v-model="valid5" @submit.prevent="">

                    </v-form>
                    <v-row>
                        <v-col cols="12" md="3" lg="3" sm="3">
                            <v-btn @click="e1=4" text icon>
                                <v-icon large>
                                    arrow_back
                                </v-icon>
                            </v-btn>
                        </v-col>
                        <v-col cols="12" md="3" lg="3" sm="3" offset="6">
                            <v-btn @click="enviar" color="info" :disabled="!valid5">
                                Enviar
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-stepper-content>
            </v-stepper-items>
        </v-stepper>
    </v-form>
</template>

<script>
import validations from '@/validations/validations';

    export default {
        data(){
            return{
                valid:false,
                valid1:false,
                valid2:false,
                valid3:false,
                valid4:false,
                valid5:false,
                e1:0,
                ...validations
            }
        },

        methods: {
            enviar(){
                console.log('enviado');
            }
        },
    }
</script>