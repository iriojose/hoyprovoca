<template>
    <v-card width="100%" elevation="0" color="#1f3b63" height="100%">
        <v-card-actions>
            <v-btn fab small color="#2950c3" @click="home">
                <v-icon color="#fff">mdi-home</v-icon>
            </v-btn>
            <v-spacer class="hidden-sm-and-down"></v-spacer>
            <v-img transition="scale-transition" class="hidden-sm-and-down" contain width="100" height="50" :src="require('@/assets/logo 6.png')"></v-img>
            <v-spacer></v-spacer>
            <v-btn rounded color="#2950c3" class="text-capitalize white--text caption" @click="forgot">
                ¿Olvido su contraseña?
            </v-btn>
        </v-card-actions>
        <v-card-text>
            <v-row justify="center"> 
                <v-col cols="12" md="9" sm="12">
                    <v-row justify="center" class="pb-4 hidden-sm-and-up">
                        <v-img transition="scale-transition" contain width="100" height="50" :src="require('@/assets/logo 6.png')"></v-img>
                    </v-row>

                    <v-card width="100%" elevation="0">
                        <v-row justify="center">
                            <v-col cols="12" md="6" class="hidden-sm-and-down">
                                <v-img width="100%" height="500" contain :src="require('@/assets/undrawregistro2.svg')"></v-img>
                            </v-col>

                            <v-col cols="12" md="6" sm="12" class="pa-8">
                                <div class="headline text-center mb-5">Registrate ahora!</div>

                                <v-card elevation="0" height="50" v-if="showMessage">
                                    <v-fade-transition>
                                        <v-alert 
                                            border="left" colored-border
                                            elevation="2" dense :type="type"
                                            v-show="showMessage"
                                        >{{mensaje}}
                                        </v-alert>
                                    </v-fade-transition>
                                </v-card>

                                <v-form v-model="valid" @submit.prevent class="my-5">
                                    <v-stepper v-model="e1" class="elevation-0" non-linear>
                                        <v-stepper-items>
                                            <v-stepper-content step="1">
                                                <v-text-field
                                                    filled single-line label="Nombre"
                                                    dense rounded hint="Ejemplo: Manuel"
                                                    :rules="[required('Nombre')]" v-model="data.nombre"
                                                    persistent-hint color="#2950c3" :disabled="loading"
                                                    append-icon="mdi-account"
                                                ></v-text-field>

                                                <v-text-field
                                                    filled single-line label="Apellido" dense
                                                    rounded hint="Ejemplo: Gómez" :rules="[required('Apellido')]"
                                                    v-model="data.apellido" persistent-hint color="#2950c3"
                                                    :disabled="loading" append-icon="mdi-account"
                                                ></v-text-field>

                                                <v-text-field
                                                    filled single-line label="Telefono"
                                                    dense rounded hint="format: +58-000-000-0000" prefix="+58"
                                                    @input="changeNumber()" :rules="[required('Telefono'),telefonoFormat()]"
                                                    v-model="data.telefono" persistent-hint
                                                    color="#2950c3" :disabled="loading" append-icon="mdi-cellphone"
                                                ></v-text-field>

                                                <v-menu
                                                    :close-on-content-click="false"
                                                    transition="scale-transition"
                                                    max-width="100%"
                                                    offset-overflow
                                                >
                                                    <template v-slot:activator="{ on }">
                                                        <v-text-field
                                                            dense v-model="data.fecha_nac" label="Cumpleaños"
                                                            color="#2950c3" append-icon="mdi-calendar" filled
                                                            v-on="on" rounded hint="Formato YYYY/MM/DD"
                                                            persistent-hint single-line 
                                                        ></v-text-field>
                                                    </template>
                                                    <v-date-picker
                                                        v-model="data.fecha_nac" :landscape="!$vuetify.breakpoint.smAndDown" show-current
                                                        header-color="#2950c3" color="#2950c3" locale="es"
                                                    />
                                                </v-menu>
                                            </v-stepper-content>

                                            <v-stepper-content step="2">
                                                <v-text-field filled rounded persistent-hint
                                                    dense :disabled="loading" v-model="data.login"
                                                    single-line type="text" color="#0f2441"
                                                    :rules="[required('Nombre de usuario'),minLength('Nombre de usuario',6)]"
                                                    label="Nombre de usuario" hint="Ejemplo: prueba2121"
                                                    append-icon="mdi-account"
                                                ></v-text-field>

                                                <v-text-field
                                                    filled rounded :disabled="loading"
                                                    v-model="data.email" single-line dense
                                                    color="#2950c3" :success-messages="success"
                                                    :error-messages="errors" @input="getUser(data.email)"
                                                    label="Ingrese correo electrónico" hint="Ejemplo: ejemplo@gmail.com"
                                                    persistent-hint
                                                >
                                                    <template v-slot:append>
                                                        <v-fade-transition leave-absolute>
                                                            <v-progress-circular
                                                                v-if="loading2"
                                                                size="24"
                                                                color="#0f2441"
                                                                indeterminate
                                                            ></v-progress-circular>
                                                            <img
                                                                v-else
                                                                width="24"
                                                                height="24"
                                                                :src="require('@/assets/logo 3.png')"
                                                            />
                                                        </v-fade-transition>
                                                    </template>
                                                </v-text-field>

                                                <v-text-field
                                                    filled rounded hint="Contraseña" persistent-hint
                                                    dense :disabled="loading" v-model="data.password"
                                                    single-line type="password" color="#0f2441"
                                                    :rules="[required('Contraseña'),minLength('Contraseña',8)]"
                                                    label="Nueva contraseña" append-icon="mdi-lock"
                                                ></v-text-field>

                                                <v-text-field
                                                    filled rounded dense hint="Confirmar contraseña"
                                                    persistent-hint :disabled="loading" v-model="password2"
                                                    single-line type="password" color="#0f2441"
                                                    :rules="[required('Confirmar contraseña'),passwordConfirmationRule()]"
                                                    label="Confirmar contraseña" append-icon="mdi-lock"
                                                ></v-text-field>

                                                <v-checkbox
                                                    v-model="terminos"
                                                    color="green"
                                                    label="Aceptar términos y condiciones"
                                                    :rules="[requiredBoolean('Términos y condiciones')]"
                                                ></v-checkbox>
                                            </v-stepper-content>
                                        </v-stepper-items>
                                    </v-stepper>
                                    
                                    <v-card-actions>
                                        <v-btn fab small color="#2950c3" @click="e1=1" v-if="e1==2" :disabled="loading">
                                            <v-icon color="#fff">mdi-chevron-left</v-icon>
                                        </v-btn>
                                        <v-spacer></v-spacer>
                                        <v-btn v-if="e1==2" rounded color="#2950c3" :loading="loading" 
                                            height="40" :disabled="valid && success !== '' ? false:true"
                                            @click="postUsuario()" class="text-capitalize caption white--text"
                                        >Registrarse</v-btn>
                                    </v-card-actions>
                                    
                                    <v-btn v-if="e1==1" rounded color="#2950c3" block 
                                        height="40" @click="e1=2" class="text-capitalize caption white--text"
                                    >Siguiente</v-btn>
                                </v-form>

                                <v-divider class="my-10"></v-divider>
                                <div class="subtitle-2 text-center color" @click="login"
                                >¿Ya tienes una cuenta? ¡Iniciar sesión!</div>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
            </v-row>

            <v-footer fixed class="font-weight-medium" elevation="0" color="#1f3b63">
                <v-col class="text-center white--text" cols="12">
                    {{ new Date().getFullYear() }} — <strong>Hoyprovoca</strong> 
                </v-col>
            </v-footer>
        </v-card-text>
    </v-card>
</template>

<script>
import router from "@/router";
import validations from "@/validations/validations";
import Auth from "@/services/Auth";
import Usuario from "@/services/Usuario";
import Clientes from "@/services/Clientes";
import { mapActions } from "vuex";
import variables from "@/services/variables_globales";

	export default {
	data() {
		return {
		e1: 1,
		...variables,
		...validations,
		mensaje: "",
		type: "error",
		nots: false,
		terminos: false,
		showMessage: false,
		loading: false,
		loading2: false,
		valid: false,
		valid2: false,
		change: false,
		success: "",
		errors: [],
		data: {
			nombre: "",
			apellido: "",
			telefono: "",
			fecha_nac: new Date().toISOString().substr(0, 10),
			usuario_in: new Date().toISOString().substr(0, 10),
			login: "",
			email: "",
			password: "",
			adm_empresa_id: null,
			perfil_id: 3,
			imagen: "default.png"
		},
		password2: ""
		};
	},
	head: {
		title() {
			return {
				inner: "Registrate",
				separator: " ",
				complement: " "
			};
		}
	},
	computed: {
		passwordConfirmationRule() {
			return () => this.data.password === this.password2 || "Las contraseñas no coinciden.";
		}
	},
	methods: {
		...mapActions(["logged"]),

		login() {
			router.push("/login");
        },
        home(){
            router.push('/');
        },
        forgot(){
            router.push('/forgot');
        },
		respuesta(mensaje, type) {
			this.mensaje = mensaje;
			this.type = type;
			this.loading = false;
			this.showMessage = true;
			setTimeout(() => {
				this.showMessage = false;
			}, 2000);
		},
		changeNumber() {
			if (this.data.telefono.length == 3) {
				this.data.telefono += "-";
			} else if (this.data.telefono.length == 7) {
				this.data.telefono += "-";
			}
		},
		async getUser(email) {
			this.errors = [];
			this.success = "";
			if (email.length <= 0) return this.errors.push("Debe ingresar un email");
			// eslint-disable-next-line
			let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/;
			if (!regex.test(email))
				return this.errors.push(`Debe ingresar un email válido`);
			this.loading2 = true;
			await Usuario().get(`/?email=${email}`).then(response => {
				this.loading2 = false;
				if (response.data.data) {
					return this.errors.push("Este email ya fue registrado");
				} else {
                    if(response.data.data.bloqueado == 1){
                        return this.errors.push("Esta cuenta se encuentra bloqueada.");
                    }else{
                        return this.success='Email verificado';
                    }
				}
			}).catch(e => {
                console.log(e);
                this.loading2 = false;
                return this.errors.push('Error de conexión');
			});
			},
		postUsuario() {
            this.loading = true;
            this.data.telefono1 = this.data.telefono1;
			Auth().post("/signup", { data: this.data }).then(async response => {
				this.postCliente(response.data);
				this.sendmail(response.data);
				this.respuesta("Usuario registrado exitosamente.", "success");
			}).catch(e => {
				console.log(e);
				this.respuesta("Error al registrar, intente mas tarde.", "error");
			});
		},
		postCliente(usuario) {
			let cliente = {
				nombre: usuario.data.nombre + " " + usuario.data.apellido,
				fecha_nac: new Date().toISOString().substr(0, 10),
				usuario_id: usuario.data.id,
				imagen: "default.png",
				telefono1:usuario.data.telefono,
				correo_electronico: usuario.data.email
			};
			Clientes().post("/", { data: cliente }).then(response => {
				cliente.id = response.data.insertId;
				usuario.cliente = cliente;
			}).catch(e => {
				console.log(e);
				this.respuesta("Error al registrar, intente mas tarde.", "error");
			});
		},
		sendmail(usuario) {
			Auth().post("/verify", { data: { user: usuario.data.email }}).then(response => {
				this.logged(usuario);
				this.respuesta("Correo de verificación enviado.", "success");
				setTimeout(() => router.push("/"), 1000);
			}).catch(e => {
				console.log(e);
				this.logged(usuario);
				setTimeout(() => router.push("/account/profile"), 1500);
				this.respuesta(
					"Error al enviar correo de verificación. Por favor, verifique manualmente en su perfil.",
					"error"
				);
			});
		}
	}
};
</script>

<style lang="scss" scoped>
    .fondo{
        background:#1f3b63;
        height: 100%;
    }   
    .color {
        color: #000;
        background: #fff;
    }
    .color:hover {
    cursor: pointer;
        text-decoration: underline;
        background: #fff;
    }
</style>