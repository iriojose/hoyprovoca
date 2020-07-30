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
		components:{
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
		}		
	}
</script>