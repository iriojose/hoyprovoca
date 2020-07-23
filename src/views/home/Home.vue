<template>
    <div>
        <Banner />
        <CategoriasSugeridas />
        <v-divider class="mt-12"></v-divider>
        <EmpresasSugeridas title="Nuestras tiendas" />
    </div>
</template>

<script>
    export default {
        components: {
            Banner:() => import("@/components/vistaHome/Banner"),
            EmpresasSugeridas:() => import("@/components/vistaHome/EmpresasSugeridas"),
            CategoriasSugeridas:() => import("@/components/vistaHome/CategoriasSugeridas"),
        },
        head: {
            title() {
                return {
                    inner: "Hoyprovoca",
                    separator: "|",
                    complement: "Inicio",
                };
            },
            meta() {
                return [
                    { name: 'application-name', content: 'Hoyprovoca | E-commerce' },
                    { name: 'description', content: "Hoyprovoca es una e-commerce que consiste en la distribución, venta, compra, marketing y suministro de información de productos o servicios a través de Internet." },
                    { itemprop: 'name', content: 'Hoyprovoca.com' },
                    { itemprop: 'description', content: 'Web de tipo E-commerce basada en marketplace de ventas de productos y servicios ofrecidos por distribuidores aliados a Somos Sistemas C.A' },
                ]
            }
        },
    };
</script>
