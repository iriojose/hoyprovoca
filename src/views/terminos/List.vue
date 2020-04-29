<template>
    <v-list elevation="0" dense color="#f7f7f7">
        <v-list-item v-for="(item,i) in items" :key="i" :to="item.path">
            <v-list-item-title>
                {{item.text}}
            </v-list-item-title>
        </v-list-item>
    </v-list>
</template>

<script>
    export default {
        data() {
            return {
                items:[
                    {text:'Términos y condiciones de pago - hoyprovoca',path:'/terminos-y-condiciones-de-pago-hoyprovoca'},
                    {text:'Términos y condiciones - hoyprovoca',path:'/terminos-y-condiciones-hoyprovoca'},
                    {text:'Política de privacidad - hoyprovoca',path:'/politicas-de-privacidad-hoyprovoca'},
                ]
            }
        },     
    }
</script>