<template>
    <div>
        <Toolbar />
        <v-divider></v-divider>

        <v-row justify="center" class="pa-5 my-5">
            <v-col cols="12" md="7" sm="12"> </v-col>
        </v-row>
        <v-card class="px-9 pb-9" elevation="0">
            <v-card-title class="title">
                01 : Acerca de Hoyprovoca
            </v-card-title>
            <v-row>
                <v-col md="7">
                    <v-img
                        class="imagen "
                        src="./../../assets/Nosotros.jpg"
                    ></v-img>
                </v-col>
                <v-col md="5" class="align-self-center" justify="center">
                    <v-card-title
                        class="description-title text-center font-weight-black"
                    >
                        Se parte del equipo que <br />
                        Transforma venezuela
                    </v-card-title>
                </v-col>
            </v-row>

            <v-col md="10" style="margin:auto!important">
                <v-card-text class="font">
                    Hoyprovoca es una Startup de consumo alto crecimiento
                    Desarrollada por la Empresa SomosSistemas enfocado en
                    conectar a consumidores, transportistas y distribuidores
                    para crear una experiencia simplificada y agradable a los
                    usuarios en lo que respecta al comercio en la isla de
                    margarita , de manera que multitud de personas ubicadas en
                    la isla que desean comprar alimentos preparados,
                    comestibles, ropa y prácticamente cualquier cosa con
                    contratistas independientes que puedan satisfacer esas
                    necesidades. Aunque en SomosSistemas somos una empresa nueva
                    y vivimos la realidad de las startups, ya estamos operando
                    en El estado Nueva Esparta, Especificamente en la isla de
                    Margarita y queremos mucho Mas.
                </v-card-text>
            </v-col>
            <v-card-title class="title">
                02: Requisitos
            </v-card-title>
            <v-row justify="center" class="align-md-center">
                <v-col md="7" justify="center">
                    <v-col md="4" style="margin:auto!important" justify="center">
                        <v-img
                            class="imagen "
                            src="./../../assets/requirement.png"
                        ></v-img>
                    </v-col>
                    <v-card-text class="requisitos-text text-center font">
                        somos una empresa abierta a nuevas solicitudes si deseas
                        trabajar con nosotros envianos un correo a
                        SomosSistemas@gmail.com con los siguientes requisitos y
                        estaremos en contacto
                    </v-card-text>
                </v-col>

                <v-col md="5" class="align-md-center" justify="center">
                    <v-card-text class="requisito font"
                        >Numero de Cedula</v-card-text
                    >
                    <v-card-text class="requisito font"
                        >Nombre Completo</v-card-text
                    >
                    <v-card-text class="requisito font"
                        >Ser mayor de edad</v-card-text
                    >
                    <v-card-text class="requisito font">Rif</v-card-text>
                    <v-card-text class="requisito font">Curriculum</v-card-text>
                    <v-card-text class="requisito font"
                        >Sus expectativas y necesidades con la
                        Empresa</v-card-text
                    >
                </v-col>
            </v-row>
        </v-card>
    </div>
</template>

<script>
import Toolbar from "./../terminos/Toolbar";

export default {
    components: {
        Toolbar,
    },
    data: () => {
        return {
            holi: "holi",
        };
    },
};
</script>

<style lang="scss" scoped>
    .margen-top {
        margin-top: 75px;
    }
    .margen-movil {
        margin-top: 100px;
    }
    .requisito {
        padding-top: 0 !important;
        padding-bottom: 0 !important;
    }
    .font {
        font-size: 1.1rem !important;
    }
</style>