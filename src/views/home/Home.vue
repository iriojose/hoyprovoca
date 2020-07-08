<template>
    <div>
        <Banner />
        <v-card elevation="0" color="#f7f7f7" width="100%">
            <v-card-text>
                <CategoriasSugeridas :grupos="grupos" v-if="!loadingG"  />

                <v-divider class="mt-12"></v-divider>

                <EmpresasSugeridas
                    title="Nuestras tiendas"
                    :empresas="empresas"
                    v-if="!loadingE"
                />
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
import Empresa from "@/services/Empresa";
import Grupos from "@/services/Grupos";
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
                colores: [
                    { color: "#D32F2F" },
                    { color: "#512DA8" },
                    { color: "#0288D1" },
                    { color: "#388E3C" },
                    { color: "#FBC02D" },
                    { color: "#E64A19" },
                    { color: "#5D4037" },
                    { color: "#455A64" },
                    { color: "#00796B" },
                    { color: "#7B1FA2" },
                ],
            };
        },
    },
    data() {
        return {
            empresas: [],
            grupos: [],
            bandera: false,
            loadingG: false,
            loadingE: false,
        };
    },
    mounted() {
        let grupos = JSON.parse(
            window.localStorage.getItem("gruposMasVendidos")
        );
        if (!grupos) this.getGrupos();
        else this.grupos = grupos;

        let empresas = JSON.parse(
            window.localStorage.getItem("empresasMasVendidas")
        );
        if (!empresas) this.getEmpresas();
        else this.empresas = empresas;
    },
    methods: {
        async getEmpresas() {
            this.loadingE = true;
            await Empresa()
                .get("/?limit=8")
                .then((response) => {
                    window.localStorage.setItem(
                        "empresasMasVendidas",
                        JSON.stringify(response.data.data)
                    );
                    this.empresas = response.data.data;
                    this.loadingE = false;
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        async getGrupos() {
            this.loadingG = true;
            await Grupos()
                .get("/mostsold/?limit=10")
                .then((response) => {
                    window.localStorage.setItem(
                        "gruposMasVendidos",
                        JSON.stringify(response.data.data)
                    );
                    this.grupos = response.data.data;
                    this.loadingG = false;
                })
                .catch((e) => {
                    console.log(e);
                });
        },
    },
};
</script>
