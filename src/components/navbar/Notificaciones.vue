<template>
    <div v-if="user.loggedIn && !$vuetify.breakpoint.smAndDown">
        <v-menu
            :transition="transition()"
            bottom open-on-hover offset-y
        >
            <template v-slot:activator="{ on }">
                <v-btn 
                    fab class="mx-3" color="transparent"
                    elevation="0" small v-on="on"
                >
                    <v-icon color="#fff">
                        mdi-bell
                    </v-icon>
                </v-btn>
            </template>
            <v-card class="customized" width="300" height="300">
                <v-virtual-scroll
                    :bench="benched"
                    :items="items"
                    height="300"
                    item-height="64"
                >
                    <template v-slot="{ item }">
                    <v-list-item :key="item">
                        <v-list-item-action>
                        <v-btn fab small depressed color="primary">
                            {{ item }}
                        </v-btn>
                        </v-list-item-action>

                        <v-list-item-content>
                        <v-list-item-title>
                            User Database Record <strong>ID {{ }}</strong>
                        </v-list-item-title>
                        </v-list-item-content>

                        <v-list-item-action>
                        <v-icon small>mdi-open-in-new</v-icon>
                        </v-list-item-action>
                    </v-list-item>

                    <v-divider></v-divider>
                    </template>
                </v-virtual-scroll>
            </v-card>
        </v-menu>
    </div>
</template>

<script>
import {mapState,mapActions} from 'vuex';

    export default {
        data() {
            return {
                benched: 0,
            }
        },
        computed:{
            ...mapState(['user']),

            items () {
                return Array.from({ length: this.length }, (k, v) => v + 1)
            },
            length () {
                return 7000
            },
        },
        methods:{
            transition(){
                return "slide-y-transition"
            },
        }
    }
</script>

<style lang="scss" scoped>
    .customized {
        margin-top: 10px;
    }
    .customized {
        border: 1px solid #d5cec8;
        display: block;
        background: white;
    }
    .customized:before,
    .customized:after {
        content: " ";
        height: 0;
        position: absolute;
        width: 0;
        border: 11px solid transparent;
        /* arrow size */
        right: 43%;
        transform: translateX(-100%);
    }
    .customized:before {
        border-bottom: 12px solid rgba(0, 0, 0, 0.1);
        border-right: 12px solid rgba(0, 0, 0, 0);
        border-top: 12px solid rgba(0, 0, 0, 0);
        content: "";
        display: inline-block;
        position: absolute;
        top: -24px;
    }
    .customized:after {
        border-bottom: 12px solid #fff;
        border-right: 12px solid rgba(0, 0, 0, 0);
        border-top: 12px solid rgba(0, 0, 0, 0);
        content: "";
        display: inline-block;
        position: absolute;
        top: -22px;
    }
</style>