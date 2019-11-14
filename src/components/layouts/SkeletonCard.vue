<template>
    <v-sheet 
        :color="`grey ${theme.isDark ? 'darken-2' : 'lighten-4'}`" 
        
    >
        <v-skeleton-loader max-width="250" type="card" />
    </v-sheet>
</template>

<script>
export default {
  inject: ["theme"]
};
</script>

