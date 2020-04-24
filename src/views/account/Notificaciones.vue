<template>
    <div>
        <div class="font-weight-black subtitle-1">Centro de notificaciones</div>

        <div class="px-5 font-weight-bold body-2">
            <v-row justify="center" align="center">
                <div class="text-center title">No hay notificaciones nuevas...</div>
                <v-img contain width="100%" height="300" :src="require('@/assets/notifications.svg')" />
            </v-row>
        </div>
        <!--v-responsive class="overflow-y-auto my-5" max-height="400">
            <v-row justify="center" align="center" class="px-5">
                <v-alert
                    border="left"
                    colored-border
                    color="deep-purple accent-4"
                    elevation="2"
                    type="info"
                    v-for="n in 8"
                    :key="n"
                >
                    Aliquam eu nunc. Fusce commodo aliquam arcu. In consectetuer turpis ut velit. Nulla facilisi..

                    Morbi mollis tellus ac sapien. Fusce vel dui. Praesent ut ligula non mi varius sagittis. Vivamus consectetuer hendrerit lacus. Suspendisse enim turpis, dictum sed, iaculis a, condimentum nec, nisi.
                </v-alert>
            </v-row>
        </v-responsive-->
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>

</style>