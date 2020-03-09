<template>
    <v-card class="mt-2" elevation="2">
        <v-list dense>
            <v-list-item
                v-for="opcion in opciones"
                :key="opcion.text"
                :to="opcion.path"
                class="py-2"
                active-class="border aftim-color "
            >
                <v-list-item-icon>
                    <v-icon>{{opcion.icon}}</v-icon>
                </v-list-item-icon>

                <v-list-item-title>{{opcion.text}}</v-list-item-title>
            </v-list-item>
        </v-list>
    </v-card>
</template>

<script>
    export default {
        data() {
            return {
                opciones: [
                    { 
                        icon: "build", 
                        text: "Ajustes de cuenta", 
                        path: "/account/profile" 
                    },
                    /*{
                        icon: "credit_card",
                        text: "Metodos de pago",
                        path: "/account/metodo-de-pago"
                    },*/
                    {
                        icon: "calendar_today",
                        text: "Ultimos pedidos",
                        path: "/account/historial"
                    },
                    {
                        icon: "help_outline",
                        text: "Centro de ayuda",
                        path: "/account/ayuda"
                    },
                    {
                        icon: "history",
                        text: "Centro de notificaciones",
                        path: "/account/notificaciones"
                    }
                ],
            }
        },
    }
</script>

<style scoped>
    .aftim-color {
        color: #005598;
    }
    .border {
        border-left: 4px solid #005598;
    }
</style>