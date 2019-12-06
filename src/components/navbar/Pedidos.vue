<template>
    <div>
        <v-list dense v-for="n in 2" :key="n" >
            <v-list-title>
                <v-row>
                    <v-col cols="12" md="7" lg="7" sm="7">
                        <v-img width="100" height="80" contain src="https://pbs.twimg.com/profile_images/735923222017912832/T3YfsxCf_400x400.jpg"></v-img>
                    </v-col>
                    <v-col class="mt-8 font-weight-black subtitle-1" cols="12" md="4" lg="4" sm="4">
                        Bss. 300000
                    </v-col>
                </v-row>
            </v-list-title>
            <v-divider></v-divider>
            <v-list-item v-for="p in 2" :key="p">
                <v-row class="pr-10">
                    <v-col cols="12" md="7" lg="7" sm="7">
                        <v-img width="50" height="50" contain src="https://www.achocom.net/server/Portal_0015185/img/products/xiaomi-redmi-note-7-4gb64gb-dual-sim-negro_8265115_xxl.jpg"></v-img>
                    </v-col>
                    <v-col class="mt-4 font-weight-black subtitle-1" cols="12" md="4" lg="4" sm="4">
                        Bss. 300000
                    </v-col>
                </v-row>
            </v-list-item>
            <v-divider></v-divider>
        </v-list>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>

</style>