<template>
    <div>
        <v-row>
            <v-col cols="12" md="6" lg="6">
                <div class="circle"></div>
            </v-col>
            <v-col cols="12" md="5">
                <v-img :src="require('@/assets/undrawbanner2.svg')" contain height="400">
                </v-img>
            </v-col>
        </v-row>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>
    .fondo{
        background: #6772e5;
        
    }

    .circle {
        width: 250px;
        height: 250px;
        background-color: #6772e5;
        border-radius: 50%;
        float: left;
        padding: 10px;
        border: 20px solid #ccc;
        margin: 30px;
        -webkit-shape-outside: circle() padding-box;
            shape-outside: circle() padding-box;
        }
</style>