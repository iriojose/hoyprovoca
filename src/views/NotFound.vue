<template>
    <div>
        <v-row justify="center" align="center" class="mt-12">
            <v-col cols="12" md="6" sm="6" lg="6">
                <v-img 
                    contain 
                    :src="require('@/assets/undraw404.svg')"
                ></v-img>
            </v-col>
        </v-row>
        <v-toolbar color="#eee" elevation="0" class="mt-10">
            <v-spacer></v-spacer>
            <v-hover v-slot:default="{hover}">
                <v-btn class="text-capitalize caption" depressed text to="/" :elevation="hover ? 5:0">
                    Ir a inicio
                    <v-icon class="mx-2">
                        home
                    </v-icon>
                </v-btn>
            </v-hover>
            <v-spacer></v-spacer>
        </v-toolbar>
        <v-footer fixed>
            <SubFooter />
        </v-footer>
    </div>
</template>

<script>
import SubFooter from '@/components/footer/SubFooter';

    export default {
        components:{
            SubFooter
        },
    }
</script>