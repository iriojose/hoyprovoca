<template>
   <v-container>
        <v-alert 
            border="right"
            colored-border
            color="deep-purple accent-4"
            elevation="2"
        >  
            <v-card-title>
                Usuarios
                <v-spacer></v-spacer>
                <v-text-field
                    v-model="search"
                    append-icon="search"
                    label="Search"
                    single-line
                    hide-details
                ></v-text-field>
            </v-card-title>

            <v-data-table
                :headers="headers"
                :items="desserts"
                :search="search"
            >
                <template v-slot:item.action="{ item }">
                    <v-icon small class="mr-2" @click="verItem(item)"> 
                        remove_red_eye
                    </v-icon>
                    <v-icon small @click="banItem(item)">
                        delete
                    </v-icon>
                </template>
            </v-data-table>
        </v-alert>

        <v-dialog v-model="dialog" width="700">
            <v-card>
                <v-layout wrap row justify-center>
                    <v-flex md6 xs6>
                        <v-avatar size="100" class="mx-auto d-block position">
                            <v-img src="https://cdn.vuetifyjs.com/images/john.jpg" class="elevation-5"/>
                        </v-avatar>
                        <v-card class="pt-12" elevation="5">
                            <div class="font-weight-light text-center pt-5">
                                {{user.firstName + ' ' + user.lastName}}
                            </div>
                            <div class="text-center mt-3 px-5">
                                    {{user.content}}
                            </div>
                            <div class="mx-3 py-4">
                                <v-btn color="green" block dark @click="banItem(item)">
                                    Desactivar
                                </v-btn>
                            </div>
                        </v-card>
                    </v-flex>
                    <v-flex md9 xs11>
                        <v-card 
                            class="position-card mx-auto d-block" 
                            elevation="5" 
                            color="green" 
                            height="50" 
                            width="95%"
                        >
                            <v-subheader dark>Perfil</v-subheader>
                        </v-card>
                        <v-card class="pt-12 pb-5" elevation="5">
                            <v-layout row wrap justify-space-around>
                                <v-flex md5 xs5 sm5 align-self-center>
                                    <v-text-field
                                        type="text"
                                        label="Nombre(s)"
                                        hide-details
                                        dense
                                        outlined
                                        :value="user.firstName"
                                        class="my-5"
                                    />
                                </v-flex>
                                <v-flex md5 xs5 sm5 align-self-center>
                                    <v-text-field
                                        type="text"
                                        label="Apellido(s)"
                                        hide-details
                                        dense
                                        outlined
                                        :value="user.lastName"
                                        class="my-5"
                                    />
                                </v-flex>

                                <v-flex md5 xs5 sm5 align-self-center>
                                    <v-text-field
                                        type="text"
                                        label="Cedula"
                                        hide-details
                                        dense
                                        outlined
                                        :value="user.cedula"
                                        class="my-5"
                                    />
                                </v-flex>

                                <v-flex md5 xs5 sm5 align-self-center>
                                    <v-text-field
                                        type="text"
                                        label="Email"
                                        hide-details
                                        dense
                                        outlined
                                        :value="user.email"
                                        disabled
                                        class="my-5"
                                    />
                                </v-flex>

                                <v-flex md5 xs5 sm5 align-self-center>
                                    <v-text-field
                                        type="text"
                                        label="Telefono"
                                        hide-details
                                        dense
                                        outlined
                                        :value="user.telefono"
                                        class="my-5"
                                    />
                                </v-flex>

                                <div class="d-block mx-auto">
                                    <v-btn color="green" dark>
                                        Editar Perfil
                                    </v-btn>
                                </div>
                            </v-layout>
                        </v-card>
                    </v-flex>
                </v-layout>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close">Cerrar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
  export default {
    data () {
      return {
        dialog:false,
        search: '',
        user:{
            firstName:'Irio',
            lastName:'Gómez',
            cedula:'26707104',
            telefono:'0412-795-9576',
            content:'irio gomez programador web en javascript',
            email:'iriojgomezv@gmail.com',
        },
        editedItem: {
            name: '',
            email:'',
            telefono:''
        },
        headers: [
          {
            text: 'Nombre(s)',
            align: 'left',
            sortable: false,
            value: 'name',
          },
          {text: 'Apellido(s)',sortable: false,value: 'apellido'},
          { text: 'Cedula', value: 'cedula',sortable: false},
          { text: 'Email', value: 'email',sortable: false},
          { text: 'Telefono', value: 'telefono',sortable: false },
          { text: 'Acciones', value: 'action', sortable: false },
        ],
        desserts: [
          {
            name: 'Frozen Yogurt',
            apellido:'Yogurt',
            cedula:'26707104',
            email: 'iriojgomezv@gmail.com',
            telefono: '0412-7959576',
          },
        ],
      }
    },

    methods: {
        verItem(item){
            this.editedItem = Object.assign({}, item);
            this.dialog= true;
        },

        banItem(item){
            confirm('Estas seguro de querer banear a este usuario?');
            this.dialog= false;
        },

        close() {
            this.dialog = false;
        },
    },
  }
</script>

<style scope>
    .position{
        position: relative;
        bottom: 0px ;
        top: 50px;
        z-index: 3;
    }

    .mt{
        margin-top:50px;
    }

    .position-card{
        position: relative;
        bottom: 0px;
        top: 30px;
        z-index: 3;
    }

    .position-chart{
        position: relative;
        bottom: 0px;
        top: 80px;
        z-index: 3;
    }
</style>