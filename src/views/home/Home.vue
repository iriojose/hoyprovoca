<template>
	<div>
		<Banner />
		<CategoriasSugeridas />
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