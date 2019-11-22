<template>
    <div>
        <v-app-bar elevation="0" app color="#f5f5f5" class="">
            <v-app-bar-nav-icon class="hidden-md-and-up"/>

            <v-toolbar-title class="headline mx-8 text-center">
                {{titulo}}
            </v-toolbar-title>

            <v-spacer />

            <v-toolbar-items>
                <v-btn  to="/admin/notificaciones" icon>
                    <v-badge 
                        left 
                        color="blue darken-1" 
                        class="align-self-center mx-2" 
                        overlap 
                    
                    >
                        <template v-slot:badge>
                            <strong></strong>
                        </template>
                    
                        <v-icon size="30">
                            notifications
                        </v-icon>
                    </v-badge>
                </v-btn>

                <v-btn icon to="/admin/usuarios">
                    <v-icon size="30">
                        person
                    </v-icon>
                </v-btn>
                
            </v-toolbar-items>
        </v-app-bar>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                titulo:'Admin'
            }
        },

        watch: {
            '$route'(val){
                this.titulo = val.name;
            }
        },
    }
</script>