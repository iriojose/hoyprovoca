<template>
    <div>
        <Banner />
        <CategoriasSugeridas />
        <v-divider class="mt-12"></v-divider>
        <EmpresasSugeridas title="Nuestras tiendas" />
    </div>
</template>

<script>
import Banner from "@/components/vistaHome/Banner";
import EmpresasSugeridas from "@/components/vistaHome/EmpresasSugeridas";
import CategoriasSugeridas from "@/components/vistaHome/CategoriasSugeridas";

    export default {
        components: {
            Banner,
            EmpresasSugeridas,
            CategoriasSugeridas,
        },
        head: {
            title() {
                return {
                    inner: "Hoyprovoca",
                    separator: "|",
                    complement: "Inicio",
                };
            },
        },
    };
</script>
