<template>
    <v-dialog v-model="dialogChange" width="600">
        <div class="back">
            <v-toolbar color="#f5f5f5">

                <v-toolbar-title class="font-weight-bold ml-12">
                    {{producto.nombre}}
                </v-toolbar-title>

                <v-spacer></v-spacer>
            
                    <v-toolbar-items>
                        <v-btn fab  icon @click="dialogChange = false">
                            <v-icon color="#000" >
                                close
                            </v-icon>
                        </v-btn>
                    </v-toolbar-items>
            </v-toolbar>
            <v-divider></v-divider>
            <v-card height="400" width="100%">
                <v-img 
                    :src="producto.img" 
                    width="50%" 
                    height="300" 
                    contain 
                    class="pt-4"
                />
            </v-card>
        </div>
    </v-dialog>
</template>

<script>
import {mapState,mapActions} from 'vuex';

    export default {
        computed: {
            ...mapState(['dialog','producto']),

            dialogChange:{
                get(){
                    return this.dialog;
                },
                set(val){
                    this.setDialog(val);
                }
            }
        },
        methods: {
            ...mapActions(['setDialog'])
        },

    }
</script>