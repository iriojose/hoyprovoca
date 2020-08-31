<template>
	<div>
		<Banner />
		<CategoriasSugeridas />
        <!--v-divider class="mt-6"></v-divider>
		<ProductoMasVendido /-->
		<v-divider class="mt-6"></v-divider>
        <EmpresasSugeridas title="Nuestros Aliados" />
	</div>
</template>

<script>

	export default {
		components:{
			Banner:() => import("@/components/vistaHome/Banner"),
            EmpresasSugeridas:() => import("@/components/vistaHome/EmpresasSugeridas"),
            CategoriasSugeridas:() => import("@/components/vistaHome/CategoriasSugeridas"),
			ProductoMasVendido:() => import("@/components/vistaHome/ProductoMasVendido"),
			Ofertas:() => import("@/components/vistaHome/Ofertas")
		},
		head: {
            title() {
                return {
                    inner: "Hoyprovoca",
                    separator: "|",
                    complement: "Inicio",
                };
			},
		}		
	}
</script>