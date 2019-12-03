<template>
    <v-navigation-drawer
        app
        dark
        width="250"
        mobile-break-point="990"
    >
        <v-img
            src="https://images8.alphacoders.com/526/526198.jpg"
            height="100%"
            gradient="rgba(69,77,88,0.7), rgba(126,134,154,0.7)"
            class="px-5 pt-5"
        >
            <v-list-item>
                <v-list-item-avatar>
                    <v-avatar color="white" class="mx-3" size="50">
                        <v-img src="https://cdn.shortpixel.ai/client/q_glossy,ret_img/http://aftim.software/wp-content/uploads/2019/08/TIENDA-1.png"/>
                    </v-avatar>
                </v-list-item-avatar>
                <v-list-item-title class="title">
                    Aftim
                </v-list-item-title>
            </v-list-item>

            <v-divider class="mt-5"/>

            <v-list>
                <v-list-item
                    v-for="([icon,text,path], i) in items"
                    :key="i"
                    :to="path"
                    active-class="blue darken-1"
                    class="my-2"
                >
                    <v-list-item-icon>
                        <v-icon>{{ icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>{{ text }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>

            
            <div class="pa-2 mt-12">
                <v-btn block  to="/">Ir a tienda</v-btn>
            </div>
        </v-img>
    </v-navigation-drawer>
</template>

<script>
    export default {
        data(){
            return {
                items: [
                    ['dashboard', 'Dashboard','/admin/dashboard'],
                    ['person', 'Usuarios','/admin/usuarios'],
                    ['business', 'Aliados','/admin/aliados'],
                    ['notifications', 'Notificaciones','/admin/notificaciones'],
                    ['payment', 'Ventas','/admin/ventas'],
                ],
                drawer:false
            }
        }
    }
</script>
