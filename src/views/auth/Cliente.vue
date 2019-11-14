<template>
    <div>
        <v-layout row wrap justify-center>
            <v-flex md6 xs6 lg6 sm6> 
                <v-card elevation="5" class="pa-5 my-10">
                    <div class="text-center">
                        <v-btn text>
                            <v-img src="@/assets/log.png"></v-img>
                        </v-btn>
                    </div>
                    <FormCliente />
                </v-card>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
import FormCliente from '@/components/vistaAuth/FormCliente';

    export default {
        components:{
            FormCliente,
        }
    }
</script>

<style scope>
    .color{
        color: #005598;
    }
</style>