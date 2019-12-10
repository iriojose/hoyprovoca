<template>
    <div>
        <v-card width="100%" elevation="2">
            <v-card-title class="title font-weight-bold back">
                Ayuda
            </v-card-title>
            <v-divider></v-divider>

            <v-card-text>
                <v-card-title class="mx-10">
                    <v-subheader class="subtitle-1 font-weight-bold">¿En qué podemos ayudarte?</v-subheader>
                </v-card-title>
                <v-row>
                    <v-col 
                        cols="12" 
                        md="4" sm="10" lg="4" 
                        class="border mr-3 my-3" 
                        offset="1" 
                        v-for="lista in listas"
                        :key="lista.id"
                    >
                        <v-hover v-slot:default="{hover}">
                            <v-card :to="lista.link" v-ripple elevation="0" :color="hover ? '#f5f5f5':null">
                                <v-row>
                                    <v-col cols="12" md="3" sm="3" class="mx-2">
                                        <v-img 
                                            contain 
                                            width="64" 
                                            height="64" 
                                            :src="require(`@/assets/`+lista.svg)"></v-img>
                                    </v-col>
                                    <v-col cols="12" md="8" sm="8">
                                        <div :class="hover ? 'red--text':'font-weight-black'">
                                            {{lista.title}}
                                        </div>
                                        <div>
                                            {{lista.contenido}}
                                        </div>
                                    </v-col>
                                </v-row>
                            </v-card>
                        </v-hover>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                listas:[
                    {
                        id:1,
                        svg:'ayudaperfil.svg',
                        title:'Configuracion de la cuenta',
                        contenido:'Cambiar correo o contraseña, actualizar tu informacion de inicio de sesión.',
                        link:'/'
                    },
                    {
                        id:2,
                        svg:'ayudatarjeta.svg',
                        title:'Pagos con tarjetas',
                        contenido:'Agregar o editar métodos de pago.',
                        link:'/'
                    },
                    {
                        id:3,
                        svg:'ayudapedidos.svg',
                        title:'Tus pedidos',
                        contenido:'Editar o cancelar pedidos.',
                        link:'/'
                    },
                    {
                        id:4,
                        svg:'ayudatecnico.svg',
                        title:'Soporte para dispositivos',
                        contenido:'Ayuda y soporte para dispositivos, resolver problemas con el dispositivo.',
                        link:'/'
                    },
                ]
            }
        },
    }
</script>

<style scope>
    .back{
        background: #f5f5f5;
    }
    .border{
        border: 1px solid #eee;
        border-radius: 3%;
    }
</style>