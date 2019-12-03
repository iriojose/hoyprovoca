<template>
    <div>
       <v-card width="100%" height="510" elevation="2">
           <v-card-title class="title font-weight-bold back">
               Notificaciones
           </v-card-title>
           <v-divider></v-divider>

           <v-card-text>
               <div v-if="registros">
                   tiene
               </div>
               <div v-else class="text-center title font-weght-bold mt-10">
                   Usted no tiene notificaciones recientes...
                   <v-icon size="30" color="warning">warning</v-icon>
               </div>
           </v-card-text>
       </v-card>
    </div>  
</template>

<script>
    export default {
        registros:{}
    }
</script>

<style scope>
    .back{
        background: #eee;
    }
</style>