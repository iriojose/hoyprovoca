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
            meta: [
                { name: 'application-name', content: 'Hoyprovoca.com | E-commerce' },
                { name: 'description', content: 'Hoyprovoca es una e-commerce que consiste en la distribución, venta, compra, marketing y suministro de información de productos o servicios a través de Internet.', id: 'desc' }, // id to replace intead of create element

                //{ n: 'twitter:description', c: 'Content description less than 200 characters'},
               
                // Google+ / Schema.org
                { itemprop: 'name', content: 'Content Title' },
                { itemprop: 'description', content: 'Content Title' },
                // ...
                // Facebook / Open Graph
                //{ property: 'fb:app_id', content: '123456789' },
                //{ property: 'og:title', content: 'Content Title' },
                // with shorthand
                //{ p: 'og:image', c: 'https://example.com/image.jpg' },
                // ...
            ],
        },
    };
</script>
