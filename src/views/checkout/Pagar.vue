<template>
    
</template>
<script>
import variables from "@/services/variables_globales";
import FilePondPluginImagePreview from "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.esm.js";
const FilePond = vueFilePond(FilePondPluginImagePreview);
export default {
    components:{
        FilePond
    },
    props: {
        view: {
            default: 1,
            type: Number,
        },
        setView:{
            type:Function
        },
        total: {
            default: 0,
            type: String,
        },
        pedido: {
            default: function() {
                return {};
            },
            type: Object,
        },
    },
    data() {
        return {
            ...variables,
        };
    },
    head: {},
    watch: {},
    computed: {
       
    },
    methods: {
        onView(step){
            this.setView(step)
        }
    },
};
</script>