<template>
    <div>
        <v-row :class="$vuetify.breakpoint.smAndDown ? 'mx-4':null">
            <v-col cols="12" md="6" lg="6" sm="12" :offset="$vuetify.breakpoint.smAndDown ? null:1">
                <v-card elevation="15" class="pa-5 my-5">
                    <div class="text-center">
                        <v-btn text>
                            <v-img src="@/assets/log.png"></v-img>
                        </v-btn>
                    </div>
                    <v-card-text>
                        <FormCliente/>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" md="5" lg="5" class="margen hidden-sm-and-down">
                <v-img :src="require('@/assets/undrawregistro2.svg')" contain></v-img>
            </v-col>
        </v-row>
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
    .margen{
        margin-top:225px;
    }
</style>