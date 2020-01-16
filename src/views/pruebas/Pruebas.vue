<template>
    <div>
        <!--Navbar -->
        <v-toolbar width="100%" height="50" color="#005598">
           <v-btn text to="/" disabled>
               <v-img width="120" height="120" src="@/assets/logo2.png" contain></v-img>
           </v-btn>
           <v-spacer></v-spacer>
           <v-btn to="/" text elevation="0" dark class="caption text-capitalize">
               Seguir Comprando
           </v-btn>
        </v-toolbar>

        <v-row>
            <v-col cols="12" md="6" justify-self="center" align-self="center">
                <v-img
                    src="https://moviles.info/wp-content/uploads/2019/01/xiaomi-mi-9.png"
                    contain
                    height="400"
                    width="100%"
                ></v-img>
            </v-col>
            <v-col cols="12" md="6" justify-self="center" align-self="center">
                <v-card class="mx-5">
                    <v-card-title>
                        <div class="title font-weight-black">
                            Xiaomi
                        </div>
                        <div class="body-2">
                            Lorem ipsum dolor 
                            sit amet consectetur adipisicing elit. 
                            Dignissimos quam magnam vitae eius laudantium 
                            voluptatibus eligendi voluptas id alias repellendus 
                            ab, quasi blanditiis eum asperiores? Et officiis 
                            voluptate maiores aliquam!
                        </div>
                    </v-card-title>
                    <v-card-text class="mt-5">
                        <div class="title">
                            Disponible.
                        </div>
                        <div class="title">
                            Tipo_concepto.
                        </div>
                        <div class="d-block">
                            <v-rating
                                v-model="rating"
                                color="yellow darken-3"
                                background-color="grey darken-1"
                                empty-icon="$ratingFull"
                                half-increments
                                hover
                            ></v-rating>
                            {{"("+rating+")"}}
                        </div>
                    </v-card-text>
                    <v-card-actions class="my-4">
                        <v-btn 
                            color="#005598" 
                            rounded 
                            class="caption white--text text-capitalize" 
                            width="100"
                        >
                            Agregar
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn icon tile>
                            <v-icon>delete</v-icon>
                        </v-btn>
                        <div class="mx-5">1</div> 
                        <v-btn icon tile>
                            <v-icon>exposure_plus_1</v-icon>
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
            <v-col cols="12" md="12" sm="12">
                <SliderSugerencias />
            </v-col>
        </v-row>
    </div>
</template>

<script>
import SliderSugerencias from "@/components/sliders/SliderSugerencias";

    export default {
        components:{
            SliderSugerencias
        },
        data() {
            return {
               rating:4.5,
               page:1,
               conceptos:[],
               auxConceptos:[],
               totalPage:0,
               max:4,
               min:0,
               selectFiltro:'',
               selectCategoria:0
            }
        },

        watch: {
            selectFiltro(){
                this.filtrado();
            },

            selectCategoria(){
                this.filtrado();
            },

            page(){
                this.filtrado();
            }
        },

        methods: {
            longitudPaginacion(longitud){
                this.totalPage = Math.round(longitud/5);
            },

            paginador(){
                if(this.page > 1){
                    this.min = (evt*5)-1;
                    this.max=(this.min+4);
                }else{
                    this.min=0;
                    this.max=4;
                }

                let aux = [];

                for (let i = 0; i < this.auxConceptos.length; i++){
                    if(i <= this.max && i >= this.min){
                        this.aux.push(this.auxConceptos[i]);
                    }
                }
                this.auxConceptos = aux;
            },


            filtrado(){
                this.auxConceptos=this.conceptos;

                if(this.selectFiltro !== '' && this.selectCategoria !== 0){
                    this.auxConceptos = ordenarPorCategorias(this.selectCategoria);
                    this.filtros();
                    this.paginador();
                }else{
                    if(this.selectFiltro !== ''){
                        this.filtros();
                        this.paginador();
                    }else{
                        if(this.selectCategoria !== 0){
                            this.ordenarPorCategorias(this.selectCategoria);
                            this.paginador();
                        }
                    }
                }
            },

            filtros(){
                if(this.selectFiltro == 'Mayor precio'){
                    this.auxConceptos = this.ordenarMayorAMenor(this.auxConceptos);
                }else if(this.selectFiltro == 'Menor precio'){
                    this.auxConceptos = this.ordenarMenorAMayor(this.auxConceptos);
                }else if(this.selectFiltro == 'Alfabeto'){
                    this.auxConceptos = this.ordenarAlfabeticamente(this.auxConceptos);
                }
            },

            filtrosChange(evt){
                this.selecFiltro=evt;
                if(evt == 'Mayor precio'){
                    this.conceptos = this.ordenarMayorAMenor(this.conceptos);
                }else if(evt == 'Menor precio'){
                    this.conceptos = this.ordenarMenorAMayor(this.conceptos);
                }else if(evt == 'Alfabeto'){
                    this.conceptos = this.ordenarAlfabeticamente(this.conceptos);
                }
            },

            categoriasChange(evt){ 
                this.selecCategoria = evt;
                let id = null;
                for (let i = 0; i < this.categorias.length; i++) {
                    if(this.categorias[i].text == evt){
                        id=this.categorias[i].id;
                    }
                } 
                this.ordenarPorCategorias(id);
            },

            ordenarPorCategorias(id){
                let aux = [];
                for (let index = 0; index < this.conceptos.length; index++) {
                    if(this.conceptos[i].grupos_id == id){
                        aux.push(this.conceptos[i]);
                    }
                }
                return aux;
            },

            ordenarMayorAMenor(conceptos){
                conceptos.sort((a,b) => {
                    if (Number.parseFloat(a.precio_a) < Number.parseFloat(b.precio_a)){
                        return 1;
                    }
                    if (Number.parseFloat(a.precio_a) > Number.parseFloat(b.precio_a)){
                        return -1;
                    }
                    return 0;
                });
                return conceptos;
            },

            ordenarMenorAMayor(conceptos){
                conceptos.sort(function (a, b){
                    if (Number.parseFloat(a.precio_a) < Number.parseFloat(b.precio_a)){
                        return -1;
                    }
                    if (Number.parseFloat(a.precio_a) > Number.parseFloat(b.precio_a)){
                        return 1;
                    }
                    return 0;
                });
                return conceptos;
            },

            ordenarAlfabeticamente(conceptos){
                conceptos.sort((a,b) =>{
                    var n = a.nombre.toLocaleLowerCase().localeCompare(b.nombre.toLocaleLowerCase());
                    return n === 0 && a.nombre !== b.nombre ? b.nombre.localeCompare(a) : n;
                });
                return conceptos;
            },

        },
    }
</script>