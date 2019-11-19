<template>
    <div>
        <v-layout row wrap justify-center>
            <v-flex md8 lg8 sm10 xs10>
                <v-card elevation="5" class="pa-5 my-10">
                    <div class="text-center">
                        <v-btn text>
                            <v-img src="@/assets/log.png"></v-img>
                        </v-btn>
                    </div>
                    <FormEmpresa />
                </v-card>
            </v-flex>
        </v-layout>
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