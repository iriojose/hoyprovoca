<template>
    <div>
        <Toolbar />
        <v-divider></v-divider>
        
        <v-row justify="center" class="pa-5 my-5">
            <v-col cols="12" md="7" sm="12">
                <div class="title font-weight-black">Términos y condiciones de Hoyprovoca</div>
            </v-col>

            <v-col cols="12" md="4" sm="12">
                <List />
            </v-col>
        </v-row>
    </div>
</template>

<script>
import Toolbar from './Toolbar';
import List from './List';

    export default {
        components:{
            Toolbar,
            List
        },  
    }
</script>
