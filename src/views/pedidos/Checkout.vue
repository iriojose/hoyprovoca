<template>
    <div>
        <v-toolbar width="100%" height="50" color="#005598">
           <v-btn text to="/" disabled>
               <v-img width="120" height="120" src="@/assets/logo2.png" contain></v-img>
           </v-btn>
           <v-spacer></v-spacer>
           <v-btn to="/" text elevation="0" dark class="caption text-capitalize">
               Seguir Comprando
           </v-btn>
        </v-toolbar>

        <v-row>
           <v-col cols="12" :offset="$vuetify.breakpoint.smAndDown ? null:1" md="6"> 
               <v-sheet
                    class="mt-10 py-3"
                    elevation="10"
                >
                    <v-slide-group show-arrows>
                        <v-slide-item
                            v-for="n in 2"
                            :key="n"
                            v-slot:default="{ active, toggle }"
                        >
                            <v-btn
                                class="mx-2"
                                :input-value="active"
                                active-class="purple white--text"
                                depressed
                                rounded
                                @click="toggle"
                            >
                                Pastelito Maracucho
                            </v-btn>
                        </v-slide-item>
                    </v-slide-group>
                </v-sheet>

                <v-card elevation="10" class="mt-10 text-center" width="100%">
                    <v-list two-line subheader>
                        <v-subheader class="title px-10">Items</v-subheader>
                        <v-list-item :disabled="bauche ? true:false" v-for="n in 7" :key="n" class="px-10">

                            <v-list-item-avatar horizontal size="50">
                                <v-img contain src="https://www.partesdel.com/wp-content/uploads/Partes-del-Televisor...jpg"></v-img>
                            </v-list-item-avatar>

                            <v-list-item-title class="caption">
                                xiaomi redmi note 7 plus
                            </v-list-item-title>

                            <v-list-item-subtitle>
                                <v-hover v-slot:default="{hover}">
                                    <div v-if="hover">
                                        <v-btn class="mx-2" fab outlined width="30" height="30">
                                            <v-icon v-ripple color="#000">exposure_neg_1</v-icon>
                                        </v-btn>
                                        <v-btn class="mx-2" fab outlined width="30" height="30">
                                            <v-icon v-ripple color="#000">plus_one</v-icon>
                                        </v-btn> 
                                    </div>
                                    <div v-else class="black--text body">1</div>
                                </v-hover>
                            </v-list-item-subtitle>

                            <v-list-item-subtitle class="caption black--text">
                                Bss. 300000
                            </v-list-item-subtitle>
                            <v-list-item-actions>
                                <v-btn fab color="#005598" width="40" height="40">
                                    <v-icon color="#fff">delete</v-icon>
                                </v-btn>
                            </v-list-item-actions>
                        </v-list-item>
                    </v-list>
                </v-card>
            </v-col>

            <v-col cols="12" md="4" class="mx-3 mt-10">
                <v-card 
                    elevation="10" 
                    :class="$vuetify.breakpoint.smAndDown ? 'py-4':'fix mx-5 py-4'"
                >
                    <div class="text-center title mb-3">
                        Bolivares/Dolares
                    </div>
                    <v-divider></v-divider>
                    <v-row class="px-5">
                        <v-col cols="12" md="6" sm="6">
                            <div class="py-2">0$</div>
                            <v-text-field 
                                solo
                                v-model="bolivar"
                                dense
                                color="#000"
                                hide-details
                                disabled
                                single-line
                                type="number"
                            />
                        </v-col>
                        <v-col cols="12" md="6" sm="6">
                            <div class="py-2">0Bs.</div>
                            <v-text-field 
                                solo
                                v-model="dolares"
                                dense
                                color="#000"
                                hide-details
                                disabled
                                single-line
                                type="number"
                            />
                        </v-col>
                    </v-row>
                    <v-divider class="mt-2"></v-divider>
                    <v-card-actions class="mx-auto px-5 my-2">
                        <v-row>
                            <v-col cols="12" md="12" sm="12">
                                <v-file-input
                                    label="Abjuntar Pago"
                                    counter
                                    @change="change($event)"
                                    dense
                                    color="#005598"
                                    outlined
                                />
                            </v-col>
                            <v-col cols="12" md="12" sm="12" justify-self="center">
                                <v-img width="450" height="200" contain v-if="bauche" :src="bauche" />
                            </v-col>
                        </v-row>
                    </v-card-actions>
                </v-card>
            </v-col>
       </v-row>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                bolivar:0,
                dolares:0,
                bauche:null,
            }
        },
        methods: {
            ss(){

            },

            change(evt){
                this.bauche=null;
                if(evt){
                    var reader = new FileReader();
                    reader.onload = (e) => {
                        this.bauche = e.target.result;
                    }
                    reader.readAsDataURL(evt);
                }
            }
        },
    }
</script>

<style scoped>
    .fix{
        position:fixed;
        top: 102px;
        width: 500px;
    }
    .cuadro{
        border: 1px solid #eee;
        border-radius: 100%;
        width: 50px;
        height: 50px;
    }
</style>