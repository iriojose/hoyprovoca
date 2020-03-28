<template>
    <v-app style="background-color:#f7f7f7;">
        <transition name="fade">
            <router-view/>
        </transition>  
    </v-app>
</template>

<script>
    export default {
        name: 'App',
    }
</script>

<style>
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to{
        opacity: 0;
    }
    body::-webkit-scrollbar {
        width: 8px;     
        height: 8px;    
    }
    body::-webkit-scrollbar-thumb {
        background: #ccc;
        border-radius: 4px;
    }
    body::-webkit-scrollbar-thumb:hover {
        background: #b3b3b3;
        box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.2);
    }
    body::-webkit-scrollbar-thumb:active {
        background-color: #999999;
    }
    body::-webkit-scrollbar-track {
        background: #e1e1e1;
        border-radius: 4px;
    }
    body::-webkit-scrollbar-track:hover,
    body::-webkit-scrollbar-track:active {
        background: #d4d4d4;
    }
</style>