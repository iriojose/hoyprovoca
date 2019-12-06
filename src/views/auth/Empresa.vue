<template>
    <div>
        <v-row>
            <v-col cols="12" md="5" lg="5" sm="5">
                <v-img :src="require('@/assets/undrawformempresa.svg')" contain></v-img>
            </v-col>
            <v-col cols="12" md="6" lg="6">
                <v-card elevation="15" class="pa-5 my-10">
                    <div class="text-center">
                        <v-btn text>
                            <v-img src="@/assets/log.png"></v-img>
                        </v-btn>
                    </div>
                    <v-card-text>
                        <FormEmpresa />
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>


<script>
import FormEmpresa from '@/components/vistaAuth/FormEmpresa';

    export default {
        components:{
            FormEmpresa
        }
        
    }
</script>