<template>
    <v-card class="mt-4">
        <v-sheet
            class="v-sheet--offset mx-auto"
            :color="color"
            elevation="12"
            max-width="calc(100% - 32px)"
        >
            <v-sparkline
                :labels="labels"
                :value="value"
                height="120"
                color="white"
                :type="tipo == 'bar' ? 'bar':'trend'"
                :line-width="tipo == 'bar' ? 15:2"
                padding="16"
                auto-draw
                show-labels
                smooth
            ></v-sparkline>
        </v-sheet>

        <v-card-text class="pt-0">
            <div class="title font-weight-light mb-2">{{title}}</div>
            <div class="subheading font-weight-light grey--text">{{performance}}</div>
            <v-divider class="my-2"></v-divider>
            <v-icon
                class="mr-2"
                small
            >
                mdi-clock
            </v-icon>
            <span class="caption grey--text font-weight-light">{{last}}</span>
        </v-card-text>
    </v-card>
</template>

<script>
    export default {
        props:{
            value:{
                type:Object,
                default:() => ([]),
            },
            labels:{
                type:Object,
                default:() => ([]),
            },
            tipo:{
                type:String,
                default:'trend'
            },
            title:{
                type:String,
                default:''
            },
            performance:{
                type:String,
                default:''
            },
            last:{
                type:String,
                default:''
            },
            color:{
                type:String,
                default:'teal'
            }
        }

    }
</script>

<style>
    .v-sheet--offset {
        top: -24px;
        position: relative;
    }
</style>