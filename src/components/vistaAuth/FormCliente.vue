<template>
    <v-form v-model="valid" @submit.prevent class="center">
        <v-stepper v-model="e1" class="elevation-0">
            <v-stepper-items>
                <v-stepper-content step="1">
                    <v-form v-model="valid1" @submit.prevent>
                        <v-text-field
                            type="text"
                            v-model="data.nombre"
                            label="Nombre(s)"
                            color="#005598"
                            outlined
                            dense
                            single-line
                            append-icon="person"
                            :rules="[required('Nombre(s)'), minLength('Nombre(s)',3),maxLength('Nombre(s)',40)]"
                        />
                        <v-text-field
                            type="text"
                            append-icon="person"
                            v-model="data.apellido"
                            label="Apellido(s)"
                            single-line
                            color="#005598"
                            outlined
                            dense
                            :rules="[required('Apellido(s)'), minLength('Apellido(s)',3),maxLength('Apellido(s)',40)]"
                        />
                        <v-btn
                            @click="e1=2"
                            block
                            color="#005598"
                            :disabled="!valid1"
                            class="white--text text-capitalize"
                        >Siguiente</v-btn>
                    </v-form>
                </v-stepper-content>

                <v-stepper-content step="2">
                    <v-form v-model="valid2" @submit.prevent>
                        <v-text-field
                            label="Email"
                            v-model="data.email"
                            type="email"
                            prepend-inner-icon="email"
                            outlined
                            color="#005598"
                            dense
                            single-line
                            :rules="[required('Email'), emailFormat(), maxLength('Email',50)]"
                        />
                        <v-text-field
                            label="Usuario"
                            v-model="data.login"
                            type="text"
                            prepend-inner-icon="person"
                            outlined
                            color="#005598"
                            dense
                            single-line
                            :rules="[required('Usuario'),minLength('Usuario',2), maxLength('Usuario',50)]"
                        />
                        <v-text-field
                            v-model="data.password"
                            label="Password"
                            single-line
                            :type="showPassword ? 'text' : 'password' "
                            :rules="[required('password'), minLength('password',8)]"
                            @click:append="showPassword = !showPassword"
                            :append-icon="showPassword ?  'visibility' : 'visibility_off'"
                            :prepend-inner-icon="showPassword ?  'lock_open' : 'lock'"
                            outlined
                            color="#005598"
                            dense
                        />
                        <v-card-actions>
                            <v-btn @click="e1=1" text icon>
                                <v-icon large>arrow_back</v-icon>
                            </v-btn>
                            <v-spacer></v-spacer>
                            <v-btn
                                type="submit"
                                class="text-capitalize"
                                :disabled="!valid2 || loading"
                                color="#005598"
                                :dark="valid2 && !loading"
                                :loading="loading"
                                @click="signUp()"
                            >Registrarse</v-btn>
                        </v-card-actions>
                    </v-form>
                </v-stepper-content>
            </v-stepper-items>
        </v-stepper>

        <v-snackbar v-model="loading" dark right>
            autenticando...
        </v-snackbar>
        <!--snakbar para mensaje de login completado o fallido-->
        <v-snackbar v-model="snackbar" :color="error != null? '#D32F2F':'#2E7D32'" right :timeout="2000">
            <div v-if="error==null">
                <v-icon dark>
                    check_circle
                </v-icon>
                Se ha Registrado exitosamente.
            </div>
                <div v-if="error">
                    <v-icon dark>
                        cancel
                    </v-icon>
                    {{error}}
                </div>
        </v-snackbar>
    </v-form>
</template>

<script>
import validations from "@/validations/validations";
import Auth from "@/services/Auth";
import router from "@/router";
import { mapState, mapActions } from "vuex";

export default {
    data() {
        return {
            valid: false,
            valid1: false,
            valid2: false,
            error:null,
            snackbar:false,
            showPassword: false,
            loading: false,
            e1: 0,
            ...validations,
            data: {
                nombre: "",
                apellido: "",
                email: "",
                password: "",
                login: "",
                fotografia: "perfil.jpg",
                perfil_id: 1
            }
        };
  },
    methods: {
        ...mapActions(["logged"]),
        signUp() {
            this.loading = true;
            Auth().post("/signup", { data: this.data }).then(response => {
                console.log(response);
                this.snackbar = true;
                //this.logged(response.data.token);
                setTimeout(() => {
                    this.loading = false;
                    this.error = null;
                    router.push("/login");
                }, 1000);
            }).catch(e => {
                console.log(e);
                this.loading = false;
                this.snackbar=true;
                this.error="Error al intentar registrar usuario.";
            });
        }
    }
};
</script>
