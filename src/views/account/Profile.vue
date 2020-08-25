<template>
    <v-card elevation="0">
        <div class="font-weight-black title mb-5" style="padding-top:10px;text-align:center;">
            Información de tu cuenta
        </div>

        <v-form v-model="valid" @submit.prevent="">
            <v-row justify="center">
                <v-col cols="12" md="6" sm="12" class="px-12">
                    <v-text-field
                        filled rounded disabled
                        v-model="data.email" single-line
                        dense color="#2950c3" 
                        label="Ingrese correo electrónico"
                        hint="Email" persistent-hint
                    ></v-text-field>

                    <v-text-field
                        filled single-line
                        label="Nombre" dense
                        rounded hint="Nombre"
                        :rules="[required('Nombre')]"
                        v-model="data.nombre" persistent-hint
                        color="#2950c3" :disabled="loading"
                        @input="validEdit()"
                    ></v-text-field>

                    <v-text-field
                        filled single-line
                        label="Apellido" dense
                        rounded hint="Apellido"
                        :rules="[required('Apellido')]"
                        v-model="data.apellido" persistent-hint
                        color="#2950c3" :disabled="loading"
                        @input="validEdit()"
                    ></v-text-field>

                    <v-switch 
                        v-model="email" class="ma-4" color="green" @change="sendEmail()"
                        :label="label" :loading="loading2" :readonly="block"
                        v-if="!$vuetify.breakpoint.smAndDown"
                    ></v-switch>

                    <!--v-switch 
                        v-model="notificaciones" :disabled="process"
                        class="ma-4" color="green" :label="label2"
                        v-if="!$vuetify.breakpoint.smAndDown"
                    ></v-switch-->
                </v-col>
                <v-col cols="12" md="6" sm="12" class="px-10">
                    <v-text-field
                        filled rounded persistent-hint
                        dense :disabled="loading" v-model="data.login" single-line
                        type="text" color="#0f2441" @input="validEdit()"
                        :rules="[required('Nombre de usuario'),minLength('Nombre de usuario',4)]"
                        label="Nombre de usuario" hint="Usuario" 
                    ></v-text-field>

                    <v-text-field
                        filled single-line prefix="+58"
                        label="Telefono" dense
                        rounded hint="format: +58-000-000-0000"
                        @input="changeNumber()"
                        :rules="[required('Telefono'),telefonoFormat()]"
                        v-model="data.telefono" persistent-hint
                        color="#2950c3" :disabled="loading"
                    ></v-text-field>

                    <v-menu :close-on-content-click="false" transition="scale-transition" max-width="100%" offset-overflow>
                        <template v-slot:activator="{ on }">
                            <v-text-field
                                dense v-model="data.fecha_nac" :disabled="loading"
                                label="Cumpleaños" color="#2950c3" append-icon="mdi-calendar" 
                                filled v-on="on" rounded hint="Formato YYYY/MM/DD" 
                                persistent-hint single-line @input="validEdit()"
                            ></v-text-field>
                        </template>
                        <v-date-picker v-model="data.fecha_nac" :landscape="!$vuetify.breakpoint.smAndDown" show-current  header-color="#2950c3" color="#2950c3"  locale="es"/>
                    </v-menu>

                    <v-switch 
                        v-model="email" class="ma-4" color="green" @change="sendEmail()"
                        :label="label" :loading="loading2" :readonly="block"
                        v-if="$vuetify.breakpoint.smAndDown"
                    ></v-switch>

                    <!--v-switch 
                        v-model="notificaciones" :disabled="process"
                        class="ma-4" color="green" :label="label2"
                        v-if="$vuetify.breakpoint.smAndDown"
                    ></v-switch-->
                </v-col>
            </v-row>
        </v-form>

        <v-card-actions style="position:relative">
            <v-card elevation="0" height="50">
                <v-fade-transition>
                    <v-alert border="left" colored-border elevation="2"  dense :type="type" v-show="showMessage">
                        {{mensaje}}
                    </v-alert>
                </v-fade-transition> 
            </v-card>
            <v-spacer></v-spacer>
            <v-btn 
                style="padding: 0 20px;"
                color="#2950c3" class="text-capitalize white--text center-abs" 
                @click="updateUsuario()" :loading="loading"
                :disabled="valid && editable ? false:true"
            >
                Actualizar
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import {mapState,mapActions} from 'vuex';
import Usuario from '@/services/Usuario';
import Auth from '@/services/Auth';
import validations from '@/validations/validations';
import Nots from '@/services/Nots';
import variables from '@/services/variables_globales';

    export default {
        data() {
            return {
                ...variables,
                ...validations,
                loading:false,
                loading2:false,
                loading3:false,
                valid:false,
                enviando:false,
                editable:false,
                process:false,
                data:{},
                mensaje:'',
                type:'error',
                showMessage:false,
                email:false,
                notificaciones:false,
                block:false,
                label:"Verificar correo electrónico",
                label2:"Recibir notificaciones"
            }
        },
        head: {
            title() {
                return {
                    inner: "Hoyprovoca",
                    separator:'|',
                    complement:'Perfil'
                };
            }
        },
        computed:{
            ...mapState(['user']),
        },
        /*watch: {
            notificaciones(){
                 if ("serviceWorker" in navigator && "PushManager" in window) {
                    navigator.serviceWorker.register('./../../NotificationListener.js').then((Registration) => {
                        let result;
                        this.process = true;
                        Registration.pushManager.getSubscription().then((subscription) =>{
                            if (subscription) {
                                subscription.unsubscribe();
                                this.process = false;
                                this.notificaciones = false;
                            }else{
                                this.subscribeNotificaciones(this.user.data.id,Registration);
                                 console.log("agrega")
                            }
                            })
                            .catch((error)=> {
                                console.log('', result,error);
                            })
                    }).catch(function (error) {
                        console.error("Service Worker Error", error);
                    });
                } else {
                    console.warn("Push messaging is not supported");
                }
            }
        },*/
        watch: {
            user(){
                this.data = Object.assign({},this.user.data);
                this.data.fecha_nac = this.data.fecha_nac.substr(0, 10); 
                if (this.data.verificado == 1) {
                    this.email = true;
                    this.label = "Correo electrónico verificado.";
                    this.block = true;
                }
            }
        },
        mounted() {
            this.data = Object.assign({},this.user.data);
            this.data.fecha_nac = this.data.fecha_nac.substr(0, 10); 
            if (this.data.verificado == 1) {
                this.email = true;
                this.label = "Correo electrónico verificado.";
                this.block = true;
            }
        },
        methods:{
            ...mapActions(['setData']),
            
            respuesta(mensaje,type){
                this.mensaje = mensaje;
                this.type = type;
                this.loading = false;
                this.showMessage = true;
            },
            respuesta2(mensaje,type){
                this.mensaje = mensaje;
                this.type = type;
                this.loading2 = false;
                this.showMessage = true;
            },
            changeNumber(){
                this.validEdit();
                if(this.data.telefono.length == 3){
                    this.data.telefono+='-';
                }else if(this.data.telefono.length == 7){
                    this.data.telefono+='-';
                }
            },
            validEdit(){
                this.editable = true;
            },
            updateUsuario(){
                delete this.data.usuario_at;
                delete this.data.recovery;
                delete this.data.recoverydate;
                delete this.data.usuario_in;
                delete this.data.client;
                this.showMessage = false;
                this.loading = true;
                Usuario().post(`/${this.data.id}`,{data:this.data}).then(() => {
                    this.editable = false;
                    this.setData(this.data);
                    this.respuesta("Datos actualizados exitosamente.",'success');
                }).catch(e => {
                    console.log(e);
                    this.respuesta("Error al intentar actualizar",'error');
                });
            },
            sendEmail(){
                this.loading2 = true;
                this.showMessage = false;
                Auth().post("/verify",{data:{user:this.user.data.email}}).then((response) => {
                    this.respuesta2("Correo de verificación enviado.",'success');
                    this.block = true;
                }).catch(e => {
                    console.log(e);
                    this.email = false;
                    this.respuesta2("Error al enviar correo de verificación.",'error');
                });
            },
            /*subscribeNotificaciones(id,response){
                        const applicationServerKey = this.urlB64ToUint8Array(this.key_notificaciones)
                        const checkSubsciption =  setInterval(()=>{
                            if(response.active) {
                                response.pushManager.subscribe({
                                    userVisibleOnly: true,
                                    applicationServerKey: applicationServerKey,
                                }).then((subscription) => {
                                    clearInterval(checkSubsciption)
                                    const traducirSbuscription = JSON.stringify(subscription);
                                    if(!this.enviando) this.postSubscribe(traducirSbuscription,id);
                                }).catch(function (err) {
                                    clearInterval(checkSubsciption)
                                    console.log("Failed to subscribe the user: ", err);
                                });
                            }
                        },1000);
            },*/
            //encriptar public key de nots
            /*urlB64ToUint8Array(base64String) {
                const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
                const base64 = (base64String + padding)
                    .replace(/\-/g, "+")
                    .replace(/_/g, "/");
                const rawData = window.atob(base64);
                const outputArray = new Uint8Array(rawData.length);
                for (let i = 0; i < rawData.length; ++i) {
                    outputArray[i] = rawData.charCodeAt(i);
                }
                return outputArray;
            },
            //subscribir para recibir nots
            postSubscribe(data,id){
                this.enviando = true;
                let subscribe = {
                    subscription_data:data,
                    usuario_id:id
                };
                Nots().post("/push/subscribe",{data:subscribe}).then((response) => {
                    console.log(response);
                    this.enviando = false;
                    this.process = false;
                }).catch(e => {
                    this.envianeo = false;
                    this.process = false;
                    this.notificaciones = false;
                    console.log(e);
                });
            },*/
        },
    }
</script>

<style lang="scss">
    .center-abs {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

</style>