<template>
    <v-card elevation="0">
        <v-card-title class="mx-3">
            <v-img contain width="80" height="80" src="http://www.e02.es/cubic/datos/docs/doc_365/imag_381_creacion_logotipos_identidad_corporativa_01_penato.png"/>
            Penato
        </v-card-title>

        <v-card-text>
            <v-expansion-panels accordion active-class="grey lighten-4">
                <v-expansion-panel
                    v-for="n in 9"
                    :key="n"
                    @click="push(n)"
                >
                    <v-expansion-panel-header expand-icon="arrow_right">Item</v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <v-list color="#f5f5f5">
                            <v-list-item-group>
                                <v-list-item
                                    v-for="p in 2"
                                    :key="p"
                                    @click="push2(p)"
                                >
                                    <v-list-item-content>
                                        <v-list-item-title v-text="p"></v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list-item-group>
                        </v-list>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
        </v-card-text>
    </v-card>
</template>

<script>
    export default {
        data() {
            return {
                top:0,
                local:'',
                categoria:'',
                especifica:''
            }
        },

        mounted() {
            if(this.$route.params.especifica){
                this.especifica = this.$route.params.especifica;
            } 
            if(this.$route.params.categoria){
                this.categoria = this.$route.params.categoria;
            } 
            this.local=this.$route.params.local;
        },

        methods: {
            push(n){
                this.$router.push({
                    name: "nivel1",
                    params:{
                        categoria:n,
                    }
                });

                this.categoria = n;
                console.log(this.categoria + ' categoria');
            },

            push2(n){
                this.$router.push({
                    name: "nivel2",
                    params:{
                        especifica:n,
                    }
                });
                this.especifica = n;
                console.log(this.especifica + 'especifica');
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>