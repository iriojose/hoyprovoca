<template>
    <v-card elevation="0" height="100%" width="100%" color="#f7f7f7">
        <v-card-text>
            <v-row justify="center" class="mt-12">
                <v-col cols="12" md="6" sm="6">
                    <v-img contain :src="require('@/assets/error403.svg')"></v-img>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script>
    export default {
        head:{
            title(){
                return {
                    inner:'Hoyprovoca',
                    separator:'|',
                    complement: '403'
                }
            }
        },
    };
</script>