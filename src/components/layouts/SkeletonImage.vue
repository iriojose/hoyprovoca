<template>
    <v-sheet 
        :color="`grey ${theme.isDark ? 'darken-2' : 'lighten-4'}`"
        class="mx-5"
    >
         <v-skeleton-loader  
            type="image" 
            height="300"
        />
    </v-sheet>
</template>

<script>
    export default {
        inject: ["theme"]
    }
</script>

