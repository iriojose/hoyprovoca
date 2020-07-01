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
                        filled single-line
                        label="Telefono" dense
                        rounded hint="format: 0000-000-0000"
                        @input="changeNumber()"
                        :rules="[required('Telefono'),minLength('Telefono',13),maxLength('Telefono',13)]"
                        v-model="data.telefono" persistent-hint
                        color="#2950c3" :disabled="loading"
                    ></v-text-field>

                    <v-menu :close-on-content-click="false" transition="scale-transition" max-width="100%" offset-overflow>
                        <template v-slot:activator="{ on }">
                            <v-text-field
                                dense v-model="data.fecha_nac" :disabled="loading"
                                label="Cumpleaños" color="#2950c3" append-icon="event" 
                                filled v-on="on" rounded hint="Formato YYYY/MM/DD" 
                                persistent-hint single-line @input="validEdit()"
                            ></v-text-field>
                        </template>
                        <v-date-picker v-model="data.fecha_nac" landscape show-current  header-color="#2950c3" color="#2950c3"  locale="es"/>
                    </v-menu>
                </v-col>
            </v-row>
        </v-form>

        <v-card-actions>
            <v-card elevation="0" height="50">
                <v-fade-transition>
                    <v-alert border="left" colored-border elevation="2"  dense :type="type" v-show="showMessage">
                        {{mensaje}}
                    </v-alert>
                </v-fade-transition> 
            </v-card>
            <v-spacer></v-spacer>
            <v-btn 
                color="#2950c3" class="text-capitalize white--text" 
                @click="updateUsuario()" :loading="loading"
                :disabled="valid && editable ? false:true"
            >
                Editar
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import {mapState,mapActions} from 'vuex';
import Usuario from '@/services/Usuario';
import validations from '@/validations/validations';

    export default {
        data() {
            return {
                ...validations,
                loading:false,
                valid:false,
                editable:false,
                data:{},
                mensaje:'',
                type:'error',
                showMessage:false,
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
        mounted() {
            this.data = Object.assign({},this.user.data);
            this.data.fecha_nac = this.data.fecha_nac.substr(0, 10); 
        },
        methods:{
            ...mapActions(['setData']),

            respuesta(mensaje,type){
                this.mensaje = mensaje;
                this.type = type
                this.loading = false;
                this.showMessage = true;
            },
            changeNumber(){
                this.validEdit();
                if(this.data.telefono.length == 4){
                    this.data.telefono+='-';
                }else if(this.data.telefono.length == 8){
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
            }
        },
    }
</script>
