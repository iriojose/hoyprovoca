<template>
    <v-dialog v-model="sesion" close-delay width="600">
        <v-card width="600" class="px-5 py-2">
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn elevation="2" icon @click="close">
                    <v-icon small color="#005598">close</v-icon>
                </v-btn>
            </v-card-actions>
            <v-row justify="center" align="center" class="pa-2">
                <v-col cols="12" sm="4" md="4" class="hidden-sm-and-down">
                    <v-card width="100%" height="300" elevation="3">
                        <v-img width="100%" height="300" contain src="@/assets/addcart.svg"></v-img>
                    </v-card>
                </v-col>
                <v-col cols="12" sm="9" md="8">
                    <div class="text-center my-5 font-weight-black subtitle-1">Iniciar sesión en Aftim</div>
                    <FormLogin />
                </v-col>
            </v-row>
        </v-card>
    </v-dialog> 
</template>

<script>
import {mapState,mapActions} from 'vuex';
import FormLogin from '@/components/auths/FormLogin';

    export default {
        components:{
            FormLogin
        },
        computed: {
            ...mapState(['modalsesion']),

            sesion:{
                get(){ return this.modalsesion },
                set(val){ this.setModalSesion(val) }
            }
        },
        methods: {
            ...mapActions(['setModalSesion']),

            close(){
                this.setModalSesion(false);
            }
        },
    }
</script>