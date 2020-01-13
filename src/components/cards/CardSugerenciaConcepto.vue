<template>
    <v-card elevation="0" width="250" height="200" color="#fff">
        <v-img
            src="https://moviles.info/wp-content/uploads/2019/01/xiaomi-mi-9.png"
            contain
            height="200"
            width="100%"
        ></v-img>
    </v-card>
</template>

<script>
    export default {
        props:{
            concepto:{
                type:String,
                default:() => {}
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>