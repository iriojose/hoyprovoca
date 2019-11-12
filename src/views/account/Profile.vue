<template>
    <div>
        <div class="subtitle-1 font-weight-medium">
            Información de tu cuenta
        </div>

        <v-form v-model="valid" @submit.prevent="">
            <v-layout class="ma-5">
                <v-row>
                    <v-col cols="12" md="5" offset="1" class="my-2">
                        <v-text-field
                            v-model="user.nombre"
                            label="Nombre(s)"
                            type="text"
                            counter="40"
                            dense
                            color="#005598"
                            append-icon="create"
                            :rules="[
                                required('Nombre(s)'),
                                minLength('Nombre(s)',3),
                                maxLength('Nombre(s)',40)
                            ]"
                        />
                    </v-col>

                    <v-col cols="12" md="5" offset="1" class="my-2">
                        <v-text-field
                            v-model="user.apellido"
                            label="Apellido(s)"
                            type="text"
                            counter="40"
                            dense
                            color="#005598"
                            append-icon="create"
                            :rules="[
                                required('Apellido(s)'),
                                minLength('Apellido(s)',3),
                                maxLength('Apellido(s)',40)
                            ]"
                        />
                    </v-col>

                    <v-col cols="12" md="8" offset="2" class="my-2">
                        <v-text-field
                            v-model="user.email"
                            label="Email"
                            type="email"
                            counter="40"
                            dense
                            color="#005598"
                            append-icon="email"
                            :rules="[
                                required('Email'),
                                emailFormat()
                            ]"
                            disabled
                        />
                    </v-col>

                    <v-col cols="12" md="5" offset="1" class="my-2">
                        <v-text-field
                            v-model="user.telefono"
                            label="Telefono"
                            type="number"
                            counter="12"
                            dense
                            color="#005598"
                            append-icon="create"
                            :rules="[
                                required('Telefono'),
                                minLength('Telefono',3),
                                maxLength('Telefono',12),
                            ]"
                        />
                    </v-col>

                    <v-col cols="12" md="3" offset="3" class="my-2">
                        <v-btn color="green" disabled> 
                            Editar
                        </v-btn>
                    </v-col>
                </v-row>
            </v-layout>
        </v-form>
    </div>
</template>

<script>
import validations from '@/validations/validations';

    export default {
        data(){
            return{
                ...validations,
                valid:false,
                user:{
                    nombre:'',
                    apellido:'',
                    telefono:'',
                    email:'',
                }
            }
        }
    }
</script>