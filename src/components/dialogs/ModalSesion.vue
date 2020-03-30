<template>
    <v-dialog v-model="sesion" close-delay width="500">
        <v-card width="700" class="pa-5">
            <div class="text-center my-5 font-weight-black subtitle-1">Iniciar sesión en Aftim</div>
            <FormLogin />
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
            ...mapActions(['setModalSesion'])
        },
    }
</script>