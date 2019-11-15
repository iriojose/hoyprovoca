<template>
    <v-sheet :color="`grey ${theme.isDark ? 'darken-2' : 'lighten-4'}`">
        <v-row>
            <v-col cols="12" md="10" sm="10" lg="10" offset="1">
                 <v-skeleton-loader  
                    type="image" 
                    height="200"
                />
            </v-col>

            <v-col cols="12" md="3" lg="3" sm="3" offset="2">
                <v-skeleton-loader 
                    width="100%" 
                    type="list-item-three-line" 
                />
            </v-col>
            <v-col cols="12" md="3" lg="3" sm="3" offset="2">
                <v-skeleton-loader 
                    width="100%" 
                    type="list-item-three-line" 
                />
            </v-col>
            <v-col cols="12" md="3">
                <v-skeleton-loader 
                    width="100%" 
                    type="list-item-avatar-three-line, article" 
                />
            </v-col>

            <v-col cols="12" md="3">
                <v-skeleton-loader 
                    width="100%" 
                    type="list-item-avatar-three-line, article" 
                />
            </v-col>

            <v-col cols="12" md="3">
                <v-skeleton-loader 
                    width="100%" 
                    type="list-item-avatar-three-line, article" 
                />
            </v-col>

            <v-col cols="12" md="3">
                <v-skeleton-loader 
                    width="100%" 
                    type="list-item-avatar-three-line, article" 
                />
            </v-col>
        </v-row>
    </v-sheet>
</template>

<script>
    export default {
        inject: ["theme"]
    }
</script>
